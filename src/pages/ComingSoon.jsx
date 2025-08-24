import React, { useState, useEffect } from "react";

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Set launch date to 2025-12-09
  const launchDate = new Date("2025-12-09T23:59:59").getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance > 0) {
        setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
        setHours(
          Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        );
        setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [launchDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend
      console.log("Email submitted:", email);
      setSubmitted(true);
      setEmail("");

      // Reset after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center">
      <div className="text-center max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r   from-primary to-lightGray">
            Coming Soon
          </h1>

          <p className="text-lg md:text-xl mb-10 text-gray-600">
            We're working hard to bring you something amazing. Stay tuned!
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-gray-50 rounded-xl p-5 shadow-md border border-gray-100 transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl md:text-5xl font-bold text-black">
              {days}
            </div>
            <div className="text-sm mt-2 text-gray-500">Days</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-5 shadow-md border border-gray-100 transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl md:text-5xl font-bold text-black">
              {hours}
            </div>
            <div className="text-sm mt-2 text-gray-500">Hours</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-5 shadow-md border border-gray-100 transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl md:text-5xl font-bold text-black">
              {minutes}
            </div>
            <div className="text-sm mt-2 text-gray-500">Minutes</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-5 shadow-md border border-gray-100 transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl md:text-5xl font-bold text-black">
              {seconds}
            </div>
            <div className="text-sm mt-2 text-gray-500">Seconds</div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mb-8">
          <h3 className="text-xl mb-6 text-gray-700">Follow us for updates</h3>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="text-3xl bg-gray-100 p-4 rounded-full hover:bg-indigo-100 transition-all duration-300 transform hover:-translate-y-1 text-primary"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-3xl bg-gray-100 p-4 rounded-full hover:bg-indigo-100 transition-all duration-300 transform hover:-translate-y-1 text-primary"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.033 10.033 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-3xl bg-gray-100 p-4 rounded-full hover:bg-indigo-100 transition-all duration-300 transform hover:-translate-y-1 text-primary"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-3xl bg-gray-100 p-4 rounded-full hover:bg-indigo-100 transition-all duration-300 transform hover:-translate-y-1 text-primary"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-gray-200 py-4">
          <p className="text-gray-600">
            Have questions? Contact us at{" "}
            <a
              href="mailto:info@example.com"
              className="text-primary hover:underline font-semibold"
            >
              info@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
