import { useEffect, useState } from "react";
import { requestHomeDogs } from "../../utils/services";
import { Results } from "../../components/results/Results";
import { Hero } from "../../components/hero/Hero";
import { Loader } from "../../components/loader/Loader";

export function Home() {
  const [homeContent, setHomeContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    handleRequest();
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
            Últimos animales vistos
          </h2>
          <Results elements={homeContent} />
        </>
      )}
    </main>
  );
}
