import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../utils/utils.js";
import { ErrorBoundary } from "../../classComponents/ErrorBoundary.jsx";
import { Loader } from "../../components/loader/Loader.jsx";
import { ButtonSave } from "../../components/buttonSave/ButtonSave.jsx";
import { Carousel } from "../../components/carousel/Carousel.jsx";
import { Modal } from "../../components/modal/Modal.jsx";

export function Details() {
  let { id } = useParams();
  const [pet, setPet] = useState();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

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
  }, []); //eslint-disable-line react-hooks/exhaustive-deps]

  return loading ? (
    <Loader />
  ) : (
    <section className="details container-standard">
      <Carousel photos={pet.photos} />
      <article>
        <ButtonSave pet={pet} />
        <div className="details__heading">
          <h2>{pet.name}</h2>
          <ul className="flex-center">
            <li>{`${pet.type}-`}</li>
            <li>{`${pet.species}·`}</li>
            <li>{`${pet.contact.address.city}·`}</li>
            <li>{`${pet.contact.address.state}`}</li>
          </ul>
        </div>
        <div className="details__body">
          <h3>Meet {pet.name}</h3>
          <ul className="flex-center">
            <li>{`${pet.age}`}</li>
            <li>{`·${pet.gender}`}</li>
            <li>{`·${pet.size}`}</li>
          </ul>
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
          <p>Status: {pet.status}</p>
        </div>
        <div className="shelter">
          <h4>Shelter adress</h4>
          <ul className="flex-center">
            <li>{`${pet.contact.address.address}·`}</li>
            <li>{`${pet.contact.address.city}·`}</li>
            <li>{`${pet.contact.address.state}·`}</li>
            <li>{`${pet.contact.address.postcode}`}</li>
          </ul>
          <ul className="flex-center">
            <li>{`${pet.contact.email}·`}</li>
            <li>{`${pet.contact.phone}`}</li>
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
          <div>
            <h1>Would you like to adopt {pet.name}?</h1>
            <div className="buttons">
              <a href={pet.url}>Yes</a>
              <button onClick={toggleModal}>No</button>
            </div>
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
