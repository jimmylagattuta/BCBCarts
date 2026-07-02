// src/sections/LocationsSection.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { locationsData } from "../data";
import "./LocationsSection.css";

function LocationsSection({ showButton = true }) {
  const contactClickEndpoint = "/api/contact-clicks";
  const canonicalPageUrl = "https://www.bcbcarts.com/locations";

  // Convert locationsData (an object) to an array of locations with keys.
  const locations = Object.entries(locationsData).map(([key, location]) => ({
    ...location,
    id: key,
  }));

  // Determine if the screen width is 769 or greater.
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 769);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 769);
    };

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
      // Never block the visitor from calling because tracking failed.
    }
  };

  // Handler to open the address in Google Maps
  const openMap = (address, e) => {
    e.preventDefault();
    e.stopPropagation();

    window.open(
      `https://www.google.com/maps/search/?api=1&query=${address.replace(/ /g, "+")}`,
      "_blank"
    );
  };

  // Handler for calling the phone number
  const callPhone = (location, e) => {
    e.preventDefault();
    e.stopPropagation();

    const cleanPhoneNumber = location.phone.replace(/[^0-9]/g, "");
    const phoneHref = `tel:${cleanPhoneNumber}`;

    trackContactClick({
      contactType: "phone",
      label: `Locations Section Phone: ${location.name}`,
      href: phoneHref
    });

    window.location.href = phoneHref;
  };

  // Helper to determine the background image based on screen width and available data.
  const getBackgroundImage = (location) => {
    return isDesktop && location.desktopImage
      ? location.desktopImage
      : location.heroImage;
  };

  return (
    <section className="locations-section">
      <div className="hero-content-title">
        <div className="line-locations"></div>
        <h1 className="company-name-locations">OUR LOCATIONS</h1>
        <div className="line-locations"></div>
      </div>

      <div className="locations-grid">
        {locations.map((location, index) => (
          <Link
            key={location.id}
            to={`/locations/${location.id}`}
            className="location-card-link"
          >
            <div className={`location-card ${index % 2 !== 0 ? "reverse" : ""}`}>
              <div
                className="location-image"
                style={{
                  backgroundImage: `url(${getBackgroundImage(location)})`
                }}
              ></div>

              <div className="location-info">
                <h2 className="location-city">{location.name}</h2>

                <p className="location-address">
                  {location.address && location.address !== "Service Area" ? (
                    <span
                      onClick={(e) => openMap(location.address, e)}
                      className="map-link"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src="https://i.postimg.cc/HLxtkzZm/map-pin-1-1.webp"
                        alt="Map icon"
                        className="map-icon"
                        height="16"
                        width="16"
                      />
                      {location.address}
                    </span>
                  ) : (
                    "Service Area"
                  )}
                </p>

                {location.phone && (
                  <p className="location-address">
                    <strong>Phone:</strong>
                    <span
                      onClick={(e) => callPhone(location, e)}
                      className="phone-link"
                      style={{ cursor: "pointer", marginLeft: "5px" }}
                    >
                      {location.phone}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {showButton && (
        <div
          className="button-container"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          <Link to="/locations" className="location-section-button">
            View All Locations
          </Link>
        </div>
      )}
    </section>
  );
}

export default LocationsSection;