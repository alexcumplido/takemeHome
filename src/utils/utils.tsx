import { TypePet } from "../utils/types";

export function existKeyStorage(key: string) : boolean {
  const exist = (localStorage.getItem(key)) ? true : false;
  return exist;
}

export function retrieveKeyStorage(key : string) {
  const storage = JSON.parse(localStorage.getItem(key));
  return storage;
}

export function cleanObject(element: any): TypePet{
  const noData = "No data";
  return {
    id: element.id ?? noData,
    description: element.description ?? noData,
    photos: element.photos ?? [],
    name: element.name ?? noData,
    type: element.type ?? noData,
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