import { useState, useEffect } from "react";
import { client } from "../../utils/services";
import { cleanObject } from "../../utils/utils";
import { TypePet } from "../../utils/types";

export function useFetchHome(): [TypePet[] | undefined, boolean] {
  const [requestFetched, setRequestFethed] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    void handleRequest();
    async function handleRequest() {
      await client.animal
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
        .then(function onFulfillment(response) {
          setRequestFethed(
            response.data.animals.map((element) => cleanObject(element))
          );
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return [requestFetched, loading];
}
