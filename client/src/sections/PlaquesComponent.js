import React, { useState, useEffect, useRef } from "react";

function PlaquesComponent() {
  const plaques = [
    {
      title: "Why Choose Us",
      description:
        "At BCB Carts, we provide dependable electric carts and now offer car rentals for ultimate convenience. Our honest, personalized service and attention to detail ensure every ride—whether cart or car—is tailored to your lifestyle or business needs.",
      icon: "https://i.postimg.cc/d0TXq3Ff/i-Stock-2151690936-1.webp",
    },
    {
      title: "How We Can Help You",
      description:
        "From electric carts to reliable car rentals, we work closely with you to find the perfect fit. Whether you’re upgrading, renting for an event, or need a dependable vehicle for day-to-day tasks, our team is here to help.",
      icon: "https://i.postimg.cc/NMWrYD13/i-Stock-2151690936-2.webp",
    },
    {
      title: "See the Difference",
      description:
        "Our quality standards extend to every vehicle we offer. With careful maintenance and clean, stylish options—both carts and cars—you'll see why customers across Southern California trust BCB for performance, reliability, and service.",
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
      { threshold: [0.6] }
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
    <section className="w-full max-w-7xl mx-auto px-4 py-12 bg-gray-100 flex flex-col gap-8 md:flex-row md:justify-between md:gap-6">
      {plaques.map((plaque, index) => (
        <div
          key={index}
          ref={(el) => (plaqueRefs.current[index] = el)}
          data-index={index}
          className={`flex flex-col items-center bg-white rounded-lg shadow-md p-6 text-center transition-transform duration-300 transform hover:-translate-y-1 w-full md:w-1/3 ${
            visiblePlaques[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <img
            src={plaque.icon}
            alt={plaque.title}
            className="w-16 h-16 object-contain mb-4"
            loading="lazy"
          />
          <h2 className="text-lg font-bold mb-2">{plaque.title}</h2>
          <p className="text-gray-700 text-sm">{plaque.description}</p>
        </div>
      ))}
    </section>
  );
}

export default PlaquesComponent;
