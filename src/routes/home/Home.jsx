import { useFetchHome } from "./useFetchHome.js";
import { Results } from "../../components/results/Results";
import { Hero } from "../../components/hero/Hero";
import { Loader } from "../../components/loader/Loader";

export function Home() {
  const [response, loading] = useFetchHome();
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
          <Results elements={response} />
        </>
      )}
    </main>
  );
}
