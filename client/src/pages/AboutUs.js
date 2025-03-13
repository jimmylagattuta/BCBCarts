import React from "react";
import { Helmet } from "react-helmet";
import { servicesData } from "../data";
import FooterComponent from "../sections/FooterComponent";
import "./AboutUs.css";

const AboutUs = () => {
  // Convert servicesData object into an array for mapping.
  const servicesArray = Object.entries(servicesData).map(([key, service]) => ({
    ...service,
    id: key,
  }));

  // Build the rich snippet JSON‑LD object for the About Us page.
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
      "availableLanguage": ["English"]
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
      "Griffin, GA"
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
          "url": `https://bcbcarts.com/services/${service.id}`
        }
      }))
    }
  };

  return (
    <div className="aboutus-container">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(richSnippet)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="aboutus-hero">
        <div className="aboutus-hero-overlay">
          <h1 className="aboutus-hero-title">Welcome to BCB Carts!</h1>
          <p className="aboutus-hero-subtitle">
            Your Trusted Partner in Leisure-Filled Electric Vehicles
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="aboutus-section">
        <h2 className="aboutus-heading">About Us</h2>
        <div className="aboutus-content">
          <div className="aboutus-card">
            <h3>Why Choose Us</h3>
            <p>
              With years of experience in the electric cart industry, we understand
              the unique needs of our customers. At BCB Carts, our commitment is to
              deliver excellence in every transaction—ensuring quality, reliability,
              and style in every cart.
            </p>
          </div>
          <div className="aboutus-card">
            <h3>How We Can Help You</h3>
            <p>
              Whether you’re looking to buy, rent, or repair an electric cart, our expert
              team offers a comprehensive range of services tailored to your specific
              requirements. We’re here to provide the right solution for every need.
            </p>
          </div>
          <div className="aboutus-card">
            <h3>See the Difference</h3>
            <p>
              Our dedication to quality and customer satisfaction means every electric
              cart we service is optimized for performance, safety, and style. Experience
              the BCB Carts difference today.
            </p>
          </div>
        </div>
      </section>

      {/* Provider / Our Story Section */}
      <section className="aboutus-provider">
        <h2 className="aboutus-provider-title">Our Story</h2>
        <div className="aboutus-provider-row">
          <div className="aboutus-provider-image">
            {/* You can add an image of the founder or your team here */}
          </div>
          <div className="aboutus-provider-info">
            <h3>Brandon, Founder of BCB Carts</h3>
            <p>
              At BCB Carts, we combine industry expertise with a passion for quality and
              customer satisfaction. Founded with the goal of providing leisure-filled
              electric vehicles, our team is dedicated to ensuring that every customer
              receives exceptional service and support.
            </p>
            <p>
              Our commitment to innovation, quality, and reliability is evident in every
              cart we sell, rent, or repair. We proudly serve communities in Long Beach,
              California, and Griffin, Georgia—delivering top-notch electric cart solutions
              that exceed expectations.
            </p>
          </div>
        </div>
      </section>

      {/* Services for SEO */}
      <section className="aboutus-services">
        <h2 className="aboutus-services-title">Our Services</h2>
        <div className="aboutus-services-grid">
          {servicesArray.map((service) => (
            <a
              key={service.id}
              href={`/services/${service.id}`}
              className="aboutus-service-card"
            >
              <div
                className="aboutus-service-image"
                style={{ backgroundImage: `url(${service.images.hero})` }}
              ></div>
              <h3 className="aboutus-service-title">{service.title}</h3>
              <p className="aboutus-service-desc">{service.shortDescription}</p>
            </a>
          ))}
        </div>
      </section>

      <FooterComponent />
    </div>
  );
};

export default AboutUs;