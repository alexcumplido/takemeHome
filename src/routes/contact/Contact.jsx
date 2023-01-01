import { useForm, ValidationError } from "@formspree/react";
import { useContext } from "react";
import { AdoptedAnimalContext } from "../../context/AdoptedAnimalContext";
import { Card } from "../../components/card/Card";

export const ContactUs = () => {
  const [animal, setAnimal] = useContext(AdoptedAnimalContext);
  const [state, handleSubmit] = useForm("xeqwjvnn");
  if (state.succeeded) {
    return <p className="form-succeed">Thanks for joining</p>;
  }
  return (
    <>
      <section className="container-standard section flex-center ">
        {animal ? <Card content={animal} /> : null}
      </section>
      <section className="section-form section flex-center ">
        <form onSubmit={handleSubmit} className="form-email container-standard">
          <div className="control-wrapper">
            <label htmlFor="firstName" className="form__label sr-only">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              className="form__input"
              placeholder="First Name"
              required
            />
            <ValidationError
              prefix="First Name"
              field="firstName"
              errors={state.errors}
            />
          </div>
          <div className="control-wrapper">
            <label htmlFor="lastName" className="form__label sr-only">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              className="form__input"
              placeholder="Last Name"
              required
            />
            <ValidationError
              prefix="Last Name"
              field="lastName"
              errors={state.errors}
            />
          </div>
          <div className="control-wrapper">
            <label htmlFor="email" className="form__label sr-only">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="form__input"
              name="email"
              placeholder="email@gmail.com"
              required
            />
            <ValidationError
              prefix="Email"
              ield="email"
              errors={state.errors}
            />
          </div>
          <div className="control-wrapper">
            <label htmlFor="message" className="form__label sr-only">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="form__input"
              placeholder="Write your message"
              rows="7"
              cols="20"
              required
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>
          <button
            type="submit"
            disabled={state.submitting}
            className="form__button"
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
};
