import React from "react";
import hero from '../../assets/images/hero.png';

const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-5 w-full bg-black text-[#E5D0A5] box-border min-h-[70vh] max-h-[900px] overflow-hidden">
     
      <div className="w-full md:w-1/2 py-10 md:py-0 px-4 text-center md:text-left max-w-2xl mx-auto md:mx-0">
        <h2 className="text-4xl  text-center sm:text-5xl md:text-6xl lg:text-7xl   tracking-[15px] font-serif  font-medium mb-2 md:mb-4 uppercase">
          GOLD
        </h2>
        <h2 className="text-4xl text-center sm:text-5xl md:text-6xl lg:text-7xl tracking-[15px] font-serif font-medium mb-4 md:mb-6 uppercase">
          INCENSE
        </h2>
        <h3 className="text-3xl text-center sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-wide mb-2 md:mb-4 uppercase">
          20% OFF
        </h3>
        <p className="text-lg text-center sm:text-xl md:text-2xl tracking-wider">
          on all perfumes
        </p>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <img
          src={hero}
          alt="Gold Incense Perfume"
          className="h-[50vh] md:h-[70vh] max-h-[450px] md:max-h-[700px] w-auto object-contain"
        />
      </div>
    </div>
  );
};

export default HeroSection;