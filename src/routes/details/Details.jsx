import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { requestPet } from "../../utils/services";
import { ErrorBoundary } from "../../classComponents/ErrorBoundary.jsx";
import { Loader } from "../../components/loader/Loader";
import { ButtonSave } from "../../components/buttonSave/ButtonSave.jsx";
import { Carousel } from "../../components/carousel/Carousel";
import { Modal } from "../../components/modal/Modal.jsx";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { List } from "../../components/list/List";

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
    handleRequest();
    async function handleRequest() {
      let response = await requestPet(id);
      setPet(response);
      setLoading(false);
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
          <List items={[pet.species, pet.city, pet.state]} />
          <List items={[pet.breedPrimary, pet.breedSecondary]} />
          <p>
            {`
            ${pet.mixed === "No data" ? "" : "Mixed"}
            ${pet.breedPrimary === "No data" ? "" : pet.breedPrimary}
            ${pet.breedSecondary === "No data" ? "" : pet.breedSecondary}
            `}
          </p>
          <List items={[pet.age, pet.gender, pet.size]} />
        </div>
        <div className="details__body">
          <h2>Meet {pet.name}</h2>
          <p className="details__description">{pet.description}</p>
          <p>Character:</p>
          <List items={[...pet.tags]} />
          <p>Status:{pet.status}</p>
        </div>
        <div className="shelter">
          <h2>Shelter adress</h2>
          <List items={[pet.adress, pet.city, pet.state, pet.postcode]} />
          <List items={[pet.email, pet.phone]} />
        </div>
        <div className="details__footer">
          <Button
            disabled={false}
            onClick={toggleModal}
            text={`Adopt ${pet.name}`}
            className="details__cta"
          />
        </div>
      </article>
      {showModal ? (
        <Modal>
          <div className="modal-details">
            <p>Would you like to adopt {pet.name}</p>
            <Button
              disabled={false}
              onClick={toggleModal}
              text={"X"}
              className={"button-close"}
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
