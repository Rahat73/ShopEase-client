"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

import FirstBanner from "./first-banner";
import Secondbanner from "./second-banner";

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
            <FirstBanner />
          </div>
          <div style={{ flex: "0 0 100%", minWidth: 0 }}>
            <Secondbanner />
          </div>
          {/* <div style={{ flex: "0 0 100%", minWidth: 0 }}>
            <Image src={banner2} alt="banner2" />
          </div>
          <div style={{ flex: "0 0 100%", minWidth: 0 }}>
            <Image src={banner3} alt="banner3" />
          </div>
          <div style={{ flex: "0 0 100%", minWidth: 0 }}>
            <Image src={banner4} alt="banner4" />
          </div> */}
        </div>
      </div>
      <div className="absolute bottom-4 right-4">
        <button className="embla__prev" onClick={scrollPrev}>
          <IoIosArrowDropleftCircle className="text-3xl md:text-5xl text-slate-500" />
        </button>
        <button className="embla__next" onClick={scrollNext}>
          <IoIosArrowDroprightCircle className="text-3xl md:text-5xl text-slate-500" />
        </button>
      </div>
    </div>
  );
};

export default BannerSection;
