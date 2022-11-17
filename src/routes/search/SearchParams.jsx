import { useState, useEffect } from "react";
import { client, inputs, fetchTypes } from "../../utils/utils.js";
import { Results } from "../../components/results/Results.jsx";
import { useBreedList } from "../../utils/useBreedList.js";
import { Loader } from "../../components/loader/Loader.jsx";
import { Select } from "../../components/select/Select.jsx";
import { SelectAnimal } from "../../components/selectAnimal/SelectAnimal.jsx";
import { Button } from "../../components/button/Button.jsx";

export function SearchParams() {
  const [animals, setAnimals] = useState("");
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const [breed, setBreed] = useState("");
  const [size, setSize] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [coat, setCoat] = useState("");
  const [care, setCare] = useState(false);
  const [pets, setPets] = useState([]);
  const [pagination, setPagination] = useState({});
  let [counterPage, setCounterPage] = useState("");
  const [loading, setLoading] = useState(true);

  function requestAnimal() {
    setLoading(true);
    client.animal
      .search({
        type: `${animal}`,
        breed: `${breed}`,
        size: `${size}`,
        age: `${age}`,
        gender: `${gender}`,
        coat: `${coat}`,
        house_trained: `${care}`,
        page: 1,
        limit: 25,
      })
      .then(function onFulfillment(responseObject) {
        setLoading(false);
        setPets(responseObject.data.animals);
        setPagination({ ...responseObject.data.pagination });
        setCounterPage(responseObject.data.pagination.current_page);
      })
      .catch(function onRejection(responseObject) {
        console.log(responseObject);
      });
  }

  function submit(event) {
    event.preventDefault();
    requestAnimal();
  }

  function incrementPage() {
    if (pagination && pagination.current_page < pagination.total_pages) {
      setCounterPage(counterPage++);
      paginateRequest();
    }
  }

  function decrementPage() {
    if (pagination && pagination.current_page > 1) {
      setCounterPage(counterPage--);
      paginateRequest();
    }
  }

  function paginateRequest() {
    setLoading(true);
    client.animal
      .search({
        type: `${animal}`,
        breed: `${breed}`,
        size: `${size}`,
        age: `${age}`,
        gender: `${gender}`,
        coat: `${coat}`,
        house_trained: `${care}`,
        page: counterPage,
        limit: 25,
      })
      .then(function onFulfillment(responseObject) {
        setLoading(false);
        setPets(responseObject.data.animals);
        setPagination({ ...responseObject.data.pagination });
        setCounterPage(responseObject.data.pagination.current_page);
      });
  }

  useEffect(function () {
    handleRequest();
    async function handleRequest() {
      const types = await fetchTypes();
      setLoading(false);
      setAnimals(types);
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="search container-standard">
      <form className="form">
        <SelectAnimal
          textAttribute={"animal"}
          value={animal}
          handleSelect={setAnimal}
          extraHandleSelect={setBreed}
          arrayForOptions={animals}
        />
        <Select
          textAttribute={"breed"}
          isDisabled={!breeds.length}
          value={breed}
          handleSelect={setBreed}
          arrayForOptions={breeds}
        />
        <Select
          textAttribute={"size"}
          isDisabled={!breeds.length}
          value={size}
          handleSelect={setSize}
          arrayForOptions={inputs.size}
        />
        <Select
          textAttribute={"age"}
          isDisabled={!breeds.length}
          value={age}
          handleSelect={setAge}
          arrayForOptions={inputs.age}
        />
        <Select
          textAttribute={"gender"}
          isDisabled={!breeds.length}
          value={gender}
          handleSelect={setGender}
          arrayForOptions={inputs.gender}
        />
        <Select
          textAttribute={"coat"}
          isDisabled={!breeds.length}
          value={coat}
          handleSelect={setCoat}
          arrayForOptions={inputs.coat}
        />
        <div className="control-wrapper">
          <label className="control-label" htmlFor="care">
            {inputs.care}
          </label>
          <select
            className="control-select"
            disabled={!breeds.length}
            id={"care"}
            value={care}
            onChange={(event) => setCare(event.target.value)}
            onBlur={(event) => setCare(event.target.value)}
          >
            <option value={false}>Any</option>
            {inputs.care.map(function (element) {
              return (
                <option key={element} value={true}>
                  {element}
                </option>
              );
            })}
          </select>
        </div>
        <Button
          disabled={!animal}
          handleOnclick={submit}
          text={"search"}
          styleClass="search__submit"
        />
      </form>
      {loading ? <Loader /> : <Results pets={pets} />}
      <div className="pagination-wrapper flex-center">
        <Button
          disabled={!counterPage}
          handleOnclick={decrementPage}
          text={"Previous"}
          styleClass="button-pagination"
        />
        <Button
          disabled={!counterPage}
          handleOnclick={incrementPage}
          text={"Next"}
          styleClass="button-pagination"
        />
      </div>
    </section>
  );
}
