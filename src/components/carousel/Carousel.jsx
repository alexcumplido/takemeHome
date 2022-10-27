import { useState } from "react";

export function Carousel(params) {
  const [active, setActive] = useState(0);
  let photos = params.photos;

  function togglePrevious() {
    if (active > 0) {
      setActive(active - 1);
    }
  }

  function toggleNext() {
    if (active < photos.length - 1) {
      setActive(active + 1);
    }
  }

  return !photos.length ? (
    <img src={`http://pets-images.dev-apis.com/pets/none.jpg`} alt="animal" />
  ) : (
    <div className="carousel">
      <img
        className="carousel__active"
        src={photos[active].full}
        alt="animal"
      />
      <div className="control">
        <button onClick={togglePrevious} className="prev-slide">
          <svg
            className="icon-toggle"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M729.6 931.2l-416-425.6 416-416c9.6-9.6 9.6-25.6 0-35.2-9.6-9.6-25.6-9.6-35.2 0l-432 435.2c-9.6 9.6-9.6 25.6 0 35.2l432 441.6c9.6 9.6 25.6 9.6 35.2 0C739.2 956.8 739.2 940.8 729.6 931.2z"
              p-id="10915"
            ></path>
          </svg>
        </button>
        <button onClick={toggleNext} className="next-slide">
          <svg
            className="icon-toggle"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M761.6 489.6l-432-435.2c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l416 416-416 425.6c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l432-441.6C771.2 515.2 771.2 499.2 761.6 489.6z"
              p-id="10760"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
