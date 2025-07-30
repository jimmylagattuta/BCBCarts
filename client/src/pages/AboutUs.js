import React from "react";
import { Helmet } from "react-helmet";
import { servicesData } from "../data";
import Contact from "../pages/main/Contact";
import FooterComponent from "../sections/FooterComponent";
import "./AboutUs.css";

const AboutUs = () => {
  const servicesArray = Object.entries(servicesData).map(([key, service]) => ({
    ...service,
    id: key,
  }));

  const richSnippet = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BCB Carts",
    "url": "https://bcbcarts.com/about-us",
    "logo": "https://i.postimg.cc/vT5Y3Jbb/BCBLogo-1.webp",
    "description":
      "BCB Carts specializes in providing high-quality electric carts and allied services. With locations in Long Beach, California, and Griffin, GA, we are dedicated to offering top-notch solutions for your low-speed vehicle needs. Your Trusted Partner in Leisure-Filled Electric Vehicles.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-323-333-3471",
      "contactType": "Customer Service",
      "availableLanguage": ["English"],
    },
    "areaServed": [
      "Long Beach",
      "Seal Beach",
      "Huntington Beach",
      "San Pedro",
      "Lakewood",
      "Irvine",
      "Anaheim",
      "Santa Ana",
      "Newport Beach",
      "Costa Mesa",
      "Cypress",
      "Buena Park",
      "La Palma",
      "La Mirada",
      "Fullerton",
      "Garden Grove",
      "Tustin",
      "Brea",
      "La Habra",
      "Westminster",
      "Placentia",
      "Bellflower",
      "Downey",
      "Paramount",
      "Griffin, GA",
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Electric Cart Services",
      "itemListElement": servicesArray.map((service, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "description": service.shortDescription,
          "url": `https://bcbcarts.com/services/${service.id}`,
        },
      })),
    },
  };

  const sortedServices = [...servicesArray].sort((a, b) =>
    a.id === "car-rentals" ? -1 : b.id === "car-rentals" ? 1 : 0
  );

  return (
    <div className="aboutus-container">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(richSnippet)}</script>
      </Helmet>

      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/N0gJ2k2M/i-Stock-1328601529-1-1.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Welcome to BCB Carts!</h1>
          <p className="text-lg">
            Electric Carts & Convenient Car Rentals — Built Around You
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why We’re Expanding Into Car Rentals
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-gray-100 rounded-lg shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">Convenient Car Rentals</h3>
            <p className="text-gray-700 text-sm">
              Need more than a cart? Our car rentals make it easy to get where you're going—
              whether it's for a day, a weekend, or longer. Affordable, clean, and ready when you are.
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">Electric Cart Experts</h3>
            <p className="text-gray-700 text-sm">
              With years of experience in electric vehicles, we tailor every cart to your lifestyle.
              Quality, safety, and sleek design come standard.
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">Personalized Service</h3>
            <p className="text-gray-700 text-sm">
              Whether you're buying, renting, or repairing, our team works closely with you to find
              the right fit. One call, one solution—BCB makes it easy.
            </p>
          </div>
        </div>

        {/* 🚗 Call-to-action button */}
        <div className="mt-10 text-center">
          <a
            href="/car-rentals"
            className="inline-block bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
          >
            Browse Our Car Rentals
          </a>
        </div>
      </section>


      {/* Services Section */}
      <section className="bg-gray-50 py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Our Services</h2>
        <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3">
          {sortedServices.map((service) => (
            <a
              key={service.id}
              href={`/services/${service.id}`}
              className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ${service.id === "car-rentals" ? "border-2 border-yellow-500" : ""
                }`}
            >
              <div
                className="h-48 bg-cover bg-center rounded-t-lg"
                style={{ backgroundImage: `url(${service.images.hero})` }}
              ></div>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2">
                  {service.title}
                  {service.id === "car-rentals" && (
                    <span className="ml-2 text-xs bg-yellow-500 text-white px-2 py-0.5 rounded-full align-middle">
                      Featured
                    </span>
                  )}
                </h3>
                <p className="text-gray-600 text-sm">{service.shortDescription}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Contact />
      <FooterComponent />
    </div>
  );
};

export default AboutUs;
