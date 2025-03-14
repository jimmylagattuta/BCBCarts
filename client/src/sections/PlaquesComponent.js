import React, { useState, useEffect, useRef } from "react";
import "./PlaquesComponent.css";

function PlaquesComponent() {
  const plaques = [
    {
      title: "Why Choose Us",
      description:
        "At BCB Carts, our focus is on providing reliable electric carts with honest, personalized service. We take pride in our attention to detail and commitment to quality, ensuring you get a ride that meets your needs.",
      icon: "https://i.postimg.cc/d0TXq3Ff/i-Stock-2151690936-1.webp",
    },
    {
      title: "How We Can Help You",
      description:
        "Our team works closely with you to understand your requirements, whether you're buying, renting, or upgrading an electric cart. We tailor our services to deliver solutions that fit your lifestyle or business perfectly.",
      icon: "https://i.postimg.cc/NMWrYD13/i-Stock-2151690936-2.webp",
    },
    {
      title: "See the Difference",
      description:
        "Quality matters. With a focus on meticulous maintenance and custom upgrades, we ensure every cart meets high standards of performance and style. Discover the BCB Carts difference through our attentive service.",
      icon: "https://i.postimg.cc/FzVcZcLw/i-Stock-2151690936-3.webp",
    },
  ];

  const [visiblePlaques, setVisiblePlaques] = useState({});
  const plaqueRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target.dataset.index;
          if (entry.intersectionRatio > 0.6) {
            setVisiblePlaques((prev) => ({
              ...prev,
              [index]: true,
            }));
          }
        });
      },
      { threshold: [0, 0.4, 0.6, 1] }
    );

    plaqueRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      plaqueRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="plaques-section">
      {plaques.map((plaque, index) => (
        <div
          key={index}
          className="plaque-card"
          ref={(el) => (plaqueRefs.current[index] = el)}
          data-index={index}
        >
          <img
            src={plaque.icon}
            alt={plaque.title}
            className="plaque-icon"
            loading="lazy"
          />
          <h1 className="plaque-title">{plaque.title}</h1>
          <p
            className={`plaque-description ${
              visiblePlaques[index] ? "visible" : ""
            }`}
          >
            {plaque.description}
          </p>
        </div>
      ))}
    </section>
  );
}

export default PlaquesComponent;