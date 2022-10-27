import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ButtonSave } from "../buttonSave/ButtonSave.js";

export function Card(params) {
  const { pet } = params;
  const [save, setSave] = useState(false);
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (pet.photos.length) {
    hero = pet.photos[0].full;
  }
  function handleClick() {
    let savePets = [];
    if (localStorage.getItem("savePets")) {
      savePets = JSON.parse(localStorage.getItem("savePets"));
    }
    let repeated = savePets.find(function (element) {
      return element.id === pet.id;
    });
    if (repeated) {
      savePets = savePets.filter(function (element) {
        return element.id !== pet.id;
      });
      setSave(false);
    } else {
      savePets.push(pet);
      setSave(true);
    }
    window.localStorage.setItem("savePets", JSON.stringify(savePets));
  }

  useEffect(
    function () {
      if (localStorage.getItem("savePets")) {
        let savePets = JSON.parse(localStorage.getItem("savePets"));
        let repeated = savePets.find(function (element) {
          return element.id === pet.id;
        });
        repeated ? setSave(true) : setSave(false);
      }
    },
    [] //eslint-disable-line react-hooks/exhaustive-deps
  );
  return (
    <article className="card">
      <ButtonSave save={save} handleClick={handleClick} />
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
