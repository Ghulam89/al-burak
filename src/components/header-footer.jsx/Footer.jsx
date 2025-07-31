import React from "react";
import logo from "../../assets/images/transparent.png";
import letter from "../../assets/images/Letter.png";
import fb from "../../assets/images/Facebook.png";
import insta from "../../assets/images/Instagram Old.png";
import tiktok from "../../assets/images/TikTok.png";
import phone from "../../assets/images/Phone.png";

export default function Footer() {
  return (
    <footer className=" text-[#E5D0A5]  flex flex-col md:flex-row flex-wrap justify-between sm:p-10 p-4 border border-black font-righteous">
      {/* Logo Section */}
      <div className="w-full md:w-auto md:flex-[0_1_auto] md:min-w-0 mb-8 md:mb-0 md:mx-5 md:my-4 md:text-left">
        <img src={logo} className="w-[120px] bg-black p-2 h-auto mb-2.5   " alt="Logo" />
        <p className="text-black  font-semibold text-base leading-[1.4]">
          "Where Every Scent<br />Tells a Story."
        </p>
      </div>

      {/* About Section */}
      <div className="w-full md:w-[calc(50%-40px)] lg:w-auto lg:flex-1 lg:min-w-[150px] mb-8 md:mb-0 md:mx-5 md:my-4 md:order-2">
        <h3 className="text-xl mb-5  font-bold text-black">About</h3>
        <ul className="list-none p-0 m-0">
          <li className="text-base my-3 text-black">FAQs</li>
          <li className="text-base my-3 text-black">Our Story</li>
          <li className="text-base my-3 text-black">Media Page</li>
          <li className="text-base my-3 text-black">Quiz</li>
          <li className="text-base my-3 text-black">Our New Logo</li>
        </ul>
      </div>

      {/* Customer Service Section */}
      <div className="w-full md:w-[calc(50%-40px)] lg:w-auto lg:flex-1 lg:min-w-[150px] mb-8 md:mb-0 md:mx-5 md:my-4 md:order-3">
        <h3 className="text-xl mb-5  font-bold text-black">Customer service</h3>
        <ul className="list-none p-0 m-0">
          <li className="text-base my-3 text-black">Affiliation</li>
          <li className="text-base my-3 text-black">Ask For A Perfume</li>
          <li className="text-base my-3 text-black">Bulk Orders</li>
          <li className="text-base my-3 text-black">Own a Franchise</li>
          <li className="text-base my-3 text-black">Store Locator</li>
        </ul>
      </div>

      {/* Get in Touch Section */}
      <div className="w-full md:w-[calc(50%-40px)] lg:w-auto lg:flex-1 lg:min-w-[150px] mb-8 md:mb-0 md:mx-5 md:my-4 md:order-4">
        <h3 className="text-xl mb-5  font-bold text-black">Get in touch</h3>
        <div className="flex items-center my-2 text-base">
          <img src={phone} className=" mr-2" alt="Phone icon" />
          <span className=" text-black">+92 132 343 4577</span>
        </div>
        <div className="flex items-center my-2 text-base">
          <img src={letter} className=" mr-2" alt="Email icon" />
          <span className=" text-black">xyz@gmail.com</span>
        </div>
        <p className="mt-3  text-black text-base">Follow us</p>
        <div className="flex gap-2.5 mt-2">
          <img src={fb} className=" brightness-0" alt="Facebook icon" />
          <img src={insta} className=" brightness-0" alt="Instagram icon" />
          <img src={tiktok} className=" brightness-0" alt="TikTok icon" />
        </div>
      </div>
    </footer>
  );
}