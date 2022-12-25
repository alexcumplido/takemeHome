export const ContactUs = () => {
  return (
    <section className="section-form section flex-center ">
      <form className="form-email container-standard">
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
