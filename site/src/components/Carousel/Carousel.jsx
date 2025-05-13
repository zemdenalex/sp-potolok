import React, { useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import "./Carousel.css";

export const Carousel = ({ data }) => {
  const [slide, setSlide] = useState(0);
  const delay = 10000;

  const nextSlide = () => {
    setSlide(slide => slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide => slide === 0 ? data.length - 1 : slide - 1);
  };

  useEffect(() => {
    const intervalID = setInterval(()=>{nextSlide()}, delay);
    return () => {
      clearInterval(intervalID);
    }
  }, []);

  return (
    <div className="mx-auto mb-6" style={{ maxWidth: "100%" }}> {/* Match container width */}
      <div className="carousel mt-10 bg-white" style={{ height: "600px" }}>
        <BsArrowLeft onClick={prevSlide} className="arrow sm:w-8 sm:h-8 w-4 h-4 arrow-left mt-10 z-10" />
        <div className="relative w-full h-full flex justify-center items-center">
          {data.map((item, idx) => {
            return (
              <img
                src={item.src}
                alt={item.alt}
                key={idx}
                className={slide === idx ? "slide pointer-events-none" : "pointer-events-none slide slide-hidden"}
              />
            );
          })}
        </div>
        <BsArrowRight
          onClick={nextSlide}
          className="arrow sm:w-8 sm:h-8 w-4 h-4 arrow-right mt-10 z-10"
        />
        <span className="indicators z-10">
          {data.map((_, idx) => {
            return (
              <button
                key={idx}
                className={
                  slide === idx ? "indicator w-1 h-1 sm:w-2 sm:h-2 pointer-events-none" : "indicator w-1 h-1 sm:w-2 sm:h-2 indicator-inactive pointer-events-none"
                }
              ></button>
            );
          })}
        </span>
      </div>
    </div>
  );
};