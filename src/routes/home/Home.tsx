import { useFetchHome } from "./useFetchHome";
import { Hero } from "../../components/hero/Hero";
import { Loader } from "../../components/loader/Loader";
import { Results } from "../../components/results/Results";

export function Home(): JSX.Element {
  const [response, loading] = useFetchHome();
  return (
    <main>
      <Hero />
      {loading ? <Loader /> : <Results elements={response} />}
    </main>
  );
}
