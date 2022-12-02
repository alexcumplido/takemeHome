
type photo = {
    [key: string] : string
};

export type TypePet = {
    id: number | string,
    description: string,
    photos: photo [] | [],
    name: string
    species:  string,
    breedPrimary: string,
    breedSecondary: string,
    mixed: boolean,
    city: string,
    adress:  string,
    state: string,
    postcode:  string,
    email: string,
    phone: string,
    age: string,
    gender: string,
    size: string,
    tags: string [] | [],
    status: string,
    lastDate: string,
  };

