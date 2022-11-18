import { useState, useEffect, useDebugValue } from "react";
import { client } from "./services.js";

const localCache = {};

export function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  useDebugValue(`Number of value in cache ${Object.keys(localCache)}`);

  useEffect(
    function () {
      if (!animal) {
        setBreedList([]);
      } else if (localCache[animal]) {
        setBreedList(localCache[animal]);
      } else {
        setBreedList([]);
        client.animalData
          .breeds(animal)
          .then(function onFulfillment(responseObject) {
            localCache[animal] = responseObject.data.breeds || [];
            setBreedList(localCache[animal]);
          })
          .catch(function onRejection(responseObject) {
            console.log(responseObject);
          });
      }
    },
    [animal]
  );
  return [breedList];
}
