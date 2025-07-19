import React, { use } from "react";
import '../../App.css';
import product from '../../assets/images/product.jpg';
import { useNavigate, useParams } from 'react-router-dom';

const BestSelling = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  return (
    <div className="bg-black text-white p-5 md:p-10 font-sans">
      <div className="flex items-center justify-center mb-8 md:mb-12">
        <div className="h-0.5  bg-lightGray flex-1 max-w-[80px] sm:max-w-[150px] md:max-w-[500px]"></div>
        <div className="text-xl sm:text-2xl md:text-3xl font-bold font-[roboto]  text-lightGray px-4 uppercase tracking-wider">
          BEST SELLING
        </div>
        <div className="h-0.5   bg-lightGray flex-1 max-w-[80px] sm:max-w-[150px] md:max-w-[500px]"></div>
      </div>
      <div className="  flex flex-wrap justify-center gap-8 md:gap-10">
        {[1, 2, 3].map((item, index) => (
          <div 
            key={index} 
             className="relative"
            onClick={() => navigate(`/product/${index + 1}`)}
          >
              
            <div className="bg-black border-8  w-96  border-lightGray rounded-tl-full rounded-tr-full  overflow-hidden shadow-lg shadow-gold-100">
               
                <img
                  src={product}
                  alt="product"
                  className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover"
                />

               <div className="absolute top-4 right-8 w-14 h-14 rounded-full border-4 border-lightGray  bg-black flex justify-center items-center">
                  <span className={`text-white text-lg md:text-4xl font-bold ${index === 1 ? 'text-red-500' : 'text-white'}`}>
                    ♥
                  </span>
                </div>
              </div>
             
            <div className="bg-black  pt-7 text-center  sm:w-[180px] md:w-[230px] mx-auto rounded-b-xl">
              <h3 className="font-bold text-lg md:text-2xl   text-lightGray font-[inter] mb-1">
                Dolce
              </h3>
              <div className="">
                <p className="text-sm md:text-base lg:text-xl font-medium font-[inter]   text-lightGray mb-2">
                Our Classic Scents For Every Day Use
              </p>
              </div>
              <p className="text-amber-300 font-medium font-[inter] text-base md:text-lg lg:text-xl mb-4">
                Rs.3,990
              </p>
              <button className=" font-[inter] w-full  h-[45px] sm:h-[50px] md:h-[64px] text-black  bg-lightGray border-none font-inter rounded-lg cursor-pointer font-bold text-sm sm:text-base md:text-lg  hover:bg-primary transition-colors duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSelling;