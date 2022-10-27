import { Card } from "../card/Card.js";

export function Results(params) {
  const { pets } = params;
  return (
    <section className="container-standard results">
      {!pets || !pets.length ? (
        <h1>Search a pet please</h1>
      ) : (
        pets.map(function (element) {
          return <Card key={element.id} pet={element} />;
        })
      )}
    </section>
  );
}
