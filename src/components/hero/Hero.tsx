import { Link } from "react-router-dom";

export function Hero(): JSX.Element {
  return (
    <section className="hero">
      <Link to="/search" className="link hero__link flex-center">
        Buscar animales
      </Link>
      <Link to="/dashboard" className="link flex-center hero__link flex-center">
        Ver favoritos
      </Link>
      <Link to="/" className="link flex-center hero__link flex-center">
        Encontrar refugio
      </Link>
    </section>
  );
}
