import React from 'react';
import '../../App.css';

export default function Testimonials() {
  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          font-family: sans-serif;
        }
        .testimonials-section {
          background-color: #000;
          color: #EFD9B4;
          padding: 60px 20px;
          text-align: center;
        }
        .testimonials-title {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 600;
          letter-spacing: 4px;
          margin-bottom: 40px;
        }
        .testimonials-title::before,
        .testimonials-title::after {
          content: "";
          flex: 1;
          height: 2px;
          background-color: #EFD9B4;
          margin: 0 20px;
        }
        .cards {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .card {
          background-color: #242424;
          border: 4px solid #EFD9B4;
          border-radius: 0px;
          padding: 30px;
          align-item: center;
          font-family: "'Work Sans', serif";
          height: 300px; /* Increased height */
          max-width: 550px; /* Increased width */
          flex: 1 1 350px; /* Increased minimum width */
          text-align: center;
        }
        .card-header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }
        .avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 15px;
          flex-shrink: 0;
        }
        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .name-rating {
          display: flex;
          flex-direction: column;
        }
        .name {
          color: #fff;
          font-size: 18px;
          font-weight: 600;
          font-family: "'Inter', serif",
          margin-bottom: 5px;
        }
        .stars {
          font-size: 14px;
          color: #EFD9B4;
        }
        .card-body {
          font-size: 20px;
          line-height: 2;
        }
        @media (max-width: 768px) {
          .testimonials-title {
            font-size: 20px;
            letter-spacing: 2px;
          }
          .card {
            max-width: 100%;
            height: auto; /* Make height flexible on mobile */
            min-height: 350px; /* Minimum height on mobile */
          }
        }
      `}</style>
      <section className="testimonials-section">
        <h2 className="testimonials-title">TESTIMONIALS</h2>
        <div className="cards">
          <div className="card">
            <div className="card-header">
              <div className="avatar">
                <img src="https://i.pravatar.cc/150?img=32" alt="Umair Mir" />
              </div>
              <div className="name-rating">
                <span className="name">Umair Mir</span>
                <span className="stars">★★★★★</span>
              </div>
            </div>
            <div className="card-body">
              Lorem Secure your financial future with our comprehensive planning services, expert investment strategies, and insightful market research. Lorem Secure your financial
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="avatar">
                <img src="https://i.pravatar.cc/150?img=12" alt="Ali Raza" />
              </div>
              <div className="name-rating">
                <span className="name">Ali Raza</span>
                <span className="stars">★★★★★</span>
              </div>
            </div>
            <div className="card-body">
              Lorem Secure your financial future with our comprehensive planning services, expert investment strategies, and insightful market research. Lorem Secure your financial
            </div>
          </div>
        </div>
      </section>
    </>
  );
}