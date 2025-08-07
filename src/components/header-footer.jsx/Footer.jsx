import React from "react";
import logo from "../../assets/images/transparent.png";
import letter from "../../assets/images/Letter.png";
import fb from "../../assets/images/Facebook.png";
import insta from "../../assets/images/Instagram Old.png";
import tiktok from "../../assets/images/TikTok.png";
import phone from "../../assets/images/Phone.png";
import ubl from '../../assets/images/ubl_pay_logo.webp';
import raast from '../../assets/images/Raast_Logo-1.webp';
import paypak from '../../assets/images/Paypak-logo-1.png';
import express from '../../assets/images/American-Express-1.webp';
import unicon from '../../assets/images/unionpay_logo.webp'
export default function Footer() {
  return (
    <footer className=" text-[#E5D0A5]   grid  sm:grid-cols-2 grid-cols-1 md:grid-cols-4 sm:p-10 p-4 border border-black font-righteous">
      {/* Logo Section */}
      <div className="w-full ">
        <img src={logo} className="w-[120px] bg-black p-2 h-auto mb-2.5   " alt="Logo" />
        <p className="text-black  font-semibold text-base leading-[1.4]">
          "Where Every Scent<br />Tells a Story."
        </p>
      </div>

      {/* About Section */}
      <div className="w-full ">
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
      <div className="w-full">
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
      <div className="w-full">
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
        <div className="flex  sm:justify-start justify-center gap-2.5 mt-2">
          <img src={fb} className=" brightness-0" alt="Facebook icon" />
          <img src={insta} className=" brightness-0" alt="Instagram icon" />
          <img src={tiktok} className=" brightness-0" alt="TikTok icon" />
        </div>
      </div>
      {/* Get in Touch Section */}
 <div className="col-span-full md:col-span-3">       
       <div className="flex flex-wrap justify-center w-full sm:justify-start  sm:mt-6 mt-3">
  <img src={ubl} className="w-24 sm:w-32 h-8 sm:h-10 object-contain" alt="UBL payment" />
  <img src={raast} className="w-24 sm:w-32 h-8 sm:h-10 object-contain" alt="Raast payment" />
  <img src={paypak} className="w-24 sm:w-32 h-8 sm:h-10 object-contain" alt="PayPak payment" />
  <img src={express} className="w-24 sm:w-32 h-6 sm:h-8 object-contain" alt="Express payment" />
  <img src={unicon} className="w-24 sm:w-32 h-6 sm:h-8 object-contain" alt="Unicon payment" />
</div>
      </div>

    </footer>
  );
}