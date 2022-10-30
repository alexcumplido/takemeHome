import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ButtonSave } from "../buttonSave/ButtonSave.jsx";

export function Card({ pet }) {
  const [save, setSave] = useState(false);
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (pet.photos.length) {
    hero = pet.photos[0].full;
  }
  function handleSave() {
    let savedPets = [];
    if (localStorage.getItem("savedPets")) {
      savedPets = JSON.parse(localStorage.getItem("savedPets"));
      const isRepeated = savedPets.find(function (element) {
        return element.id === pet.id;
      });
      if (isRepeated) {
        savedPets = savedPets.filter(function (element) {
          return element.id !== pet.id;
        });
        setSave(false);
      } else {
        savedPets.push(pet);
        setSave(true);
      }
    } else {
      savedPets.push(pet);
      setSave(true);
    }
    window.localStorage.setItem("savedPets", JSON.stringify(savedPets));
  }

  useEffect(
    function () {
      if (localStorage.getItem("savedPets")) {
        const savedPets = JSON.parse(localStorage.getItem("savedPets"));
        const isRepeated = savedPets.find(function (element) {
          return element.id === pet.id;
        });
        isRepeated ? setSave(true) : setSave(false);
      }
    },
    [] //eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <article className="card">
      <ButtonSave isPressed={save} handleClick={handleSave} />
      <Link to={`/details/${pet.id}/${save}`} className="link card__link">
        <img
          className="card__image"
          src={hero}
          alt={pet.name}
          title={pet.name}
        />
      </Link>
      <div className="card__description">
        <Link to={`/details/${pet.id}/${save}`} className="card__link">
          <p className="card__name">{pet.name}</p>
        </Link>
        <p>
          {`${pet.age} · ${pet.contact.address.city} · ${pet.contact.address.state}`}
        </p>
      </div>
    </article>
  );
}
