import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "contact_service",
        "contact_service",
        form.current,
        "BKcXq_CegrvDvp6gt"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <section className="section-form section flex-center ">
      <form
        ref={form}
        onSubmit={sendEmail}
        className="form-email container-standard"
      >
        <div className="control-wrapper">
          <label htmlFor="user__name" className="form__label sr-only">
            Name
          </label>
          <input
            className="form__input"
            type="text"
            name="user_name"
            placeholder="Jane Apeelseed"
            required
          />
        </div>
        <div className="control-wrapper">
          <label htmlFor="user_email" className="form__label sr-only">
            email
          </label>
          <input
            className="form__input"
            type="email"
            name="user_email"
            placeholder="janeappleseed@gmail.com"
            required
          />
        </div>
        <div className="control-wrapper">
          <label htmlFor="message" className="form__label sr-only">
            Message
          </label>
          <textarea
            className="form__input"
            name="message"
            placeholder="Write your message here..."
            rows="7"
            cols="20"
            required
          ></textarea>
        </div>
        <input type="submit" value="Send" className="form__button" />
      </form>
    </section>
  );
};
