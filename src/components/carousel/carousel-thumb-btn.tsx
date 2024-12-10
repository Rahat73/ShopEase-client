import { Image } from "@nextui-org/react";
import React from "react";

import { noImg } from "@/src/constants";

type PropType = {
  src: string;
  selected: boolean;
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, onClick } = props;

  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <Image
        src={props.src || noImg}
        radius="sm"
        width={100}
        height={70}
        className="object-cover cursor-pointer"
        onClick={onClick}
      />
    </div>
  );
};
