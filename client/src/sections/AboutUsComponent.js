import React from "react";
import { Link } from "react-router-dom";
import "./AboutUsComponent.css";

function AboutUsComponent() {
  return (
    <section className="about-section">
      {/* Image Container */}
      <div className="about-image-container">
        <img
          src="https://i.postimg.cc/N0gJ2k2M/i-Stock-1328601529-1-1.webp"
          alt="About Us"
          loading="lazy"
          className="about-image"
          height="56"
          width="56"
        />
      </div>

      {/* Text Container */}
      <div className="about-content">
        <div className="about-us-content-title">
          <div className="about-us-line"></div>
          <h1 className="about-us-name">ABOUT US</h1>
        </div>
        <p className="about-us-company-name">
          BCB Carts
        </p>
        <p className="about-us-paragraph">
          At BCB Carts, we’re committed to providing dependable and stylish electric cart solutions for both leisure and business needs. Our dedicated team and trusted mechanics work together to deliver personalized services—from cart sales and rentals to professional installations and custom upgrades.
        </p>
        <p className="about-us-paragraph">
          Proudly serving customers throughout Southern California and beyond, we continuously strive to expand our service areas and enhance our offerings, ensuring your ride is always smooth and reliable.
        </p>
        <Link to="/about-us" className="about-us-button">
          Learn More About BCB Carts
        </Link>
      </div>
    </section>
  );
}

export default AboutUsComponent;
