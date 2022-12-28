import { Link } from "react-router-dom";
import { Modal } from "../../components/modal/Modal.jsx";
import { useState } from "react";
import { Button } from "../../components/button/Button";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";

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
            Recive las últimas noticias acerca del cuidado de animales con
            nuestra newsletter.
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
                Acerca takemeHome
              </Link>
            </li>
            <li>
              <Link className="link footer__link" to="/">
                Adopción de animales
              </Link>
            </li>
            <li>
              <Link className="link footer__link" to="/">
                Cuidado de mascotas
              </Link>
            </li>
            <li>
              <Link className="link footer__link" to="/">
                Registro de refugios
              </Link>
            </li>
            <li>
              <Link className="link footer__link" to="/">
                Sitio del mapa
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="footer__inferior">
        <section className="footer__social flex-center">
          <FaTwitter />
          <FaFacebook />
          <FaInstagram />
          <FaPinterest />
          <FaYoutube />
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
