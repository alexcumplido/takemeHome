import { Link } from "react-router-dom";
import { Modal } from "../../components/modal/Modal.jsx";
import { useState } from "react";
import { Button } from "../../components/button/Button";
export function Footer() {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState({ value: "" });
  const handleChange = (event) => setInput({ value: event.target.value });
  function toggleModal() {
    setShowModal(!showModal);
  }
  return (
    <footer className="footer">
      <div className="footer__superior">
        <section className="footer__cta">
          <p>
            Get the latest on pet adoption and care, sign up and hear from our
            pets.
          </p>
          <Button
            disabled={false}
            onClick={toggleModal}
            text={"sign up"}
            className={"footer__btn"}
          />
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
        </section>{" "}
        {showModal ? (
          <Modal>
            <form className="modal__form">
              <Button
                disabled={false}
                onClick={toggleModal}
                text={"X"}
                className={"button-close"}
              />
              <p>Receive our monthly news!</p>
              <label htmlFor={"email"}>
                {"email"}
                <input
                  className={"modal__input"}
                  type={"email"}
                  id={"emal"}
                  name={"email"}
                  onChange={handleChange}
                  value={input.value}
                  placeholder={"example@gmail.com"}
                  required
                />
              </label>
              <input type="submit" value="Send" className="modal__submit" />
            </form>
          </Modal>
        ) : null}
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
