import React from 'react';
import bgImage from '../../assets/images/bg.jpg';

export default function SubscribeBanner() {
  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        .subscribe-section {
          background: url(${bgImage}) center/cover no-repeat;
          padding: 60px 16px;
          width: 100%;
          overflow: hidden;
        }
        
        .subscribe-container {
          background-color: rgba(0, 0, 0, 0.9);
          border-radius: 10px;
          max-width: 1200px;
          margin: 0 auto;
          min-height: 190px;
          padding: 30px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
        }
        
        .subscribe-text {
          color: #E5D0A5;
          font-family: 'Roboto', sans-serif;
          font-weight: 600;
          font-size: 24px;
          line-height: 1.3;
          text-align: center;
          max-width: 100%;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        
        .subscribe-form {
          border: 2px solid #EFD9B4;
          border-radius: 8px;
          padding: 12px;
          width: 100%;
          max-width: 440px;
          height: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          background-color: transparent;
        }
        
        .subscribe-input {
          background: transparent;
          border: 1px solid #EFD9B4;
          border-radius: 6px;
          padding: 12px 16px;
          font-size: 16px;
          font-family: 'Inter', sans-serif;
          color: #E5D0A5;
          width: 100%;
          outline: none;
        }
        
        .subscribe-input::placeholder {
          color: #EFD9B4;
          font-weight: 600;
          // opacity: 0.8;
        }
        
        .subscribe-button {
          background-color: #EFD9B4;
          border: none;
          padding: 12px 20px;
          font-size: 16px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          cursor: pointer;
          border-radius: 6px;
          width: 100%;
          transition: all 0.3s ease;
        }
        
        .subscribe-button:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        
        @media (min-width: 600px) {
          .subscribe-section {
            padding: 80px 20px;
          }
          
          .subscribe-container {
            flex-direction: row;
            justify-content: space-between;
            padding: 40px;
            gap: 40px;
          }
          
          .subscribe-text {
            font-size: 28px;
            text-align: left;
            flex: 1;
            min-width: 300px;
          }
          
          .subscribe-form {
            flex-direction: row;
            height: 80px;
            padding: 20px;
            border-width: 4px;
          }
          
          .subscribe-input {
            border: none;
            width: 220px;
          }
          
          .subscribe-button {
            width: auto;
          }
        }
        
        @media (min-width: 768px) {
          .subscribe-text {
            font-size: 32px;
            max-width: 500px;
          }
        }
        
        @media (max-width: 359px) {
          .subscribe-text {
            font-size: 20px;
          }
          
          .subscribe-input {
            padding: 10px 12px;
            font-size: 14px;
          }
          
          .subscribe-button {
            padding: 10px 16px;
            font-size: 14px;
          }
        }
      `}</style>
      
      <section className="subscribe-section">
        <div className="subscribe-container">
          <div className="subscribe-text">
            Subscribe for Latest perfumes & Offers
          </div>
          <form className="subscribe-form">
            <input
              type="email"
              className="subscribe-input"
              placeholder="Enter your email"
              required
            />
            <button type="submit" className="subscribe-button">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}