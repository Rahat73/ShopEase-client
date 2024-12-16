import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Image } from "@nextui-org/react";

import { Thumb } from "./carousel-thumb-btn";

import { noImg } from "@/src/constants";

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
};

const Carousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla">
      <div ref={emblaMainRef} className="embla__viewport">
        <div className="embla__container">
          {slides.map((_, index) => (
            <div key={index} className="embla__slide">
              <Image
                src={slides[index] || noImg}
                width={500}
                height={500}
                className="object-cover"
                alt="Prodcut Image"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div ref={emblaThumbsRef} className="embla-thumbs__viewport">
          <div className="embla-thumbs__container">
            {slides.map((slide, index) => (
              <Thumb
                key={index}
                src={slide}
                selected={index === selectedIndex}
                onClick={() => onThumbClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
