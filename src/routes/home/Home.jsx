import { useEffect, useState } from "react";
import { client } from "../../utils/utils.js";
import { Results } from "../../components/results/Results.js";
import { Hero } from "../../components/hero/Hero.js";
import { Loader } from "../../components/loader/Loader.js";

export function Home() {
  const [homeContent, setHomeContent] = useState([]);
  const [loading, setLoading] = useState(true);

  function fetchAnimals() {
    client.animal
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
        setHomeContent([...responseObject.data.animals]);
        setLoading(false);
      })
      .catch(function onRejection(responseObject) {
        console.log(responseObject);
      });
  }

  function getLastViewed() {
    let viewedAnimals = [];
    let storageAnimals = JSON.parse(localStorage.getItem("lastViewed"));
    for (let i = 0; i < 8 && storageAnimals[i]; i++) {
      client.animal
        .show(storageAnimals[i])
        .then(function onFulFillmenzt(responseObject) {
          viewedAnimals.push(responseObject.data.animal);
          setHomeContent([...viewedAnimals]);
          setLoading(false);
        })
        .catch(function onRejection(responseRejection) {
          console.log(responseRejection);
        });
    }
  }
  useEffect(function () {
    if (localStorage.getItem("lastViewed")) {
      getLastViewed();
    } else {
      fetchAnimals();
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
  return (
    <main>
      <Hero />
      {loading ? <Loader /> : <Results pets={homeContent} />}
    </main>
  );
}
