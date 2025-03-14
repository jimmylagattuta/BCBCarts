import React from "react";
import { useNavigate } from "react-router-dom";
import "./OurServicesComponent.css";

function OurServicesComponent() {
  const navigate = useNavigate();

  const treatments = [
    {
      title: "Cart Sales",
      description: `Discover our premium electric carts for sale. Our selection combines performance and style, perfectly suited for personal enjoyment or business use.`,
      link: "/services/cart-sales",
      image: "https://i.postimg.cc/LsnyV6vK/i-Stock-1473284753-1.webp",
    },
    {
      title: "Cart Rentals",
      description: `Experience hassle-free electric cart rentals for events, resorts, or daily operations. Enjoy reliable vehicles and competitive rates tailored to your needs.`,
      link: "/services/cart-rentals",
      image: "https://i.postimg.cc/kG9FLnN5/i-Stock-2084733637-1-1-1.webp",
    },
    {
      title: "Installs",
      description: `Our professional installation service ensures that your new or upgraded electric cart is set up safely and efficiently, so you can hit the road with confidence.`,
      link: "/services/installs",
      image: "https://i.postimg.cc/SKfKDkKd/i-Stock-2160725825-1-1-1.webp",
    },
    {
      title: "Lithium Battery Upgrades",
      description: `Upgrade your electric cart with advanced lithium battery solutions for extended run times, faster charging, and improved overall performance.`,
      link: "/services/lithium",
      image: "https://i.postimg.cc/zGnDG8TN/i-Stock-1423584811-1-1.webp",
    },
    {
      title: "Parts & Accessories",
      description: `Keep your electric cart in peak condition with our wide selection of quality parts and accessories, designed to enhance performance and longevity.`,
      link: "/services/parts",
      image: "https://i.postimg.cc/zvb8Zrq9/i-Stock-1347150429-1-1.webp",
    },
    {
      title: "Pressure Wash",
      description: `Revitalize your electric cart with our professional pressure wash services that remove dirt and grime, ensuring a clean, attractive appearance.`,
      link: "/services/pressure-wash",
      image: "https://i.postimg.cc/VLtmKmGt/i-Stock-1782267405-1-1.webp",
    },
    {
      title: "Custom Weld",
      description: `Enhance your cart’s design and performance with our custom weld and fabrication services, tailored to your unique vision and requirements.`,
      link: "/services/custom-weld",
      image: "https://i.postimg.cc/G2Nnj5vz/i-Stock-1359352103-1-1.webp",
    },
    {
      title: "Electronics",
      description: `Modernize your ride with cutting-edge electronics upgrades. From advanced control systems to integrated audio, transform your cart into a smart, efficient vehicle.`,
      link: "/services/electronics",
      image: "https://i.postimg.cc/4xZytYfy/i-Stock-2174489444-1-1.webp",
    },
  ];

  return (
    <section className="our-services-section">
      {/* Header and Slogan */}
      <div className="hero-content-title">
        <div style={{ backgroundColor: "rgb(37, 54, 53)" }} className="line"></div>
        <h1 style={{ color: "black" }} className="company-name">OUR SERVICES</h1>
        <div style={{ backgroundColor: "rgb(37, 54, 53)" }} className="line"></div>
      </div>

      <p className="our-services-slogan">Drive with Confidence, Ride with Style.</p>

      {/* Cards */}
      {treatments.map((treatment, index) => (
        <div
          key={index}
          className="service-card"
          onClick={() => navigate(treatment.link)}
        >
          {/* FRONT (Desktop Default) */}
          <div className="service-front">
            <img
              src={treatment.image}
              alt={treatment.title}
              className="service-image"
            />
            <h2 className="service-title">{treatment.title}</h2>
            <p className="service-link">Learn More About {treatment.title}</p>
          </div>

          {/* BACK (Desktop Hover, Mobile Default) */}
          <div className="service-back">
            <img
              src={treatment.image}
              alt={treatment.title}
              className="service-image-back"
            />
            <p className="service-description">{treatment.description}</p>
            <p className="service-link">Learn More About {treatment.title}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default OurServicesComponent;
