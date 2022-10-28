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
