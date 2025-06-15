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
{`
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.bcbcarts.com/#organization",
      "name": "BCB Carts",
      "url": "https://www.bcbcarts.com",
      "logo": "https://www.bcbcarts.com/BCBLogo.jpg",
      "description": "BCB Carts is California and Georgia’s trusted electric cart provider. We specialize in golf cart sales, rentals, installs, lithium upgrades, accessories, electronics, custom welding, and pressure wash services.",
      "founder": {
        "@type": "Person",
        "name": "Brandon",
        "jobTitle": "Founder"
      },
      "sameAs": [
        "https://www.facebook.com/BCBCarts/about",
        "https://www.snapchat.com/add/mebcbatyawho?sender_web_id=e45b430a-0cac-45b4-a794-4261d854c91c&device_type=ios&is_copy_url=true",
        "https://tiktok.com/@bcbcarts",
        "https://m.youtube.com/@bcbcarts2640",
        "https://www.pinterest.com/bblackman0408/?invite_code=a5411783616e4987aa516c60050893e1&sender=801289096109711486",
        "https://www.threads.net/@mebcbatyawho?invite=0",
        "https://www.instagram.com/mebcbatyawho/profilecard/?igsh=MzRlODBiNWFlZA=="
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-323-333-3471",
        "contactType": "Customer Service",
        "availableLanguage": ["English"],
        "areaServed": [
          "Long Beach", "Seal Beach", "Huntington Beach", "San Pedro", "Lakewood",
          "Irvine", "Anaheim", "Santa Ana", "Newport Beach", "Costa Mesa",
          "Cypress", "Buena Park", "Griffin"
        ]
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Long Beach",
        "addressRegion": "CA",
        "postalCode": "90802",
        "addressCountry": "US"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Electric Cart Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Cart Sales",
              "description": "High-performance, stylish, and reliable electric carts for both leisure and business.",
              "url": "https://www.bcbcarts.com/services/cart-sales"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Cart Rentals",
              "description": "Flexible rental options for events, resorts, and short-term needs.",
              "url": "https://www.bcbcarts.com/services/cart-rentals"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Installs",
              "description": "Professional golf cart system installation with peak performance and safety in mind.",
              "url": "https://www.bcbcarts.com/services/installs"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Lithium Battery Upgrades",
              "description": "Upgrade to modern lithium systems for improved performance and battery life.",
              "url": "https://www.bcbcarts.com/services/lithium"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Parts & Accessories",
              "description": "OEM-quality parts and upgrades for your electric cart.",
              "url": "https://www.bcbcarts.com/services/parts"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Pressure Wash Services",
              "description": "Showroom-quality cleaning to protect and refresh your cart’s appearance.",
              "url": "https://www.bcbcarts.com/services/pressure-wash"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom Weld & Fabrication",
              "description": "Custom metalwork and performance enhancements tailored to your needs.",
              "url": "https://www.bcbcarts.com/services/custom-weld"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Electronics & Upgrades",
              "description": "Cutting-edge cart tech including sound systems, control upgrades, and displays.",
              "url": "https://www.bcbcarts.com/services/electronics"
            }
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.bcbcarts.com/#website",
      "url": "https://www.bcbcarts.com",
      "name": "BCB Carts",
      "inLanguage": "en-US",
      "publisher": {
        "@id": "https://www.bcbcarts.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.bcbcarts.com/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.bcbcarts.com/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.bcbcarts.com/"
        }
      ]
    }
  ]
}
`}
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
