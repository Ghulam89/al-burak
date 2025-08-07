import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Testimonials() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    centerMode: true,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          dots: false,
        },
      },
    ],
  };

  const testimonials = [
    {
      id: 1,
      name: "Umair Mir",
      image: "https://i.pravatar.cc/150?img=32",
      rating: "★★★★★",
      text: "Lorem Secure your financial future with our comprehensive planning services, expert investment strategies, and insightful market research. Lorem Secure your financial",
    },
    {
      id: 2,
      name: "Ali Raza",
      image: "https://i.pravatar.cc/150?img=12",
      rating: "★★★★★",
      text: "Lorem Secure your financial future with our comprehensive planning services, expert investment strategies, and insightful market research. Lorem Secure your financial",
    },
    {
      id: 3,
      name: "Sarah Khan",
      image: "https://i.pravatar.cc/150?img=5",
      rating: "★★★★☆",
      text: "Excellent service! The team provided me with great investment advice that helped grow my portfolio significantly.",
    },
    {
      id: 4,
      name: "John Smith",
      image: "https://i.pravatar.cc/150?img=7",
      rating: "★★★★★",
      text: "The financial planning was thorough and tailored to my specific needs. Highly recommend their services!",
    },
  ];

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 text-center ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl uppercase font-bold text-gray-900 mb-12">
          Testimonials
        </h2>

        <div className="px-0 sm:px-4">
          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="px-2 sm:px-4  sm:h-72 h-auto outline-none focus:outline-none"
              >
                <div className="border border-black rounded-lg p-6 sm:p-8 font-sans h-full mx-auto bg-white transition-all duration-300 hover:shadow-lg hover:border-primary flex flex-col">
                  <div className="flex items-center justify-center mb-5">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-black mr-4 flex-shrink-0">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-gray-900 text-lg sm:text-xl font-semibold">
                        {testimonial.name}
                      </span>
                      <span className="text-yellow-400 text-sm sm:text-base">
                        {testimonial.rating}
                      </span>
                    </div>
                  </div>
                  <div className="text-black text-base sm:text-lg leading-relaxed flex-grow">
                    "{testimonial.text}"
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
