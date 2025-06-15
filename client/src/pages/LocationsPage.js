import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { locationsData } from "../data";
import LocationsSection from "../sections/LocationsSection";
import SingleLocation from "../sections/SingleLocation";
import Contact from "./main/Contact";
import FooterComponent from "../sections/FooterComponent";
import "./LocationsPage.css";

function LocationsPage() {
  const { locationId } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const isSingleLocation = Boolean(locationId);

  const canonicalUrl = locationId
    ? `https://bcbcarts.com/locations/${locationId}`
    : `https://bcbcarts.com/locations`;

  const pageTitle = isSingleLocation
    ? `${locationsData[locationId]?.name || "Location Not Found"} | BCB Carts`
    : "Our Locations | BCB Carts";

  const pageDescription = isSingleLocation
    ? locationsData[locationId]?.description ||
      "Explore our local BCB Carts dealership and service center."
    : "Explore BCB Carts locations across the US, offering electric cart sales, rentals, and expert service.";

  // Rich Snippet for all locations
  let locationsRichSnippet = null;
  if (!isSingleLocation) {
    const locationsArray = Object.entries(locationsData).map(([key, loc]) => {
      const addressParts = loc.address ? loc.address.split(",").map(s => s.trim()) : [];
      let streetAddress = loc.address;
      let addressLocality = "";
      let addressRegion = "";
      let postalCode = "";
      if (addressParts.length >= 3) {
        streetAddress = addressParts[0];
        addressLocality = addressParts[1];
        const regionPostal = addressParts[2].split(" ");
        addressRegion = regionPostal[0];
        postalCode = regionPostal.slice(1).join(" ");
      }
      return {
        "@type": "LocalBusiness",
        "name": loc.name,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": streetAddress,
          "addressLocality": addressLocality,
          "addressRegion": addressRegion,
          "postalCode": postalCode,
          "addressCountry": "US"
        },
        "telephone": loc.phone,
        "url": `https://bcbcarts.com/locations/${key}`,
        "image": loc.desktopImage || loc.heroImage,
        "description": loc.description
      };
    });
    locationsRichSnippet = {
      "@context": "https://schema.org",
      "@graph": locationsArray
    };
  }

  // Breadcrumbs (for both list and individual)
  const breadcrumbSnippet = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": isSingleLocation
      ? [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Locations",
            "item": "https://bcbcarts.com/locations"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": locationsData[locationId]?.name || "Location Not Found",
            "item": `https://bcbcarts.com/locations/${locationId}`
          }
        ]
      : [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Locations",
            "item": "https://bcbcarts.com/locations"
          }
        ]
  };

  // Determine content
  let officeContent = null;
  if (isSingleLocation) {
    const office = locationsData[locationId];
    officeContent = office ? (
      <SingleLocation office={office} />
    ) : (
      <div className="office-detail not-found">
        <h2>Location Not Found</h2>
        <p>Please select a valid location.</p>
      </div>
    );
  } else {
    officeContent = <LocationsSection showButton={false} />;
  }

  // Scroll to contact
  useEffect(() => {
    if (window.location.hash === "#contactForm") {
      const element = document.getElementById("contactForm");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div>
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSnippet)}
        </script>
        {!isSingleLocation && locationsRichSnippet && (
          <script type="application/ld+json">
            {JSON.stringify(locationsRichSnippet)}
          </script>
        )}
      </Helmet>

      <div className="locations-page-container">
        <div className="contact-header">
          <p className="small-heading">BCB Carts</p>
          <h2 className="main-heading">Find a Location Near You</h2>
          <p className="sub-text">
            We proudly serve customers across our key markets. Whether you're in Long Beach, CA or Griffin, GA, we're here to help you get the electric cart solutions you need.
          </p>
        </div>
        {officeContent}
      </div>

      <div id="contactForm">
        <Contact />
      </div>

      <FooterComponent />
    </div>
  );
}

export default LocationsPage;
