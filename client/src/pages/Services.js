import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { servicesData, locationsData } from "../data";
import Contact from "../pages/main/Contact";
import FooterComponent from "../sections/FooterComponent";
import "./Services.css";

const Services = () => {
  const { serviceId } = useParams();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 569);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 569);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const service = servicesData[serviceId];

  if (!service) {
    return (
      <div className="service-page">
        <p className="small-heading">BCB Carts</p>
        <h1>Service Not Found</h1>
        <p>We couldn’t find the service you’re looking for.</p>
        <Link to="/services">Go back to all services</Link>
      </div>
    );
  }

  const heroImage = isDesktop && service.images.desktopHero
    ? service.images.desktopHero
    : service.images.hero;

  const whyChooseBg = isDesktop && service.desktopWhyChooseBg
    ? service.desktopWhyChooseBg
    : service.whyChooseBg;

  const url = `https://www.bcbcarts.com/services/${serviceId}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": url,
        "name": service.title,
        "description": service.shortDescription,
        "url": url,
        "image": heroImage,
        "areaServed": [
          "Long Beach", "Seal Beach", "Huntington Beach", "San Pedro", "Lakewood",
          "Irvine", "Anaheim", "Santa Ana", "Newport Beach", "Costa Mesa",
          "Fullerton", "Garden Grove", "Westminster", "Tustin", "Brea",
          "Placentia", "Cypress", "Buena Park"
        ],
        "provider": {
          "@type": "Organization",
          "name": "BCB Carts",
          "url": "https://www.bcbcarts.com",
          "logo": "https://i.postimg.cc/vT5Y3Jbb/BCBLogo-1.webp"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": url
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.bcbcarts.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://www.bcbcarts.com/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": service.title,
            "item": url
          }
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{service.title} | BCB Carts</title>
        <meta name="description" content={service.shortDescription} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="service-page">
        <div
          className="service-hero"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="services-hero-overlay">
            <div className="services-hero-content-title">
              <div className="line"></div>
              <h1 className="company-name-services">BCB Carts</h1>
              <div className="line"></div>
            </div>
            <h1>{service.title}</h1>
            <p>{service.shortDescription}</p>
            <Link to="/locations#contactForm" className="cta-button">
              Book an Appointment
            </Link>
          </div>
        </div>

        {!isDesktop && (
          <div className="overlay-images">
            <img src={service.images.overlay1} alt="Overlay 1" className="image1" />
            <img src={service.images.overlay2} alt="Overlay 2" className="image2" />
          </div>
        )}

        <div className="service-content">
          <div className="content-section">
            <img
              src={
                isDesktop
                  ? "https://i.postimg.cc/wTH3RwQL/i-Stock-944550986-2.webp"
                  : service.images.section
              }
              alt={service.title}
              className="content-image"
            />
            <div className="service-content-with-title">
              <h1 id="services-title-small">{service.title}</h1>
              <div className="content-text">
                {service.mainContent
                  .split("\n\n")
                  .filter((p) => p.trim() !== "")
                  .map((p, i) => (
                    <p key={i}>{p.trim()}</p>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="info-section"
          style={{
            backgroundImage: `url(${whyChooseBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="info-overlay">
            <h2 className="info-title">{service.whyChooseTitle}</h2>
            <p className="info-text">{service.whyChooseContent}</p>
            <h3 className="info-subtitle">{service.helpTitle}</h3>
            <ul className="info-list">
              {service.helpList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <Link to="/about-us">
              <h3 className="info-subtitle">{service.providerTitle}</h3>
            </Link>
            <div className="provider-container">
              <div className="provider-text">
                <p className="info-text">{service.providerContent}</p>
              </div>
            </div>
            <Link to="/locations#contactForm" className="cta-button" style={{ margin: "20px" }}>
              Book an Appointment
            </Link>
          </div>
        </div>
      </div>

      <Contact />

      <div className="locations-list-container">
        <h2 className="locations-list-title">Available at these Locations</h2>
        <div className="locations-grid">
          {Object.entries(locationsData).map(([key, loc]) => {
            const bgImage = loc.desktopImage || loc.heroImage;
            return (
              <Link to={`/locations/${key}`} className="location-card" key={key}>
                <div
                  className="location-image"
                  style={{ backgroundImage: `url(${bgImage})` }}
                ></div>
                <div className="location-content">
                  <h3>{loc.name}</h3>
                  {loc.address !== "Service Area" && <p>{loc.address}</p>}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <FooterComponent />
    </>
  );
};

export default Services;
