import { useState, useEffect } from "react";
import { client } from "./services.js";

const localCache = {};

export function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
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
            if (responseObject.data.breeds.length) {
              localCache[animal] = responseObject.data.breeds.map(function (
                element
              ) {
                return element.name;
              });
            } else {
              localCache[animal] = [];
            }
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
