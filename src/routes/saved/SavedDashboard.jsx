import { useEffect, useState } from "react";
import { Results } from "../../components/results/Results";
import { Button } from "../../components/button/Button";
import { retrieveKeyStorage } from "../../utils/utils";
import { fetchTypes } from "../../utils/services.js";
import { Select } from "../../components/select/Select";

export function SavedDashboard() {
  const [dashboard, setDashboard] = useState([]);
  const [animals, setAnimals] = useState("");

  function clearDashboard() {
    localStorage.clear();
    setDashboard(retrieveKeyStorage("savePets"));
  }

  function filterType(typeAnimal) {
    if (typeAnimal === "") {
      return retrieveKeyStorage("savePets");
    }
    let filtered = retrieveKeyStorage("savePets").filter(function (element) {
      return element.type === typeAnimal;
    });
    return filtered;
  }

  function sortOldestWaiting() {
    let sorted = [...dashboard].sort(function (a, b) {
      return (
        Number(new Date(a.lastDate).getTime()) -
        Number(new Date(b.lastDate).getTime())
      );
    });
    return sorted;
  }

  function handleDays() {
    setDashboard(sortOldestWaiting());
  }

  function handleUpdate() {
    setDashboard(retrieveKeyStorage("savePets"));
  }

  function handleSelect(value) {
    setDashboard(filterType(value));
  }

  useEffect(function () {
    setDashboard(retrieveKeyStorage("savePets"));
    handleTypesRequest();
    async function handleTypesRequest() {
      const types = await fetchTypes();
      setAnimals(types);
    }
  }, []);
  return (
    <main>
      <section className="saved container-standard">
        <form
          className="form"
          onSubmit={function (event) {
            event.preventDefault();
          }}
        >
          <div className="control-wrapper">
            <label className="control-label" htmlFor="animal">
              Tipo de animal
            </label>
            <select
              className="control-select"
              disabled={!dashboard}
              id="animal"
              onChange={(event) => setDashboard(filterType(event.target.value))}
              onBlur={(event) => setDashboard(filterType(event.target.value))}
            >
              <option value="">Selecciona</option>
              {animals &&
                animals.map((element) => (
                  <option key={element.name} value={element.name}>
                    {element.name}
                  </option>
                ))}
            </select>
          </div>
          <Button
            disabled={!dashboard}
            onClick={handleDays}
            text={"Más días esperando"}
            className="saved__button"
          />
          <Button
            disabled={!dashboard}
            onClick={handleUpdate}
            text={"Actualizar"}
            className="saved__button"
          />
          <Button
            disabled={!dashboard}
            onClick={clearDashboard}
            text={"Limpiar dashboard"}
            className="saved__button saved__button-clear"
          />
        </form>
        <Results elements={dashboard} />
      </section>
    </main>
  );
}
