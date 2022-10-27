import { useEffect, useState } from "react";
import { Results } from "../../components/results/Results.jsx";
import { client } from "../../utils/utils.js";
import { Button } from "../../components/button/Button.jsx";

export function SavedDashboard() {
  const [dashboard, setDashboard] = useState([]);
  const [animals, setAnimals] = useState("");

  function requestStorage() {
    return JSON.parse(localStorage.getItem("savePets"));
  }

  function requestTypes() {
    client.animalData
      .types()
      .then(function onFulfillment(responseObject) {
        setAnimals(responseObject.data.types);
      })
      .catch(function onRejection(responseObject) {
        console.log(responseObject);
      });
  }

  function clearDashboard() {
    localStorage.clear();
    setDashboard(requestStorage());
  }

  function filterType(typeAnimal) {
    if (typeAnimal === "") {
      return requestStorage();
    }

    let filtered = requestStorage().filter(function (element) {
      return element.type === typeAnimal;
    });
    return filtered;
  }

  function sortOldestWaiting() {
    let sorted = [...dashboard].sort(function (a, b) {
      return (
        Number(new Date(a.status_changed_at).getTime()) -
        Number(new Date(b.status_changed_at).getTime())
      );
    });
    return sorted;
  }

  useEffect(function () {
    setDashboard(requestStorage());
    requestTypes();
  }, []);

  function handleDays() {
    setDashboard(sortOldestWaiting());
  }

  function handleUpdate() {
    setDashboard(requestStorage());
  }
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
            styleClass="saved__button"
          />
          <Button
            disabled={!dashboard}
            handleOnclick={handleUpdate}
            text={"Update"}
            styleClass="saved__button"
          />
          <Button
            disabled={!dashboard}
            handleOnclick={clearDashboard}
            text={"Remove all"}
            styleClass="saved__button saved__button-clear"
          />
        </form>
        <Results pets={dashboard} />
      </section>
    </main>
  );
}
