import React from "react";
import product from "../../assets/images/product.jpg";

const coupons = [
  {
    title: "Welcome Gift Voucher",
    discount: "10%",
    active: true,
    code: "Welcome100",
    time: { day: 25, hrs: 5, min: 56, sec: 34 },
  },
  {
    title: "Winter Gift Voucher",
    discount: "15%",
    active: true,
    code: "WINTER23",
    time: { day: 178, hrs: 5, min: 56, sec: 34 },
  },
  {
    title: "Summer Gift Voucher",
    discount: "12%",
    active: false,
    code: "SUMMER23",
    time: { day: 0, hrs: 0, min: 0, sec: 0 },
  },
  {
    title: "Summer Gift Voucher",
    discount: "12%",
    active: false,
    code: "SUMMER23",
    time: { day: 0, hrs: 0, min: 0, sec: 0 },
  },
];

const CouponSection = () => {
  return (
    <div className="  md:py-[40px] py-[30px] border-b border-t border-black  font-sans overflow-x-hidden max-w-8xl mx-auto px-4 md:px-0">
   
      {/* Coupon Cards Section */}
      <div className="flex flex-col md:flex-row flex-wrap w-full  justify-center gap-4 md:gap-[25px]">
        {coupons.map((coupon, index) => (
          <div
            key={index}
            className="w-full md:w-[500px] h-auto md:h-[160px]  border border-[#EAEAEF] flex flex-col md:flex-row relative rounded-sm p-4 md:p-[20px] items-stretch md:items-center"
          >
            {/* Left Section */}
            <div className="flex flex-col md:flex-row gap-2 md:gap-[10px] justify-between items-center text-center md:text-left pb-2 md:pb-0 flex-[2] pr-0 md:pr-[20px] mb-2 md:mb-0">
              <img
                src={product}
                alt="product"
                className="w-full md:w-[100px] h-[200px] mb-1 md:mb-0 md:mr-[10px] sm:object-contain object-cover"
              />
              <div>
                <h3 className="text-[15px] md:text-[18px]  font-semibold text-black  font-mono mb-1 md:mb-[10px]  md:font-sans">
                  {coupon.title}
                </h3>
                <p className="text-[14px] md:text-[17px] text-[#69696d] mb-2 md:mb-[15px] font-['Righteous'] md:font-sans">
                  <span className="text-[14px] md:text-[17px] text-[#FF2400] font-normal md:font-[400] font-['Righteous'] md:font-sans">
                    {coupon.discount}
                  </span>{" "}
                  Off
                </p>
                <div className="text-[11px] font-semibold md:text-[14px] text-black flex justify-between gap-1 md:gap-[8px] text-center font-['Righteous'] md:font-sans">
                  <span>{coupon.time.day} DAY</span> |
                  <span>{coupon.time.hrs} HRS</span> |
                  <span>{coupon.time.min} MIN</span> |
                  <span>{coupon.time.sec} SEC</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full md:w-[4px] h-[1px] md:h-full border-t md:border-l border-dashed border-[#E5D0A5] my-2 md:my-0 md:mx-[20px] bg-transparent"></div>

            {/* Right Section */}
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