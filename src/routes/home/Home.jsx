import { useEffect, useState } from "react";
import { requestHomeDogs } from "../../utils/utils.js";
import { Results } from "../../components/results/Results.jsx";
import { Hero } from "../../components/hero/Hero.jsx";
import { Loader } from "../../components/loader/Loader.jsx";

export function Home() {
  const [homeContent, setHomeContent] = useState([]);
  const [loading, setLoading] = useState(true);

  function getLastViewed() {
    let storageAnimals = JSON.parse(localStorage.getItem("viewedElements"));
    setHomeContent([...storageAnimals]);
    setLoading(false);
  }

  useEffect(function () {
    if (localStorage.getItem("viewedElements")) {
      getLastViewed();
    } else {
      handleRequest();
    }
    async function handleRequest() {
      const response = await requestHomeDogs();
      setHomeContent([...response]);
      setLoading(false);
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main>
      <Hero />
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="home-heading container-standard">
            Last animals viewed
          </h2>
          <Results pets={homeContent} />
        </>
      )}
    </main>
  );
}
