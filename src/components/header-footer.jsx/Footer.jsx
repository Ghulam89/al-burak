import React from "react";
import '../../App.css';
import logo from "../../assets/images/Al-burak-logo.png";
import letter from "../../assets/images/Letter.png";
import fb from "../../assets/images/Facebook.png";
import insta from "../../assets/images/Instagram Old.png";
import tiktok from "../../assets/images/TikTok.png";
import phone from "../../assets/images/Phone.png";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer-section logo-section">
          <img src={logo} className="logo" alt="Logo" />
          <p className="tagline">
            "Where Every Scent<br />Tells a Story."
          </p>
        </div>
        <div className="footer-section about-section">
          <h3>About</h3>
          <ul>
            <li>FAQs</li>
            <li>Our Story</li>
            <li>Media Page</li>
            <li>Quiz</li>
            <li>Our New Logo</li>
          </ul>
        </div>
        <div className="footer-section customer-service-section">
          <h3>Customer service</h3>
          <ul>
            <li>Affiliation</li>
            <li>Ask For A Perfume</li>
            <li>Bulk Orders</li>
            <li>Own a Franchise</li>
            <li>Store Locator</li>
          </ul>
        </div>
        <div className="footer-section get-in-touch-section">
          <h3>Get in touch</h3>
          <div className="contact-item">
            <img src={phone} className="icon-img" alt="Phone icon" />
            <span>+92 132 343 4577</span>
          </div>
          <div className="contact-item">
            <img src={letter} className="icon-img" alt="Email icon" />
            <span>xyz@gmail.com</span>
          </div>
          <p className="follow">Follow us</p>
          <div className="social-icons">
            <img src={fb} className="icon-img" alt="Facebook icon" />
            <img src={insta} className="icon-img" alt="Instagram icon" />
            <img src={tiktok} className="icon-img" alt="TikTok icon" />
          </div>
        </div>
      </div>
      <style>
        {`
        .footer {
          background-color: #000000;
          color: #E5D0A5;
          display: flex;
          justify-content: space-between;
          padding: 40px 20px;
          border: 1px solid #f5d77b;
          font-family: 'Righteous', cursive, sans-serif;
          flex-wrap: wrap;
        }

        .footer-section {
          flex: 1 1 200px;
          margin: 20px;
          min-width: 150px;
          text-align: left;
        }

        .logo-section {
          flex: 0 1 auto;
          text-align: left;
          min-width: auto;
        }

        .logo {
          width: 100px;
          height: auto;
          margin-bottom: 10px;
        }

        .tagline {
          color: #E5D0A5;
          font-size: 16px;
          line-height: 1.4;
        }

        h3 {
          font-size: 20px;
          margin-bottom: 20px;
          font-weight: 500;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        li {
          font-size: 16px;
          margin: 12px 0;
        }

        .get-in-touch-section {
          text-align: left;
        }

        .contact-item {
          display: flex;
          align-items: center;
          margin: 8px 0;
          font-size: 16px;
        }

        .icon-img {
          width: 18px;
          height: 18px;
          margin-right: 8px;
        }

        .follow {
          margin-top: 12px;
          font-size: 16px;
        }

        .social-icons {
          display: flex;
          gap: 10px;
          margin-top: 8px;
        }

        .social-icons .icon-img {
          width: 20px;
          height: 20px;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .footer {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: flex-start;
            padding: 30px 15px;
          }

          .logo-section {
            order: 1;
            flex: 0 0 calc(50% - 20px); /* Half width */
            margin: 10px;
            display: flex; /* Apply flex to logo section */
            flex-direction: column; /* Stack logo and tagline */
            align-items: flex-start; /* Left align within logo section */
          }

          .about-section {
            order: 2;
            flex: 0 0 calc(50% - 20px); /* Half width */
            margin: 10px;
            display: flex; /* Apply flex to about section */
            flex-direction: column; /* Stack heading and list */
            align-items: flex-start; /* Left align within about section */
          }

          .customer-service-section {
            order: 3;
            flex: 0 0 calc(50% - 20px); /* Half width */
            margin: 10px;
            display: flex; /* Apply flex to customer service section */
            flex-direction: column; /* Stack heading and list */
            align-items: flex-start; /* Left align within customer service section */
          }

          .get-in-touch-section {
            order: 4;
            flex: 0 0 calc(50% - 20px); /* Half width */
            margin: 10px;
            display: flex; /* Apply flex to get in touch section */
            flex-direction: column; /* Stack heading and contact info */
            align-items: flex-start; /* Left align within get in touch section */
          }
        }

        /* Small Mobile Styles */
        @media (max-width: 480px) {
          .footer-section {
            flex: 0 0 100%;
            margin: 10px 0;
          }
        }
      `}
      </style>
    </>
  );
}