import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ButtonSave } from "../buttonSave/ButtonSave.jsx";

export function Card(params) {
  const { pet } = params;
  const [save, setSave] = useState(false);
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
        {pet.photos.length ? (
          <img
            className="card__image"
            src={pet.photos[0].full}
            alt={pet.name}
            title={pet.name}
          />
        ) : (
          <svg
            viewBox="0 0 69 67"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="quizzleIcon quizzleIcon-largeMargin"
          >
            <path
              className="card__image"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.572 28.46c0-5.67-3.744-10.274-8.336-10.274C4.644 18.186.9 22.79.9 28.459c0 5.67 3.744 10.258 8.336 10.258 4.592 0 8.336-4.604 8.336-10.258zm-8.336 7.382c-3.04 0-5.504-3.312-5.504-7.399s2.464-7.398 5.504-7.398c3.04 0 5.472 3.327 5.472 7.414s-2.432 7.383-5.472 7.383zm59.28-7.399c0-5.654-3.744-10.257-8.336-10.257-4.592 0-8.336 4.604-8.336 10.273-.058.547.199 1.08.66 1.372a1.412 1.412 0 001.511 0c.462-.292.719-.825.66-1.372 0-4.07 2.465-7.398 5.505-7.398s5.504 3.311 5.504 7.398c0 4.071-2.464 7.383-5.504 7.383a1.43 1.43 0 00-1.424 1.438 1.43 1.43 0 001.424 1.437c4.592 0 8.336-4.604 8.336-10.274zm-23.408-7.818c4.592 0 8.336-4.604 8.336-10.274 0-5.67-3.76-10.274-8.336-10.274-4.576 0-8.336 4.604-8.336 10.274 0 5.67 3.712 10.274 8.336 10.274zm0-17.672c3.04 0 5.504 3.311 5.504 7.398s-2.496 7.399-5.504 7.399c-3.008 0-5.504-3.312-5.504-7.399s2.448-7.398 5.504-7.398zm-20.8 17.672c4.592 0 8.336-4.604 8.336-10.274 0-5.67-3.712-10.274-8.336-10.274-4.624 0-8.336 4.604-8.336 10.274 0 5.67 3.76 10.274 8.336 10.274zm0-17.672c3.04 0 5.504 3.311 5.504 7.398s-2.448 7.399-5.504 7.399c-3.056 0-5.504-3.312-5.504-7.399s2.496-7.398 5.504-7.398zm30.4 43.405l-8.8-15.556c-2.912-5.121-6.896-7.948-11.2-7.948-4.304 0-8.288 2.827-11.2 7.948l-8.8 15.54a18.048 18.048 0 00-1.44 3.23 12.285 12.285 0 00-.8 4.475c.067 6.39 5.039 11.63 11.36 11.97h.48c1.6.006 3.184-.319 4.656-.953 1.056-.42 2.816-1.228 4.64-2.1l.656.275A29.513 29.513 0 0045.572 66c6.33-.315 11.33-5.54 11.424-11.938a14.665 14.665 0 00-.784-4.394 18.146 18.146 0 00-1.504-3.311zm-9.152 16.784a23.965 23.965 0 01-8.448-1.842l.544-.274 1.6-.744c.105-.062.202-.138.288-.226l3.104-1.599c.694-.361.97-1.22.62-1.924a1.418 1.418 0 00-1.9-.644l-1.6.775c-2.48 1.276-6.624 3.425-8.368 4.152l-.16.113c-1.328.63-2.56 1.179-3.328 1.486a8.252 8.252 0 01-3.84.727h-.144c-4.805-.254-8.595-4.222-8.672-9.079a.578.578 0 000-.113c.006-1.155.223-2.3.64-3.376.318-.955.73-1.875 1.232-2.746l8.784-15.589c2.384-4.2 5.488-6.461 8.752-6.461 3.264 0 6.4 2.31 8.752 6.462l8.848 15.556c.5.872.912 1.792 1.232 2.746.403 1.131.63 2.32.672 3.521-.068 4.837-3.825 8.8-8.608 9.079z"
              fill="#6504B5"
            ></path>
          </svg>
        )}
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
