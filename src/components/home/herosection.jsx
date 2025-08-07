import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import hero from "../../assets/images/banner1.webp";

const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute sm:right-5 right-2 top-1/2   bg-black -translate-y-1/2 sm:w-12 w-9 sm:h-12 h-9 bg-orange-500 rounded-lg flex items-center justify-center cursor-pointer opacity-80 hover:opacity-100 z-10"
        onClick={onClick}
      >
        <FaChevronRight className="text-white sm:text-2xl text-lg" />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute sm:left-5 left-2 top-1/2  bg-black  -translate-y-1/2 sm:w-12 w-9 sm:h-12 h-9 bg-orange-500 rounded-lg flex items-center justify-center cursor-pointer opacity-80 hover:opacity-100 z-10"
        onClick={onClick}
      >
        <FaChevronLeft className="text-white sm:text-2xl text-lg" />
      </div>
    );
  }

  const sliderImages = [
    hero,
    hero,
  ];

  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {sliderImages.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full sm:h-[400px] h-[300px] object-cover object-center"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSection;