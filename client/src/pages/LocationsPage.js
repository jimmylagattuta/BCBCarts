import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { locationsData } from "../data";
import LocationsSection from "../sections/LocationsSection"; // Your office list component
import SingleLocation from "../sections/SingleLocation";
import FooterComponent from "../sections/FooterComponent";
import "./LocationsPage.css";

function LocationsPage() {
  const { locationId } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    agreement: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Determine whether we are showing a single location or all locations.
  const isSingleLocation = Boolean(locationId);

  // Build the rich snippet for all locations if we're on the list page.
  let locationsRichSnippet = null;
  if (!isSingleLocation) {
    const locationsArray = Object.entries(locationsData).map(([key, loc]) => {
      // Parse the address components from a comma-separated address string.
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

  // Determine the content for a single location or for the list.
  let officeContent = null;
  if (locationId) {
    const office = locationsData[locationId];
    if (office) {
      officeContent = <SingleLocation office={office} />;
    } else {
      officeContent = (
        <div className="office-detail not-found">
          <h2>Location Not Found</h2>
          <p>Please select a valid location.</p>
        </div>
      );
    }
  } else {
    officeContent = <LocationsSection showButton={false} />;
  }

  return (
    <div>
      {/* Inject the rich snippet for all locations when not on an individual location page */}
      {!isSingleLocation && locationsRichSnippet && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(locationsRichSnippet)}
          </script>
        </Helmet>
      )}
      <div className="locations-page-container">
        <div className="contact-header">
          <p className="small-heading">BCB Carts</p>
          <h2 className="main-heading">Find a Location Near You</h2>
          <p className="sub-text">
            We proudly serve customers across our key markets. Whether you're in Long Beach, CA or Griffin, GA, we're here to help you get the electric cart solutions you need.
          </p>
        </div>

        {!submitted ? (
          <form className="contact-container" onSubmit={/* your handleSubmit */ () => {}}>
            {/* Form fields go here */}
          </form>
        ) : (
          <div className="contact-submitted-message">
            <h3>Thank You!</h3>
            <p>
              Your message has been sent successfully. We will get back to you shortly.
            </p>
          </div>
        )}

        {/* Render office details or the full locations list */}
        {officeContent}
      </div>

      <FooterComponent />
    </div>
  );
}

export default LocationsPage;