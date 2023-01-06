import { useState, useEffect } from "react";
import { retrieveKeyStorage, existKeyStorage } from "../../utils/utils";
import { TypePet } from "../../utils/types";
import { IconButton } from "../iconsvg/Icon";

type ButtonSaveProps = {
  content: TypePet;
};

export function ButtonSave(props: ButtonSaveProps) {
  const [save, setSave] = useState(false);

  function handleClick() {
    let savePets: TypePet[] | [] = [];

    if (existKeyStorage("savePets")) savePets = retrieveKeyStorage("savePets");

    const repeated: TypePet | undefined = savePets.find(function (
      element: TypePet
    ) {
      return element.id === props.content.id;
    });

    if (repeated) {
      savePets = savePets.filter(function (element: TypePet) {
        return element.id !== props.content.id;
      });
      setSave(false);
    } else {
      savePets.push(props.content);
      setSave(true);
    }
    window.localStorage.setItem("savePets", JSON.stringify(savePets));
  }

  useEffect(
    function () {
      if (existKeyStorage("savePets")) {
        const repeated: TypePet | undefined = retrieveKeyStorage(
          "savePets"
        ).find(function (element: TypePet) {
          return element.id === props.content.id;
        });
        repeated ? setSave(true) : setSave(false);
      }
    },
    [] //eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <button className="card__save" aria-pressed={save} onClick={handleClick}>
      <IconButton />
    </button>
  );
}
