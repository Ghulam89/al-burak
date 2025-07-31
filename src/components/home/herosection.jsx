import React from "react";
import hero_cricle from "../../assets/images/hero_circle.png";
import hero from "../../assets/images/hero.png";
import Button from "../common/Button";

const HeroSection = () => {
  return (
    <div className="border-b border-black">
    <div className="flex flex-col-reverse md:flex-row  items-center justify-center px-4 sm:px-6 lg:px-8 w-full box-border min-h-[70vh]  max-w-6xl mx-auto ">
      {/* Text Content */}
      <div className="py-6 md:py-0 w-full md:w-1/2 lg:w-6/12 text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl text-center tracking-[0.1em]  md:text-6xl lg:text-[64px]  font-bold  font-[inter] mb-2 md:mb-4">
          Dirham Ard <br/> Al Zaafaran
        </h1>
        <h3 className=" text-4xl sm:text-5xl text-center  md:text-6xl lg:text-[64px] text-primary  font-[inter] font-bold tracking-[0.2em] uppercase mb-2 md:mb-4">
          20% OFF
        </h3>
        <p className="text-xl sm:text-2xl text-center  lg:text-[32px] font-[inter] tracking-wider mb-6 md:mb-8">
          on all perfumes
        </p>
        <div className="mt-4 md:mt-6 mx-auto">
          <Button
            label={"Shop Now"}
            className="bg-black   mx-auto font-[inter] w-32 text-primary hover:bg-gray-800 transition-colors"
          />
        </div>
      </div>

      {/* Image Content */}
      <div className="w-full md:w-1/2 lg:w-6/12 flex items-center justify-center p-2 sm:p-4">
        <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
          <img
            src={hero_cricle}
            alt="Gold Incense Perfume"
            className="w-full h-auto"
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <img
              src={hero}
              alt="Gold Incense Perfume"
              className="w-3/4 h-auto transform -translate-y-5 -translate-x-8 sm:-translate-x-10 md:-translate-x-12"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HeroSection;