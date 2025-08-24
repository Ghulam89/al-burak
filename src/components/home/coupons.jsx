import React, { useState, useEffect } from "react";
import product from "../../assets/images/product.jpg";
import { BaseUrl } from "../../utils/BaseUrl";

const CouponSection = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch(`${BaseUrl}/v1/coupon/coupon?couponType=public`);
        const data = await response.json();
        
        if (data.success) {
          const transformedCoupons = data.data.map(coupon => ({
            title: coupon.name,
            discount: `${coupon.discountValue}%`,
            active: coupon.status === "active",
            code: coupon.code,
            endDate: coupon.endDate
          }));
          
          setCoupons(transformedCoupons);
        } else {
          setError("Failed to fetch coupons");
        }
      } catch (err) {
        setError("Error fetching coupons");
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const calculateTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const difference = end - now;

    if (difference <= 0) {
      return { day: 0, hrs: 0, min: 0, sec: 0 };
    }

    const day = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hrs = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const min = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const sec = Math.floor((difference % (1000 * 60)) / 1000);

    return { day, hrs, min, sec };
  };

  const CountdownTimer = ({ endDate }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeRemaining(endDate));

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeRemaining(endDate));
      }, 1000);

      return () => clearInterval(timer);
    }, [endDate]);

    return (
      <div className="text-[11px] font-semibold md:text-[14px] text-black flex justify-between gap-1 md:gap-[8px] text-center font-['Righteous'] md:font-sans">
        <span>{timeLeft.day} DAY</span> |
        <span>{timeLeft.hrs} HRS</span> |
        <span>{timeLeft.min} MIN</span> |
        <span>{timeLeft.sec} SEC</span>
      </div>
    );
  };
  const CouponSkeleton = () => {
    return (
      <div className="w-full md:w-[500px] h-auto md:h-[160px] border border-[#EAEAEF] flex flex-col md:flex-row relative rounded-sm p-4 md:p-[20px] items-stretch md:items-center animate-pulse">
      
        <div className="flex flex-col md:flex-row gap-2 md:gap-[10px] justify-between items-center text-center md:text-left pb-2 md:pb-0 flex-[2] pr-0 md:pr-[20px] mb-2 md:mb-0">
          <div className="w-full md:w-[100px] h-[200px] mb-1 md:mb-0 md:mr-[10px] bg-gray-200 rounded"></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-4/5"></div>
          </div>
        </div>

        <div className="w-full md:w-[4px] h-[1px] md:h-full border-t md:border-l border-dashed border-[#E5D0A5] my-2 md:my-0 md:mx-[20px] bg-transparent"></div>

        <div className="flex flex-col items-center justify-center relative flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-8 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="md:py-[40px] py-[30px] border-b border-t border-black font-sans overflow-x-hidden max-w-8xl mx-auto px-4 md:px-0">
        
        <div className="flex flex-col md:flex-row flex-wrap w-full justify-center gap-4 md:gap-[25px]">
          
          {[...Array(3)].map((_, index) => (
            <CouponSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }



  return (
    <div className="md:py-[40px] py-[30px] border-b border-t border-black font-sans overflow-x-hidden max-w-8xl mx-auto px-4 md:px-0">
     
      <div className="flex flex-col md:flex-row flex-wrap w-full justify-center gap-4 md:gap-[25px]">
        {coupons.map((coupon, index) => (
          <div
            key={index}
            className="w-full md:w-[500px] h-auto md:h-[160px] border border-[#EAEAEF] flex flex-col md:flex-row relative rounded-sm p-4 md:p-[20px] items-stretch md:items-center"
          >
          
            <div className="flex flex-col md:flex-row gap-2 md:gap-[10px] justify-between items-center text-center md:text-left pb-2 md:pb-0 flex-[2] pr-0 md:pr-[20px] mb-2 md:mb-0">
              <img
                src={product}
                alt="product"
                className="w-full md:w-[100px] h-[200px] mb-1 md:mb-0 md:mr-[10px] sm:object-contain object-cover"
              />
              <div>
                <h3 className="text-[15px] md:text-[18px] font-semibold text-black font-mono mb-1 md:mb-[10px] md:font-sans">
                  {coupon.title}
                </h3>
                <p className="text-[14px] md:text-[17px] text-[#69696d] mb-2 md:mb-[15px] font-['Righteous'] md:font-sans">
                  <span className="text-[14px] md:text-[17px] text-[#FF2400] font-normal md:font-[400] font-['Righteous'] md:font-sans">
                    {coupon.discount}
                  </span>{" "}
                  Off
                </p>
                <CountdownTimer endDate={coupon.endDate} />
              </div>
            </div>

            
            <div className="w-full md:w-[4px] h-[1px] md:h-full border-t md:border-l border-dashed border-[#E5D0A5] my-2 md:my-0 md:mx-[20px] bg-transparent"></div>

         
            <div className="flex flex-col items-center justify-center relative flex-1">
              <span
                className={`text-[12px] md:text-[14px] font-bold mb-2 md:mb-[15px] font-['Righteous'] md:font-sans ${
                  coupon.active ? "text-[#27ae60]" : "text-[#c0392b]"
                }`}
              >
                {coupon.active ? "Coupon Active" : "Coupon Inactive"}
              </span>
              <div className="bg-[#EBEBEB] text-black text-[12px] md:text-[15px] px-2 md:px-[10px] py-1 md:py-[10px] border-2 border-dashed border-black font-normal md:font-[400] font-mono tracking-[0.5px] md:tracking-[1px]">
                {coupon.code}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponSection;