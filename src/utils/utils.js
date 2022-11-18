export const inputs = {
  size: ["Small", "Medium", "Large", "Extra Large"],
  age: ["Baby", "Young", "Adult", "Senior"],
  gender: ["Female", "Male"],
  coat: ["Hairless", "Short", "Medium", "Long", "Wire", "Curly"],
  care: ["House-trained"],
};

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

export function cleanObject(element) {
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
    lastDate: element.status_changed_at ?? noData,
  };
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
