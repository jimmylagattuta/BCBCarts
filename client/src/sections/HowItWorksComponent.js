import React from "react";
import { useNavigate } from "react-router-dom";
import "./HowItWorksComponent.css";

function HowItWorksComponent() {
  const navigate = useNavigate();
  
  // For this example, clicking the inquiry link navigates to our contact form (or inquiry page)
  const handleContactFormClick = (e) => {
    e.preventDefault();
    navigate("/contact");
  };

  return (
    <section 
      className="how-it-works-section" 
      aria-labelledby="how-it-works-title"
    >
      <div className="hero-content-title">
        <div
          style={{ backgroundColor: "rgb(37, 54, 53)", width: "40px", height: "2px" }}
          className="line"
        ></div>
        <h1
          style={{ color: "rgb(37, 54, 53)", fontSize: "0.9rem", fontWeight: "bolder" }}
          className="company-name"
        >
          HOW IT WORKS
        </h1>
        <div
          style={{ backgroundColor: "rgb(37, 54, 53)", width: "40px", height: "2px" }}
          className="line"
        ></div>
      </div>
      <h2 id="how-it-works-title" className="hiw-title">
        How Do I Get Started with BCB Carts?
      </h2>
      <p className="hiw-subtitle">
        Ready to upgrade your ride? Follow our simple, three-step process to get the electric cart that’s perfect for your needs.
      </p>

      <div className="hiw-steps-container">
        {/* Step 1 */}
        <div className="hiw-step">
          <div className="hiw-step-icon">
            <img
              src="https://i.postimg.cc/T1zSsXbW/i-Stock-2151690936-4-1-1.webp"
              alt="Icon representing the first step: start your journey"
              width="55"
              height="65"
              loading="lazy"
            />
          </div>
          <div className="hiw-step-number-container">
            <div className="hiw-step-number">1</div>
            <h3 className="hiw-step-title">Start Your Journey</h3>
          </div>
          <p className="hiw-step-description">
            Complete our{" "}
            <a 
              href="/contact" 
              onClick={handleContactFormClick} 
              className="hiw-contact-link"
            >
              inquiry form
            </a>{" "}
            to let us know what you're looking for. Whether you’re interested in buying, renting, or upgrading your electric cart, get in touch to get started.
          </p>
        </div>

        {/* Step 2 */}
        <div className="hiw-step">
          <div className="hiw-step-icon">
            <img
              src="https://i.postimg.cc/FKRsVjVk/i-Stock-2151690936-5-1-1.webp"
              alt="Icon representing the second step: consultation"
              width="55"
              height="65"
              loading="lazy"
            />
          </div>
          <div className="hiw-step-number-container">
            <div className="hiw-step-number">2</div>
            <h3 className="hiw-step-title">Consultation</h3>
          </div>
          <p className="hiw-step-description">
            Our friendly team reviews your inquiry and discusses the best electric cart options tailored to your needs. We’re here to answer your questions and guide you every step of the way.
          </p>
        </div>

        {/* Step 3 */}
        <div className="hiw-step">
          <div className="hiw-step-icon">
            <img
              src="https://i.postimg.cc/q7Q2DXKs/i-Stock-2151690936-7-1.webp"
              alt="Icon representing the third step: get your cart"
              width="55"
              height="65"
              loading="lazy"
            />
          </div>
          <div className="hiw-step-number-container">
            <div className="hiw-step-number">3</div>
            <h3 className="hiw-step-title">Get Your Cart</h3>
          </div>
          <p className="hiw-step-description">
            Once you choose your solution, our team finalizes the details and gets your electric cart ready. Enjoy a smooth, reliable ride with our comprehensive support.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksComponent;
