"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import Image from "next/image";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

import banner1 from "@/src/assets/images/banner1.jpg";
import banner2 from "@/src/assets/images/banner2.jpg";
import banner3 from "@/src/assets/images/banner3.jpg";
import banner4 from "@/src/assets/images/banner4.jpg";

const BannerSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="overflow-hidden relative">
      <div ref={emblaRef}>
        <div className="flex">
          <div style={{ flex: "0 0 100%", minWidth: 0 }}>
            <Image src={banner1} alt="banner1" />
          </div>
          <div style={{ flex: "0 0 100%", minWidth: 0 }}>
            <Image src={banner2} alt="banner2" />
          </div>
          <div style={{ flex: "0 0 100%", minWidth: 0 }}>
            <Image src={banner3} alt="banner3" />
          </div>
          <div style={{ flex: "0 0 100%", minWidth: 0 }}>
            <Image src={banner4} alt="banner4" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4">
        <button className="embla__prev" onClick={scrollPrev}>
          <IoIosArrowDropleftCircle className="text-5xl text-slate-500" />
        </button>
        <button className="embla__next" onClick={scrollNext}>
          <IoIosArrowDroprightCircle className="text-5xl text-slate-500" />
        </button>
      </div>
    </div>
  );
};

export default BannerSection;
