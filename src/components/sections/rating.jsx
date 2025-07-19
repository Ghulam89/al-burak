import React, { useState } from "react";
import '../../App.css'
import product from '../../assets/images/product.jpg';

const ReviewLayout = () => {
  const images = Array(7).fill("https://via.placeholder.com/90");
 const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
   const RatingCloseModal = () => {
    setIsRatingModalOpen(false);
  };
  return (
    <div className="bg-black pt-4">
      <div className="bg-black max-w-6xl mx-auto">
        <h2 className="text-primary text-2xl pb-4">Customers photo and videos</h2>
        <div className="flex gap-5 w-full overflow-x-auto pb-2">
          {images.map((img, i) => (
            <img 
              src={product} 
              alt={`img-${i}`} 
              className="w-20 h-20 md:w-24 md:h-24 rounded object-cover flex-shrink-0" 
              key={i} 
            />
          ))}
          <div className="w-20 h-20 md:w-24 md:h-24  px-2  bg-lightGray text-black flex items-center justify-center rounded text-xl text-center  leading-5">
            See
            more
          </div>
        </div>
        <div className="h-px  bg-lightGray2 my-8 md:my-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 w-full border-lightGray2 border-b pb-6 items-center gap-8 text-white">
          
            <div className=" text-lightGray text-lg   border-r border-r-lightGray2 h-full items-center flex gap-2">  <div className=" text-primary text-xl">★★★★★</div> 4.46 out of 5 Based on 657 reviews</div>
            
         
          <div className="flex flex-col items-center">
            <div className=" text-lightGray text-2xl mb-4">Customer Reviews</div>
            {[5, 4, 3, 2].map((star, i) => {
              const percentage = Math.min((star * 20) - 10, 100);
              return (
                <div className="flex items-center gap-12 mb-3 w-full max-w-xs" key={i}>
                  <span className="text-amber-400 w-14  text-xl">
                    {"★".repeat(star)}
                  </span>
                  <div className="flex-1  border w-48 border-amber-400 h-4 relative">
                    <div
                      className="  bg-primary h-full absolute top-0 left-0"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* <div className="flex justify-center md:justify-end  border-l  border-lightGray2 h-full  items-center">
            <button onClick={()=>setIsRatingModalOpen(true)} className=" bg-primary text-black px-8 py-3.5 rounded-full font-bold hover:bg-amber-300 transition-colors">
              Write a review
            </button>
          </div> */}
        </div>
      </div>
      
    </div>
  );
};

export default ReviewLayout;