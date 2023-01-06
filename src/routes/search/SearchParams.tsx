import { useState, useEffect } from "react";
import { fetchTypes, fetchAnimals, inputs } from "../../utils/services";
import { Results } from "../../components/results/Results";
import { useBreedList } from "../../utils/useBreedList";
import { Select } from "../../components/select/Select";
import { SelectAnimal } from "../../components/selectAnimal/SelectAnimal";
import { Button } from "../../components/button/Button";
import { Loader } from "../../components/loader/Loader";

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
          text={"animal"}
          value={animal}
          onChange={setAnimal}
          extraOnChange={setBreed}
          options={animals}
        />
        <Select
          text={"breed"}
          disabled={!breeds.length}
          value={breed}
          onChange={setBreed}
          options={breeds}
        />
        <Select
          text={"tamaño"}
          disabled={!breeds.length}
          value={size}
          onChange={setSize}
          options={inputs.size}
        />
        <Select
          text={"edad"}
          disabled={!breeds.length}
          value={age}
          onChange={setAge}
          options={inputs.age}
        />
        <Select
          text={"género"}
          disabled={!breeds.length}
          value={gender}
          onChange={setGender}
          options={inputs.gender}
        />
        <Select
          text={"pelaje"}
          disabled={!breeds.length}
          value={coat}
          onChange={setCoat}
          options={inputs.coat}
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
          onClick={submit}
          text={"buscar"}
          className="search__submit"
        />
      </form>
      {loading ? <Loader /> : <Results elements={pets} />}
      <div className="pagination-wrapper flex-center">
        <Button
          disabled={!counterPage}
          onClick={decrementPage}
          text={"Anterior"}
          className="button-pagination"
        />
        <Button
          disabled={!counterPage}
          onClick={incrementPage}
          text={"Siguiente"}
          className="button-pagination"
        />
      </div>
    </section>
  );
}
