import React from "react";
export default function SubscribeBanner() {
  return (
    <section className="w-full overflow-hidden pb-16 md:pb-18">
      <div className=" rounded-xl max-w-6xl mx-auto min-h-[190px]  shadow-lg p-4 md:p-10 flex flex-col items-center justify-center gap-6 md:flex-row md:justify-between md:gap-10">
        <h2 className="text-black font-roboto font-semibold   px-4 leading-tight text-center max-w-full break-words md:text-left md:text-3xl md:flex-1 lg:text-4xl  text-xl">
          Subscribe for <br /> Latest perfumes & Offers
        </h2>

        <form className="border border-black rounded-lg p-3 w-full max-w-[440px] flex flex-col items-center gap-3 bg-transparent md:flex-row justify-between md:h-20 md:p-5">
          <input
            type="email"
            className="bg-transparent border border-black rounded-md py-3 px-4 text-base font-inter text-black w-full outline-none placeholder:text-black placeholder:font-semibold md:border-none md:w-[220px]"
            placeholder="Enter your email"
            required
          />
          <button
            type="submit"
            className=" bg-lightGray border-none py-3 px-5 text-base font-inter font-semibold cursor-pointer rounded-md w-full transition-all duration-300 ease-in-out hover:opacity-90 hover:-translate-y-px md:w-auto"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
