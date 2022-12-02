import { Link } from "react-router-dom";

export function Hero(): JSX.Element {
  return (
    <section className="hero">
      <Link to="/search" className="link hero__link flex-center">
        Search pets
      </Link>
      <Link to="/dashboard" className="link flex-center hero__link flex-center">
        See favourites
      </Link>
      <Link to="/" className="link flex-center hero__link flex-center">
        Find shelters
      </Link>
    </section>
  );
}
