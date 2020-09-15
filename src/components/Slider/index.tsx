import React from "react";
import ReactSlider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

type Props = {
  children: React.ReactNode;
};

export default function Slider({ children, ...restofProps }: Props) {
  return (
    <ReactSlider {...sliderSettings} {...restofProps}>
      {children}
    </ReactSlider>
  );
}
