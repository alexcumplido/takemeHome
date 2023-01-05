import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { requestPet } from "../../utils/services";
import { ErrorBoundary } from "../../classComponents/ErrorBoundary";
import { Loader } from "../../components/loader/Loader";
import { ButtonSave } from "../../components/buttonSave/ButtonSave";
import { Carousel } from "../../components/carousel/Carousel";
import { Modal } from "../../components/modal/Modal";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { List } from "../../components/list/List";
import { useQuery } from "@tanstack/react-query";
import { TypePet } from "../../utils/types";
import {AdoptedAnimalContext} from "../../context/AdoptedAnimalContext.js"

export function Details() {
  const [animal, setAnimal] = useContext(AdoptedAnimalContext);
  const { id } = useParams();
  const results = useQuery(["details", id], requestPet);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const toggleModal = () => setShowModal(!showModal);

  if (results.isLoading) {
    return <Loader />;
  }
  const pet : TypePet = results.data;

  if(!pet) throw new Error("No pet avaible");

  return (
    <section className="details container-standard">
      <Carousel photos={pet.photos} />
      <article className="details__content">
        <ButtonSave content={pet} />
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
          <h2>Conoce a {pet.name}</h2>
          <p className="details__description">{pet.description}</p>
          <p>Carácter:</p>
          <List items={[...pet.tags]} />
          <p>Status:{pet.status}</p>
        </div>
        <div className="shelter">
          <h2>Dirección refugio</h2>
          <List items={[pet.adress, pet.city, pet.state, pet.postcode]} />
          <List items={[pet.email, pet.phone]} />
        </div>
        <div className="details__footer">
          <Button
            disabled={false}
            onClick={toggleModal}
            text={`Adopta a ${pet.name}`}
            className="details__cta"
          />
        </div>
      </article>
      {showModal ? (
        <Modal>
          <div className="modal-details">
            <p>Te gustaría adoptar a {pet.name} ?</p>
            <Button
              disabled={false}
              onClick={toggleModal}
              text={"X"}
              className={"button-close"}
            />
            <button
              className="button-navigate"
              onClick={() => {
                setAnimal(pet);
                navigate("/contact");
              }}
            >
              Si
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
