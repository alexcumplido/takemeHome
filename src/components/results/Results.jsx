import { Card } from "../card/Card.jsx";

export function Results({ pets }) {
  return (
    <section className="container-standard results">
      {!pets || !pets.length ? (
        <h2 className="home-heading">Buscar animales</h2>
      ) : (
        pets.map(function (element) {
          return <Card key={element.id} pet={element} />;
        })
      )}
    </section>
  );
}
