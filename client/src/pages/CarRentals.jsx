import React from "react";
import { Helmet } from "react-helmet";
import FooterComponent from '../sections/FooterComponent';

const CarRentals = () => {
  const cars = [
    {
      name: "Ford Mustang",
      image: "https://res.cloudinary.com/djtsuktwb/image/upload/v1753832728/IMG_1907_smsgnv.jpg",
      description: "Take a cruise down the coast in style. Perfect for a weekend getaway.",
      link: "https://turo.com/us/en/car-rental/united-states/long-beach-ca/ford/mustang/3287420"
    },
    {
      name: "Dodge Grand Caravan",
      image: "https://res.cloudinary.com/djtsuktwb/image/upload/v1753832966/IMG_1869_j15ycp.jpg",
      description: "Spacious and reliable. Great for family trips and hauling gear.",
      link: "https://turo.com/us/en/minivan-rental/united-states/long-beach-ca/dodge/grand-caravan/3277933"
    }
  ];

  const richSnippet = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "BCBCarts Turo Car Rentals in Long Beach",
    itemListElement: cars.map((car, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: car.link,
      item: {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: car.name,
          image: car.image,
          description: car.description
        },
        url: car.link
      }
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(richSnippet)}
        </script>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Car Rentals in Long Beach
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            BCB Carts now offers Turo rentals! Browse our cars and book directly through Turo.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
          {cars.map((car, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 flex flex-col justify-between h-[200px]">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {car.name}
                  </h2>
                  <p className="text-gray-600">{car.description}</p>
                </div>
                <a
                  href={car.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Book on Turo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FooterComponent />
    </>
  );
};

export default CarRentals;
