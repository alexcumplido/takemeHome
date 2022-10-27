import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext.js";
import { client } from "../../utils/utils.js";
import { ErrorBoundary } from "../../classComponents/ErrorBoundary.js";
import { Loader } from "../../components/loader/Loader.js";
import { ButtonSave } from "../../components/buttonSave/ButtonSave.js";
import { Carousel } from "../../components/carousel/Carousel.js";
import { Modal } from "../../components/modal/Modal.js";

export function Details() {
  let { id, save } = useParams();
  save = save === "true" ? true : false;
  const [petDetails, setPetDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [isSaved, setISSave] = useState(save);
  const [showModal, setShowModal] = useState(false);

  function requestDetails() {
    client.animal
      .show(id)
      .then(function onFulFillmenzt(responseObject) {
        setPetDetails(responseObject.data.animal);
        setLoading(false);
      })
      .catch(function onRejection(responseRejection) {
        console.log(responseRejection);
      });
  }

  function updateLastViewed() {
    let lastViewed = [];
    if (localStorage.getItem("lastViewed")) {
      lastViewed = JSON.parse(localStorage.getItem("lastViewed"));
      if (!lastViewed.includes(id)) lastViewed.unshift(id);
    } else {
      lastViewed.push(id);
    }
    window.localStorage.setItem("lastViewed", JSON.stringify(lastViewed));
  }

  function handleClick() {
    let savePets = [];
    if (localStorage.getItem("savePets")) {
      savePets = JSON.parse(localStorage.getItem("savePets"));
    }
    let repeated = savePets.find(function (element) {
      return element.id === petDetails.id;
    });
    if (repeated) {
      savePets = savePets.filter(function (element) {
        return element.id !== petDetails.id;
      });
      setISSave(false);
    } else {
      savePets.push(petDetails);
      setISSave(true);
    }
    window.localStorage.setItem("savePets", JSON.stringify(savePets));
  }

  function toggleModal() {
    setShowModal(!showModal);
  }

  useEffect(function () {
    requestDetails();
    updateLastViewed();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return loading ? (
    <Loader />
  ) : (
    <section className="details container-standard">
      <Carousel photos={petDetails.photos} />
      <article>
        <ButtonSave save={isSaved} handleClick={handleClick} />
        <div className="details__heading">
          <h2>{petDetails.name}</h2>
          <ul className="flex-center">
            <li>{`${petDetails.type}-`}</li>
            <li>{`${petDetails.species}·`}</li>
            <li>{`${petDetails.contact.address.city}·`}</li>
            <li>{`${petDetails.contact.address.state}`}</li>
          </ul>
        </div>
        <div className="details__body">
          <h3>Meet {petDetails.name}</h3>
          <ul className="flex-center">
            <li>{`${petDetails.age}`}</li>
            <li>{`·${petDetails.gender}`}</li>
            <li>{`·${petDetails.size}`}</li>
          </ul>
          <p className="details__description">{petDetails.description}</p>
          <p>
            Character:
            {petDetails.tags.length ? (
              petDetails.tags.map(function (tag, index) {
                while (index < 3) {
                  return <span key={index}> {tag} </span>;
                }
              })
            ) : (
              <span>No tags found</span>
            )}
          </p>
          <p>Status: {petDetails.status}</p>
        </div>
        <div className="shelter">
          <h4>Shelter adress</h4>
          <ul className="flex-center">
            <li>{`${petDetails.contact.address.address}·`}</li>
            <li>{`${petDetails.contact.address.city}·`}</li>
            <li>{`${petDetails.contact.address.state}·`}</li>
            <li>{`${petDetails.contact.address.postcode}`}</li>
          </ul>
          <ul className="flex-center">
            <li>{`${petDetails.contact.email}·`}</li>
            <li>{`${petDetails.contact.phone}`}</li>
          </ul>
        </div>
        <div className="details__footer">
          <button className="details__cta" onClick={toggleModal}>
            Adopt
            {petDetails.name}
          </button>
        </div>
      </article>
      {showModal ? (
        <Modal>
          <div>
            <h1>Would you like to adopt {petDetails.name}?</h1>
            <div className="buttons">
              <a href={petDetails.url}>Yes</a>
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
