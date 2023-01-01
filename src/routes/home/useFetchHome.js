import { useState, useEffect } from "react";
import { client } from "../../utils/services";
import { cleanObject } from "../../utils/utils";

export function useFetchHome() {
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    handleRequest();
    async function handleRequest() {
      try {
        let dataApi = await client.animal.search({
          type: "Dog",
          breed: "",
          size: "",
          age: "",
          gender: "",
          coat: "",
          house_trained: false,
          page: 1,
          limit: 10,
        });
        dataApi = dataApi.data.animals.map((element) => cleanObject(element));
        setResponse(dataApi);
        setLoading(false);
      } catch (error) {
        throw new Error(error);
      }
    }
  }, []);

  return [response, loading];
}
