import React from "react";
import { useNavigate } from "react-router-dom";

const HowItWorksComponent = () => {
  const navigate = useNavigate();

  const handleContactFormClick = (e) => {
    e.preventDefault();
    navigate("/contact");
  };

  const steps = [
    {
      step: 1,
      title: "Start Your Journey",
      img: "https://i.postimg.cc/T1zSsXbW/i-Stock-2151690936-4-1-1.webp",
      alt: "Start your journey icon",
      description: (
        <>
          Complete our{" "}
          <a
            href="/contact"
            onClick={handleContactFormClick}
            className="font-bold underline text-inherit hover:text-[#233535] transition-colors"
          >
            inquiry form
          </a>{" "}
          to let us know what you're looking for. Whether you’re interested in
          buying, renting, or upgrading an electric cart or reserving a rental
          car, we’ll help you get rolling.
        </>
      ),
    },
    {
      step: 2,
      title: "Consultation",
      img: "https://i.postimg.cc/FKRsVjVk/i-Stock-2151690936-5-1-1.webp",
      alt: "Consultation icon",
      description:
        "Our team reviews your request and helps you find the perfect cart or rental car. We’ll answer your questions and recommend the best options for your needs and budget.",
    },
    {
      step: 3,
      title: "Get on the Road",
      img: "https://i.postimg.cc/q7Q2DXKs/i-Stock-2151690936-7-1.webp",
      alt: "Get your vehicle icon",
      description:
        "Once you’ve made your choice, we’ll handle the details. Pick up your electric cart or rental car and hit the road with full support from our expert team.",
    },
  ];

  return (
    <section className="py-12 px-5 max-w-[1200px] mx-auto text-center bg-[#fefefe]">
      {/* Title section */}
      <div className="flex items-center justify-center gap-4 mb-2">
        <div className="w-10 h-[2px] bg-[#253635]" />
        <h1 className="text-sm font-bold text-[#253635] tracking-wide">
          HOW IT WORKS
        </h1>
        <div className="w-10 h-[2px] bg-[#253635]" />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-[#233535] mb-2">
        How Do I Get Started with BCB Carts & Rentals?
      </h2>

      <p className="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto mb-10">
        Whether you’re upgrading your ride with a new cart or renting a car for
        a special trip, our three-step process makes it simple.
      </p>

      {/* Steps */}
      <div className="flex flex-wrap justify-center gap-10">
        {steps.map(({ step, title, img, alt, description }) => (
          <div
            key={step}
            className="w-[300px] bg-white rounded-lg shadow-lg p-6 text-center transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#233535] text-white font-bold text-[1rem] leading-[1rem] mb-4 mx-auto">
                {step}
              </div>
              <img
                src={img}
                alt={alt}
                width={55}
                height={65}
                loading="lazy"
                className="mx-auto mb-4"
              />
              <h3 className="text-lg font-bold text-[#233535]">{title}</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksComponent;
