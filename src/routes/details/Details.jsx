import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../utils/utils.js";
import { ErrorBoundary } from "../../classComponents/ErrorBoundary.jsx";
import { Loader } from "../../components/loader/Loader.jsx";
import { ButtonSave } from "../../components/buttonSave/ButtonSave.jsx";
import { Carousel } from "../../components/carousel/Carousel.jsx";
import { Modal } from "../../components/modal/Modal.jsx";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button.jsx";

export function Details() {
  let { id } = useParams();
  const [pet, setPet] = useState();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate("");

  function toggleModal() {
    setShowModal(!showModal);
  }

  useEffect(function () {
    if (localStorage.getItem("viewedElements")) {
      const storage = JSON.parse(localStorage.getItem("viewedElements"));
      const elementExist = storage.find(
        (element) => Number(element.id) === Number(id)
      );
      if (elementExist) {
        setPet(elementExist);
        setLoading(false);
      } else {
        handleRequest();
      }
    } else {
      handleRequest();
    }

    async function requestPet() {
      try {
        const response = await client.animal.show(id);
        return response;
      } catch (error) {
        console.log(error);
      }
    }

    async function handleRequest() {
      let response = await requestPet();
      setPet(response.data.animal);
      setLoading(false);
      let storage = [];
      if (localStorage.getItem("viewedElements")) {
        storage = JSON.parse(localStorage.getItem("viewedElements"));
        let elementExist = storage.find(
          (element) => Number(element.id) === Number(id)
        );
        if (elementExist === undefined) storage.push(response.data.animal);
      } else {
        storage.push(response.data.animal);
      }
      window.localStorage.setItem("viewedElements", JSON.stringify(storage));
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return loading ? (
    <Loader />
  ) : (
    <section className="details container-standard">
      <Carousel photos={pet.photos} />
      <article className="details__content">
        <ButtonSave pet={pet} />
        <div className="details__heading">
          <h1>{pet.name}</h1>
          <ul className="flex-center">
            <li>{`${pet.species}·`}</li>
            <li>{`${pet.contact.address.city ?? "No data"}·`}</li>
            <li>{`${pet.contact.address.state ?? "No data"}`}</li>
          </ul>
          <p>
            {`${pet.breeds.mixed === true ? "Mix" : ""}: ${
              pet.breeds.primary ?? ``
            } ${pet.breeds.secondary ?? ``}`}
          </p>
          <ul className="flex-center">
            <li>{`${pet.age ?? "No data"}`}</li>
            <li>{`· ${pet.gender ?? "No data"}`}</li>
            <li>{`· ${pet.size ?? "No data"}`}</li>
          </ul>
        </div>
        <div className="details__body">
          <h2>Meet {pet.name}</h2>

          <p className="details__description">{pet.description}</p>
          <p>
            Character:
            {pet.tags.length ? (
              pet.tags.map(function (tag, index) {
                while (index < 3) {
                  return <span key={index}> {tag} </span>;
                }
              })
            ) : (
              <span>No tags found</span>
            )}
          </p>
          <p>Status:{pet.status}</p>
        </div>
        <div className="shelter">
          <h2>Shelter adress</h2>
          <ul className="flex-center">
            <li>{`${pet.contact.address.address ?? "No data"}·`}</li>
            <li>{`${pet.contact.address.city ?? "No data"}·`}</li>
            <li>{`${pet.contact.address.state ?? "No data"}·`}</li>
            <li>{`${pet.contact.address.postcode ?? "No data"}`}</li>
          </ul>
          <ul className="flex-center">
            <li>{`${pet.contact.email ?? "No data"}·`}</li>
            <li>{`${pet.contact.phone ?? "No data"}`}</li>
          </ul>
        </div>
        <div className="details__footer">
          <button className="details__cta" onClick={toggleModal}>
            Adopt
            {pet.name}
          </button>
        </div>
      </article>
      {showModal ? (
        <Modal>
          <div className="modal-details">
            <p>Would you like to adopt {pet.name}?</p>
            <Button
              disabled={false}
              handleOnclick={toggleModal}
              text={"X"}
              styleClass={"button-close"}
            />
            <button
              className="button-navigate"
              onClick={() => navigate("/contact")}
            >
              Yes
            </button>
          </div>
        </Modal>
      ) : null}
    </section>
  );
}

export function WrappedDetails() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}
