"use client";

import { Button } from "@nextui-org/button";
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopBtn = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Button
      isIconOnly
      aria-label="Scroll to top"
      color="danger"
      className="fixed bottom-4 right-4 z-50 hidden md:flex"
      style={{ display: isScrolled ? "flex" : "none" }}
      onClick={handleScrollToTop}
    >
      <FaArrowUp />
    </Button>
  );
};

export default ScrollToTopBtn;
