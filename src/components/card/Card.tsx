import { Link } from "react-router-dom";
import { ButtonSave } from "../buttonSave/ButtonSave";
import { TypePet } from "../../utils/types";
import { IconReplace } from "../iconsvg/Icon";

type CardProps = {
  content: TypePet;
};

export function Card(props: CardProps): JSX.Element {
  return (
    <article className="card">
      <ButtonSave content={props.content} />
      <Link to={`/details/${props.content.id}`} className="link card__link">
        {props.content.photos.length ? (
          <img
            className="card__image"
            src={props.content.photos[0].full}
            alt={props.content.name}
            title={props.content.name}
          />
        ) : (
          <IconReplace />
        )}
      </Link>
      <div className="card__description">
        <Link to={`/details/${props.content.id}`} className="card__link">
          <p className="card__name">{props.content.name}</p>
        </Link>
        <p>{`${props.content.age} · ${props.content.city} · ${props.content.state}`}</p>
      </div>
    </article>
  );
}
