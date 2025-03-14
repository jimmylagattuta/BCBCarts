import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from "../sections/HeroSection";


// Lazy-load everything else:
const LazySocial = lazy(() => import('../components/Social'));
const FooterComponent = lazy(() => import('../sections/FooterComponent'));
const AboutUsComponent = lazy(() => import('../sections/AboutUsComponent'));
const Contact = lazy(() => import('../pages/main/Contact'));
const PlaquesComponent = lazy(() => import("../sections/PlaquesComponent"));
const OurServicesComponent = lazy(() => import("../sections/OurServicesComponent"));
const HowItWorksComponent = lazy(() => import("../sections/HowItWorksComponent"));
const LocationsSection = lazy(() => import("../sections/LocationsSection"));
const Home = ({ scrollToContact, reviews }) => {
  // State to trigger loading of lazy sections
  const [loadRest, setLoadRest] = useState(false);

  // Decide when to load the rest: immediately, after a small delay, or on user action
  useEffect(() => {
    // Example: load them immediately after Home mounts
    const timer = setTimeout(() => {
      setLoadRest(true);
    }, 0); // or 1000ms, 2000ms, etc.

    return () => clearTimeout(timer);
  }, []);

  // Build the rich snippet using Schema.org types for BCB Carts.
  const richSnippet = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BCB Carts",
    "url": "https://bcbcarts.com",
    "logo": "https://www.bcbcarts.com/BCBLogo.jpg",
    "description": "At BCB Carts, we specialize in providing high-quality electric carts for leisure and business use. Our services include cart sales, rentals, professional installs, lithium battery upgrades, parts & accessories, pressure wash, custom welds, and electronics upgrades.",
    "founder": {
      "@type": "Person",
      "name": "Brandon",  // Update with the actual founder's name if desired
      "jobTitle": "Founder"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-323-333-3471",
      "contactType": "Customer Service",
      "availableLanguage": ["English"],
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
        "Buena Park"
      ]
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Electric Cart Services",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Service",
            "name": "Cart Sales",
            "description": "Discover our premium cart sales featuring high-performance, stylish, and reliable electric carts.",
            "url": "https://bcbcarts.com/services/cart-sales"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Service",
            "name": "Cart Rentals",
            "description": "Flexible rental options for events, resorts, or daily use.",
            "url": "https://bcbcarts.com/services/cart-rentals"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Service",
            "name": "Installs",
            "description": "Expert installation services ensuring optimal performance and safety.",
            "url": "https://bcbcarts.com/services/installs"
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "Service",
            "name": "Lithium Upgrades",
            "description": "Upgrade to advanced lithium battery systems for longer run times and faster charging.",
            "url": "https://bcbcarts.com/services/lithium"
          }
        },
        {
          "@type": "ListItem",
          "position": 5,
          "item": {
            "@type": "Service",
            "name": "Parts & Accessories",
            "description": "High-quality parts and accessories to keep your cart running at its best.",
            "url": "https://bcbcarts.com/services/parts"
          }
        },
        {
          "@type": "ListItem",
          "position": 6,
          "item": {
            "@type": "Service",
            "name": "Pressure Wash",
            "description": "Professional cleaning services to revitalize your electric cart.",
            "url": "https://bcbcarts.com/services/pressure-wash"
          }
        },
        {
          "@type": "ListItem",
          "position": 7,
          "item": {
            "@type": "Service",
            "name": "Custom Weld",
            "description": "Bespoke fabrication solutions to enhance your cart’s design and performance.",
            "url": "https://bcbcarts.com/services/custom-weld"
          }
        },
        {
          "@type": "ListItem",
          "position": 8,
          "item": {
            "@type": "Service",
            "name": "Electronics",
            "description": "Modern upgrades to integrate advanced controls, sound systems, and more.",
            "url": "https://bcbcarts.com/services/electronics"
          }
        }
      ]
    }
  };
  return (
    <div>
        <Helmet>
            <script type="application/ld+json">
            {JSON.stringify(richSnippet)}
            </script>
            <title>BCB Carts - Your Trusted Partner in Electric Carts</title>
            <meta
            name="description"
            content="Discover BCB Carts – your trusted partner in leisure-filled electric vehicles. We offer premium cart sales, rentals, installs, lithium upgrades, parts, pressure wash, custom weld, and electronics upgrades."
            />
        </Helmet>
      {/* Eager-load only Intro */}

      <HeroSection />


      {/* Conditionally render everything else */}
      {loadRest && (
        <Suspense fallback={<div>Loading...</div>}>
          <LazySocial />
          <AboutUsComponent />
          <Contact />
          <PlaquesComponent />
          <OurServicesComponent />
          <HowItWorksComponent />
          <LocationsSection />


          <FooterComponent />
        </Suspense>
      )}
    </div>
  );
};

export default Home;
