import { useEffect, useState } from "react";
import { Results } from "../../components/results/Results.jsx";
import { Button } from "../../components/button/Button";
import { retrieveKeyStorage } from "../../utils/utils.js";
import { fetchTypes } from "../../utils/services.js";

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
      return element.species === typeAnimal;
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
              Animal type
            </label>
            <select
              className="control-select"
              disabled={!dashboard}
              id="animal"
              onChange={(event) => setDashboard(filterType(event.target.value))}
              onBlur={(event) => setDashboard(filterType(event.target.value))}
            >
              <option value="">Any</option>
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
            handleOnclick={handleDays}
            text={"Most days waiting"}
            className="saved__button"
          />
          <Button
            disabled={!dashboard}
            handleOnclick={handleUpdate}
            text={"Update"}
            className="saved__button"
          />
          <Button
            disabled={!dashboard}
            handleOnclick={clearDashboard}
            text={"Remove all"}
            className="saved__button saved__button-clear"
          />
        </form>
        <Results pets={dashboard} />
      </section>
    </main>
  );
}
