import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    centerPadding: '0',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerMode: false
        }
      }
    ]
  };

  const testimonials = [
    {
      id: 1,
      name: "Umair Mir",
      image: "https://i.pravatar.cc/150?img=32",
      rating: "★★★★★",
      text: "Lorem Secure your financial future with our comprehensive planning services, expert investment strategies, and insightful market research. Lorem Secure your financial"
    },
    {
      id: 2,
      name: "Ali Raza",
      image: "https://i.pravatar.cc/150?img=12",
      rating: "★★★★★",
      text: "Lorem Secure your financial future with our comprehensive planning services, expert investment strategies, and insightful market research. Lorem Secure your financial"
    },
    {
      id: 3,
      name: "Sarah Khan",
      image: "https://i.pravatar.cc/150?img=5",
      rating: "★★★★☆",
      text: "Excellent service! The team provided me with great investment advice that helped grow my portfolio significantly."
    },
    {
      id: 4,
      name: "John Smith",
      image: "https://i.pravatar.cc/150?img=7",
      rating: "★★★★★",
      text: "The financial planning was thorough and tailored to my specific needs. Highly recommend their services!"
    }
  ];

  return (
    <section className="py-16 px-5 text-center ">
      <h2 className="flex items-center justify-center text-2xl font-semibold tracking-wider mb-10">
        TESTIMONIALS
      </h2>
      
      <div className="max-w-6xl mx-auto">
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="px-4 outline-none">
              <div className="border border-black rounded-lg p-8 font-sans h-72 max-w-xl mx-auto min-w-[350px] text-center bg-white transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-center mb-5">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-black mr-4 flex-shrink-0">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-black text-xl font-semibold font-inter">
                      {testimonial.name}
                    </span>
                    <span className="text-primary">
                      {testimonial.rating}
                    </span>
                  </div>
                </div>
                <div className="text-xl text-black leading-loose">
                  {testimonial.text}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}