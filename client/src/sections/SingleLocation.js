import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { servicesData } from "../data";
import "./SingleLocation.css";

const SingleLocation = ({ office }) => {
  // Determine if the screen width is 769px or wider.
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 769);

  const contactClickEndpoint = "/api/contact-clicks";
  const canonicalPageUrl = "https://www.bcbcarts.com/locations";

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 769);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const trackContactClick = ({ contactType, label, href }) => {
    const payload = {
      event_type: "contact_click",
      contact_type: contactType,
      label,
      href,
      page_url: window.location.href,
      canonical_page_url: canonicalPageUrl,
      referrer: document.referrer || null,
      clicked_at: new Date().toISOString(),
      user_agent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
      timezone_offset_minutes: new Date().getTimezoneOffset(),
      screen: {
        width: window.screen?.width || null,
        height: window.screen?.height || null
      }
    };

    try {
      const body = JSON.stringify(payload);

      if (navigator.sendBeacon) {
        const blob = new Blob([body], {
          type: "application/json"
        });

        navigator.sendBeacon(contactClickEndpoint, blob);
        return;
      }

      fetch(contactClickEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body,
        keepalive: true
      }).catch(() => {});
    } catch (error) {
      // Never block the visitor from calling or emailing because tracking failed.
    }
  };

  // Convert servicesData into an array for mapping.
  const servicesArray = Object.entries(servicesData).map(([key, service]) => ({
    ...service,
    id: key,
  }));

  // Use desktop image if available and on desktop; else fallback to hero image.
  const locationImage =
    isDesktop && office.desktopImage ? office.desktopImage : office.heroImage;

  const cleanPhoneNumber = office.phone
    ? office.phone.replace(/[^0-9]/g, "")
    : "";

  const phoneHref = cleanPhoneNumber ? `tel:${cleanPhoneNumber}` : "";
  const emailHref = office.email ? `mailto:${office.email}` : "";

  // Helper function to parse office.address into structured components.
  // For "Service Area" entries, this will simply return an empty object.
  const parseAddress = (address) => {
    if (!address || address === "Service Area") return {};
    const parts = address.split(",").map((s) => s.trim());
    if (parts.length < 3) return { streetAddress: address };
    const streetAddress = parts[0];
    const addressLocality = parts[1];
    const regionPostal = parts[2].split(" ");
    const addressRegion = regionPostal[0];
    const postalCode = regionPostal.slice(1).join(" ");
    return {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality,
      addressRegion,
      postalCode,
      addressCountry: "US"
    };
  };

  const postalAddress = parseAddress(office.address);

  // Build the rich snippet JSON-LD object for this location.
  const richSnippet = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: office.name,
    description: office.description,
    address: postalAddress,
    telephone: office.phone,
    url: window.location.href,
    image: locationImage,
    email: office.email
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(richSnippet)}
        </script>
      </Helmet>

      <div className="sl-location-card">
        {/* Office Card Row */}
        <div className="sl-location-cardrow">
          <div
            className="sl-location-image"
            style={{ backgroundImage: `url(${locationImage})` }}
          >
            <h2 className="sl-location-name">{office.name}</h2>
          </div>

          <div className="sl-location-info">
            <p className="sl-location-address">
              {office.address && office.address !== "Service Area" ? (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${office.address.replace(
                    / /g,
                    "+"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://i.postimg.cc/HLxtkzZm/map-pin-1-1.webp"
                    alt="Map icon"
                    className="sl-map-icon"
                    height="16"
                    width="16"
                  />
                  {office.address}
                </a>
              ) : (
                "Service Area"
              )}
            </p>
          </div>
        </div>

        {/* Redesigned Contact Info Section */}
        <div className="sl-contact-info">
          <ul className="sl-contact-list">
            {office.phone && (
              <li className="sl-contact-item">
                <strong>Phone:&nbsp;</strong>{" "}
                <a
                  href={phoneHref}
                  onClick={() =>
                    trackContactClick({
                      contactType: "phone",
                      label: `Single Location Phone: ${office.name}`,
                      href: phoneHref
                    })
                  }
                >
                  {office.phone}
                </a>
              </li>
            )}

            {office.fax && (
              <li className="sl-contact-item">
                <strong>Fax:&nbsp;</strong> {office.fax}
              </li>
            )}

            {office.email && (
              <li className="sl-contact-item">
                <a
                  href={emailHref}
                  onClick={() =>
                    trackContactClick({
                      contactType: "email",
                      label: `Single Location Email: ${office.name}`,
                      href: emailHref
                    })
                  }
                >
                  Email us
                </a>
              </li>
            )}

            {office.hours && (
              <li className="sl-contact-item">
                <strong>Hours:&nbsp;</strong> {office.hours}
              </li>
            )}
          </ul>
        </div>

        {/* Office Description */}
        <div className="sl-office-description">
          <h3>About {office.name}</h3>
          <p>{office.description}</p>
        </div>

        {/* Services List Section */}
        <div
          className="sl-services-section"
          style={{
            backgroundImage: `url(${locationImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="sl-services-overlay">
            <h2 className="sl-services-title">Our Services</h2>

            <div className="sl-services-grid">
              {servicesArray.map((service) => (
                <Link
                  key={service.id}
                  to={`/services/${service.id}`}
                  className="sl-service-card"
                >
                  <div
                    className="sl-service-image"
                    style={{ backgroundImage: `url(${service.images.hero})` }}
                  ></div>

                  <div className="sl-service-info">
                    <h3 className="sl-service-name">{service.title}</h3>
                    <p className="sl-service-short">
                      {service.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleLocation;