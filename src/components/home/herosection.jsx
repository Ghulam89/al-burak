import React from "react";
import hero_cricle from "../../assets/images/hero_circle.png";
import hero from "../../assets/images/hero_right.png";
import heroLeft from "../../assets/images/hero_left.png";
import Button from "../common/Button";

const HeroSection = () => {
  return (
    <div className="border-b border-black bg-HeroBg bg-no-repeat  bg-cover bg-center">
      <div className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 w-full box-border  max-w-7xl mx-auto">
        {/* Left Image - Hidden on smallest screens, shown from sm upwards */}
        <div className="hidden sm:flex w-full md:w-1/2 lg:w-3/12 items-center justify-center p-2 sm:p-4">
          <img
            src={heroLeft}
            alt="Gold Incense Perfume"
            className="  w-96 h-96 object-cover"
          />
        </div>

        {/* Text Content - Always centered */}
        <div className="py-6 md:py-0 w-full md:w-6/12 lg:w-5/12 text-center">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-[32px] lg:text-[40px] text-white tracking-[0.1em] font-bold font-[inter] mb-2 md:mb-4 leading-tight">
            Explore Unique  Fragrance Journeys
          </h1>
          
          <div className="my-4 md:my-6">
            <button className="font-[inter] text-center text-white border border-white px-3 py-2 transition-colors  hover:bg-white hover:text-black">
              Where elegance meets perfume.
            </button>
          </div>
          
          <h3 className="text-xl sm:text-2xl whitespace-nowrap md:text-3xl text-center text-primary font-[inter] font-bold  uppercase mb-2 md:mb-4">
            DIRHAM ARD AL ZAAFRAN
          </h3>
        </div>

        <div className="w-full sm:w-auto md:w-1/2 lg:w-4/12 flex items-center justify-center p-2 sm:p-4">
        
          <img
            src={hero}
            alt="Gold Incense Perfume"
            className="  w-96  sm:h-96 h-72 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;