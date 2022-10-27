import { useState, useEffect, useDebugValue } from "react";
import { client } from "./utils.js";

const localCache = {};

export function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");
  useDebugValue(`Number of value in cache ${Object.keys(localCache)}`);

  useEffect(
    function () {
      if (!animal) {
        setBreedList([]);
      } else if (localCache[animal]) {
        setBreedList(localCache[animal]);
      } else {
        setBreedList([]);
        setStatus("loading");
        client.animalData
          .breeds(animal)
          .then(function onFulfillment(responseObject) {
            localCache[animal] = responseObject.data.breeds || [];
            setBreedList(localCache[animal]);
            setStatus("loaded");
          })
          .catch(function onRejection(responseObject) {
            console.log(responseObject);
          });
      }
    },
    [animal]
  );
  return [breedList, status];
}