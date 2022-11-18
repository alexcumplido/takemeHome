import { Client } from "@petfinder/petfinder-js";

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

export function existKeyStorage(key) {
  let exist = false;
  if (localStorage.getItem(key)) {
    exist = true;
  }
  return exist;
}

export function retrieveKeyStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export async function requestHomeDogs() {
  const response = await client.animal
    .search({
      type: "Dog",
      breed: "",
      size: "",
      age: "",
      gender: "",
      coat: "",
      house_trained: false,
      page: 1,
      limit: 10,
    })
    .then(function onFulfillment(responseObject) {
      return responseObject.data.animals;
    })
    .catch(function onRejection(responseObject) {
      console.log(responseObject);
    });
  return response;
}

export async function fetchTypes() {
  const result = await client.animalData
    .types()
    .then(function onFulfillment(responseObject) {
      return responseObject.data.types;
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
  console.log(animal, breed, size, age, gender, coat, care, counterPage);
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
      console.log(responseObject);

      return responseObject.data;
    })
    .catch(function onRejection(responseObject) {
      console.log(responseObject);
    });
  return result;
}

function cleanResponsePet(responseObject) {
  let element = responseObject.data.animal;
  let noData = "No data";
  return {
    id: element.id ?? noData,
    description: element.description ?? noData,
    photos: element.photos ?? noData,
    name: element.name ?? noData,
    species: element.species ?? noData,
    breedPrimary: element.breeds.primary ?? noData,
    breedSecondary: element.breeds.secondary ?? noData,
    mixed: element.breeds.mixed ?? noData,
    city: element.contact.address.city ?? noData,
    adress: element.contact.address.adress1 ?? noData,
    state: element.contact.address.state ?? noData,
    postcode: element.contact.address.postcode ?? noData,
    email: element.contact.email ?? noData,
    phone: element.contact.phone ?? noData,
    age: element.age ?? noData,
    gender: element.gender ?? noData,
    size: element.size ?? noData,
    tags: element.tags ?? noData,
    status: element.status ?? noData,
  };
}

export async function requestPet(id) {
  const response = await client.animal
    .show(id)
    .then(function onFulfillment(responseObject) {
      return cleanResponsePet(responseObject);
    })
    .catch(function onRejection(responseObject) {
      console.log(responseObject);
    });
  return response;
}

export function _map(list, callback) {
  let storage = [];
  try {
    if (Array.isArray(list)) {
      for (let index = 0; index < list.length; index++) {
        storage.push(callback(list[index], index, list));
      }
    } else {
      for (let key in list) {
        storage.push(callback(list[key], key, list));
      }
    }
  } catch (error) {
    throw new Error(error);
  }
  return storage;
}
