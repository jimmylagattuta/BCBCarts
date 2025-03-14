import React from "react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="hero-section">
      <picture>
        {/* Mobile Image (Default) */}
        <source
          srcSet="https://i.postimg.cc/bvHDGQcm/d-Rbh-Xia-1-1-1.webp"
          media="(max-width: 480px)"
          type="image/webp"
        />
        {/* Tablet Image */}
        <source
          srcSet="https://i.postimg.cc/YCrJK72j/i-Stock-2162952560-1-2-1-1-1.webp"
          media="(max-width: 768px)"
          type="image/webp"
        />
        {/* Desktop Image */}
        <source
          srcSet="https://i.postimg.cc/44rfgmjy/i-Stock-2162952560-1-1.webp"
          media="(min-width: 769px)"
          type="image/webp"
        />
        {/* Fallback */}
        <img
          src="https://i.postimg.cc/15gRdfWn/i-Stock-1069988650-4-1.webp"
          alt="Hero"
          width="auto"
          height="100%"
          loading="eager"
        />
      </picture>

      <div className="hero-content">
        <div className="hero-text-bg">
          <div className="hero-content-title">
            <div className="line"></div>
            <h1 className="company-name">BCB Carts</h1>
            <div className="line"></div>
          </div>
          <h1 className="slogan">Your Trusted Partner in Leisure-Filled Electric Vehicles</h1>
          <p className="hero-paragraph">
            At BCB Carts, we are committed to providing dependable electric carts and honest service for both personal and business needs. With a focused team and trusted mechanics, we offer tailored solutions—from cart sales and rentals to installations and upgrades—ensuring you enjoy a ride you can count on.
          </p>
          <h1 className="subslogan">Get in Contact Today!</h1>
          {/* Using a Link that goes to the LocationsPage with a hash */}
          <Link to="/locations#contactForm" className="cta-button">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
