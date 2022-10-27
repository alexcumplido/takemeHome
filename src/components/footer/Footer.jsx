import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__superior">
        <section className="footer__cta">
          <p>
            Get the latest on pet adoption and care, sign up and hear from our
            pets.
          </p>
          <button className="footer__btn">sign up</button>
        </section>
        <nav className="footer__nav">
          <ul>
            <li>
              <Link className="link footer__link" to="/">
                About takemeHome
              </Link>
            </li>
            <li>
              <Link className="link footer__link" to="/">
                Pet Adoption
              </Link>
            </li>
            <li>
              <Link className="link footer__link" to="/">
                Pet care topics
              </Link>
            </li>
            <li>
              <Link className="link footer__link" to="/">
                Sitemap
              </Link>
            </li>
            <li>
              <Link className="link footer__link" to="/">
                Pet care topics
              </Link>
            </li>
            <li>
              <Link className="link footer__link" to="/">
                Shelter registration
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="footer__inferior">
        <section className="footer__social flex-center">
          <i className="fa-brands fa-facebook-f"></i>
          <i className="fa-brands fa-twitter"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-youtube"></i>
          <i className="fa-brands fa-pinterest-p"></i>
        </section>
        <section className="footer__legal">
          <p>
            <span>©2022 takemehome.com</span>
            all rights reserved to Alexandre Cumplido Bou.
          </p>
        </section>
      </div>
    </footer>
  );
}
