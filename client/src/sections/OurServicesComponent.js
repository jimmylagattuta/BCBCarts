import React from "react";
import { useNavigate } from "react-router-dom";

function OurServicesComponent() {
  const navigate = useNavigate();

  const treatments = [
    {
      title: "Car Rentals",
      description: `Fast, reliable, and stylish car rentals for short trips, weekend getaways, or business use. Enjoy competitive rates and convenient service every step of the way.`,
      link: "/car-rentals",
      image: "https://res.cloudinary.com/djtsuktwb/image/upload/v1753832966/IMG_1869_j15ycp.jpg",
    },
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
    <section className="flex flex-wrap justify-center gap-5 px-5 py-12 bg-gray-100">
      {/* Header and Slogan */}
      <div className="w-full flex items-center justify-center gap-4 mb-4">
        <div className="h-0.5 w-20 bg-[#253635]" />
        <h1 className="text-xl md:text-2xl font-bold text-[#253635] tracking-widest">
          OUR SERVICES
        </h1>
        <div className="h-0.5 w-20 bg-[#253635]" />
      </div>

      <p className="w-full text-center text-2xl md:text-3xl font-bold text-[#233533] leading-tight mb-10">
        Drive with Confidence, Ride with Style.
      </p>

      {/* Cards */}
      {treatments.map((treatment, index) => (
        <div
          key={index}
          onClick={() => navigate(treatment.link)}
          className="w-[445px] bg-white rounded-lg shadow-md cursor-pointer overflow-hidden transition-all duration-500 group relative"
        >
          {/* FRONT (Desktop default) */}
          <div className="p-6 text-center bg-white group-hover:opacity-0 md:block hidden transition-opacity duration-500">
            <img
              src={treatment.image}
              alt={treatment.title}
              className="w-28 h-28 rounded-full object-cover mx-auto mb-4"
            />
            <h2 className="text-xl font-bold text-gray-800 mb-2">{treatment.title}</h2>
            <p className="text-sm text-gray-600 underline font-semibold">
              Learn More About {treatment.title}
            </p>
          </div>

          {/* BACK (Desktop on hover, mobile default) */}
          <div className="p-6 text-center bg-[#628a88] text-white md:hidden block group-hover:md:block group-hover:opacity-100 opacity-0 absolute inset-0 transition-opacity duration-500">
            <img
              src={treatment.image}
              alt={treatment.title}
              className="w-24 h-24 rounded-full object-cover mx-auto mb-3"
            />
            <p className="text-sm leading-relaxed mb-3">{treatment.description}</p>
            <p className="text-sm underline font-semibold">
              Learn More About {treatment.title}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default OurServicesComponent;
