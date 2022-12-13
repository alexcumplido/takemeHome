import { useState, useEffect } from "react";
import { inputs } from "../../utils/utils.js";
import { fetchTypes, fetchAnimals } from "../../utils/services.js";
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
  let [counterPage, setCounterPage] = useState(1);
  const [loading, setLoading] = useState(true);

  async function handleAnimalRequest() {
    setLoading(true);
    const response = await fetchAnimals(
      animal,
      breed,
      size,
      age,
      gender,
      coat,
      care,
      counterPage
    );
    setLoading(false);
    setPets(response.animals);
    setPagination({ ...response.pagination });
    setCounterPage(response.pagination.current_page);
  }

  function submit(event) {
    event.preventDefault();
    handleAnimalRequest();
  }

  function incrementPage() {
    if (pagination && pagination.current_page < pagination.total_pages) {
      setCounterPage(counterPage++);
      handleAnimalRequest();
    }
  }

  function decrementPage() {
    if (pagination && pagination.current_page > 1) {
      setCounterPage(counterPage--);
      handleAnimalRequest();
    }
  }

  useEffect(function () {
    handleTypesRequest();
    async function handleTypesRequest() {
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
          textAttribute={"tamaño"}
          isDisabled={!breeds.length}
          value={size}
          handleSelect={setSize}
          arrayForOptions={inputs.size}
        />
        <Select
          textAttribute={"edad"}
          isDisabled={!breeds.length}
          value={age}
          handleSelect={setAge}
          arrayForOptions={inputs.age}
        />
        <Select
          textAttribute={"género"}
          isDisabled={!breeds.length}
          value={gender}
          handleSelect={setGender}
          arrayForOptions={inputs.gender}
        />
        <Select
          textAttribute={"pelaje"}
          isDisabled={!breeds.length}
          value={coat}
          handleSelect={setCoat}
          arrayForOptions={inputs.coat}
        />
        <div className="control-wrapper">
          <label className="control-label" htmlFor="cuidados">
            cuidados
          </label>
          <select
            className="control-select"
            disabled={!breeds.length}
            id={"cuidados"}
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
          text={"buscar"}
          styleClass="search__submit"
        />
      </form>
      {loading ? <Loader /> : <Results pets={pets} />}
      <div className="pagination-wrapper flex-center">
        <Button
          disabled={!counterPage}
          handleOnclick={decrementPage}
          text={"Anterior"}
          styleClass="button-pagination"
        />
        <Button
          disabled={!counterPage}
          handleOnclick={incrementPage}
          text={"Siguiente"}
          styleClass="button-pagination"
        />
      </div>
    </section>
  );
}
