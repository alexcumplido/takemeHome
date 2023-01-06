import { useState } from "react";
import { IconPrev, IconNext, IconReplace } from "../iconsvg/Icon";
import { Button } from "../button/Button";
type CarouselProps = {
  photos: { [key: string]: string }[] | [];
};

export function Carousel(props: CarouselProps): JSX.Element {
  const lenght = props.photos.length - 1;
  const [count, setCount] = useState(0);

  const prevCount = () => {
    count > 0 && setCount((state) => state - 1);
  };

  const nextCount = () => {
    count < lenght && setCount((state) => state + 1);
  };

  return !props.photos.length ? (
    <div className="carousel">
      <IconReplace />
    </div>
  ) : (
    <div className="carousel">
      <img
        className="carousel__active"
        src={props.photos[count].full}
        alt="animal"
      />
      <div className="control">
        <Button disabled={false} onClick={prevCount} className={"next-slide"}>
          <IconPrev />
        </Button>
        <Button disabled={false} onClick={nextCount} className={"next-slide"}>
          <IconNext />
        </Button>
      </div>
    </div>
  );
}
