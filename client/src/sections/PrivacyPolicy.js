import React from "react";
import { Helmet } from "react-helmet";
import FooterComponent from "../sections/FooterComponent"; // adjust the path if needed
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  // Build the JSON‑LD rich snippet for the Privacy Policy & TOS page.
  const richSnippet = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy & Terms and Conditions",
    "url": "https://bcbcarts.com/privacy-policy",
    "description": "Review the Privacy Policy and Terms and Conditions for BCB Carts to learn how we handle your personal data and what rules apply when using our services.",
    "publisher": {
      "@type": "Organization",
      "name": "BCB Carts",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.bcbcarts.com/BCBLogo.jpg"
      },
      "email": "mebcb@yahoo.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Main Street",
        "addressLocality": "Long Beach",
        "addressRegion": "CA",
        "postalCode": "90802",
        "addressCountry": "US"
      }
    },
    "dateModified": "2022-08-04"
  };

  return (
    <div>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(richSnippet)}
        </script>
      </Helmet>
      <div className="privacy-policy-container">
        <div className="privacy-policy-content">
          {/* Privacy Policy Section */}
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: August 04, 2022</p>
          <p>
            This Privacy Policy describes our policies and procedures on the collection, use, and disclosure of your information when you use our Service and explains your privacy rights and how the law protects you.
          </p>
          <p>
            We use your personal data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this Privacy Policy.
          </p>
          <h2>Interpretation and Definitions</h2>
          <h3>Interpretation</h3>
          <p>
            The words whose initial letters are capitalized have meanings defined under the following conditions. These definitions shall have the same meaning whether they appear in singular or plural.
          </p>
          <h3>Definitions</h3>
          <p>For the purposes of this Privacy Policy:</p>
          <ul>
            <li>
              <strong>Account:</strong> A unique account created for you to access our Service or parts of our Service.
            </li>
            <li>
              <strong>Business:</strong> Refers to BCB Carts, the legal entity that collects consumers’ personal information and determines the purposes and means of processing that information.
            </li>
            <li>
              <strong>Company:</strong> Refers to BCB Carts.
            </li>
            {/* Additional definitions as needed */}
          </ul>
          <p>
            ... (Privacy Policy content continues) ...
          </p>

          {/* Terms & Conditions Section */}
          <h1>Terms and Conditions</h1>
          <p className="last-updated">Last updated: August 04, 2022</p>
          <p>
            Please read these Terms and Conditions carefully before using our Service.
          </p>
          <h2>Interpretation and Definitions</h2>
          <h3>Interpretation</h3>
          <p>
            The words whose initial letters are capitalized have meanings defined under the following conditions. These definitions shall have the same meaning whether they appear in singular or plural.
          </p>
          <h3>Definitions</h3>
          <ul>
            <li>
              <strong>Affiliate:</strong> An entity that controls, is controlled by, or is under common control with a party.
            </li>
            <li>
              <strong>Account:</strong> A unique account created for you to access our Service.
            </li>
            <li>
              <strong>Country:</strong> Refers to the United States.
            </li>
            <li>
              <strong>Company:</strong> Refers to BCB Carts.
            </li>
            {/* Additional definitions as needed */}
          </ul>
          <p>
            ... (Terms & Conditions content continues) ...
          </p>
          <p>
            If you have any questions about these Terms and Conditions, you can contact us:
          </p>
          <p>
            By email:{" "}
            <a href="mailto:mebcb@yahoo.com">
              mebcb@yahoo.com
            </a>
          </p>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default PrivacyPolicy;