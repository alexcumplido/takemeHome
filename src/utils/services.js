import { Client } from "@petfinder/petfinder-js";
import { cleanObject } from "./utils";

export const inputs = {
  size: ["Small", "Medium", "Large", "Extra Large"],
  age: ["Baby", "Young", "Adult", "Senior"],
  gender: ["Female", "Male"],
  coat: ["Hairless", "Short", "Medium", "Long", "Wire", "Curly"],
  care: ["House-trained"],
};

const petApi = {
  API_KEY: "wb3Pi0bmejW1JKL079AroKYF9MCWKzvrHliSTvt7UBbCC1Blch",
  API_SRC: "SCsspTeddgTKdk3zeP6t8w2Z8rTe6YwyykuAkr1K",
};

export const client = new Client({
  apiKey: petApi.API_KEY,
  secret: petApi.API_SRC,
});

export async function fetchTypes() {
  const result = await client.animalData
    .types()
    .then(function onFulfillment(responseObject) {
      return responseObject.data.types.map((element) => element.name);
    })
    .catch(function onRejection(responseObject) {
      console.log(responseObject);
    });
  return result;
}

export async function fetchAnimals(
  animal,
  breed,
  size,
  age,
  gender,
  coat,
  care,
  counterPage = 1
) {
  const result = await client.animal
    .search({
      type: animal,
      breed: breed,
      size: size,
      age: age,
      gender: gender,
      coat: coat,
      house_trained: care,
      page: counterPage,
      limit: 25,
    })
    .then(function onFulfillment(responseObject) {
      let animalsCleaned = responseObject.data.animals.map((element) =>
        cleanObject(element)
      );
      return {
        animals: animalsCleaned,
        pagination: responseObject.data.pagination,
      };
    })
    .catch(function onRejection(responseObject) {
      console.log(responseObject);
    });
  return result;
}

export const requestPet = async ({ queryKey }) => {
  const id = queryKey[1];
  const apiRes = await client.animal
    .show(`${id}`)
    .then(function onFulfillment(responseObject) {
      return cleanObject(responseObject.data.animal);
    })
    .catch(function onRejection(responseObject) {
      console.log(responseObject);
      return responseObject;
    });

  return apiRes;
};
