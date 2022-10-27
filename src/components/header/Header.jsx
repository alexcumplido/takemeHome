import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function Header() {
  const [offsetMenu, setOffsetMenu] = useState(false);
  const location = useLocation();

  function handleClick() {
    setOffsetMenu(!offsetMenu);
  }

  useEffect(
    function () {
      setOffsetMenu(false);
    },
    [location] //eslint-disable-line react-hooks/exhaustive-deps
  );
  return (
    <header className="container-standard header">
      <Link className="logo link" to="/">
        takemeHome
      </Link>
      <button
        className="menu-toggle"
        aria-label="Open main menu"
        onClick={handleClick}
        aria-pressed={offsetMenu}
      >
        <span className="sr-only">Open main menu</span>
        <span className="fa fa-bars" aria-hidden="true"></span>
      </button>
      <nav id="main-menu" className="main-nav" aria-label="Main menu">
        <button
          className="menu-close"
          aria-label="Close main menu"
          onClick={handleClick}
          aria-pressed={offsetMenu}
        >
          <span className="sr-only">Close main menu</span>
          <span className="fa fa-close" aria-hidden="true"></span>
        </button>
        <ul className="flex-center nav__list">
          <li>
            <Link className="link nav__link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="link nav__link" to="/search">
              Search
            </Link>
          </li>
          <li>
            <Link className="link nav__link" to="/dashboard">
              Saved
            </Link>
          </li>
          <li>
            <Link className="link nav__link" to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <div className="backdrop" tabIndex="-1" hidden></div>
    </header>
  );
}
