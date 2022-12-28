import { format } from "express/lib/response";
import React, { useState } from "react";
import { SlideshowData } from "./SlideshowData";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const Slideshow = () => {
  const [current, setCurrent] = useState(0);
  // const length = slides.length;

  return (
    <div>
      {SlideshowData.map((slide, index) => {
        return <img src={slide.image} alt={slide.alt} />;
      })}
      <h3>Images</h3>
    </div>
  );
};

export default Slideshow;
