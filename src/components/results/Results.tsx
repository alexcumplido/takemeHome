import { Card } from "../card/Card.jsx";
import { TypePet } from "../../utils/types";

type TypeResults = {
  elements: TypePet [];
};

export function Results(props : TypeResults): JSX.Element {
  return (
    <section className="container-standard results">
      {!props.elements || !props.elements.length ? (
        <h2 className="home-heading">Search a pet</h2>
      ) : (
        props.elements.map(function (element) {
          return <Card key={element.id} pet={element} />;
        })
      )}  
    </section>
  );
}
