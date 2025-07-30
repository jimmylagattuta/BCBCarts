import React, { useState } from "react";
import "./FAQ.css";
import Contact from "./Contact"; // Adjust path as necessary
import FooterComponent from "../../sections/FooterComponent"; // Adjust path as necessary

const faqData = [
  {
    question: "What types of vehicles do you rent?",
    answer:
      "In addition to electric carts, we offer convenient car rentals including sedans, SUVs, and specialty vehicles—perfect for daily errands, weekend trips, or business use. All rentals are clean, inspected, and ready to drive.",
  },
  {
    question: "How do I rent a car through BCB Carts?",
    answer:
      "You can rent a car directly through our website or via Turo. Visit our Car Rentals page for availability, pricing, and instant booking. We also accept direct inquiries by phone or contact form.",
  },
  {
    question: "What is Turo and how does it work with BCB?",
    answer:
      "Turo is a peer-to-peer car-sharing platform where you can rent our vehicles with full insurance and flexible pickup options. We list select cars on Turo to provide an extra layer of convenience and security for our customers.",
  },
  {
    question: "Where can I pick up or drop off rental vehicles?",
    answer:
      "Pickup and drop-off locations are available in Long Beach and surrounding areas. Delivery options are also available depending on your location and rental duration—just contact us to arrange the details.",
  },
  {
    question: "What services do you offer beyond car rentals?",
    answer:
      "BCB Carts offers electric cart sales, short- and long-term cart rentals, lithium battery upgrades, professional installations, custom fabrication, electronics upgrades, and much more.",
  },
  {
    question: "Do you offer financing or leasing options?",
    answer:
      "Yes! We provide competitive financing and leasing options on electric carts. Contact us to learn more about qualifying and monthly plans.",
  },
  {
    question: "Which areas do you serve?",
    answer:
      "We serve customers throughout Southern California, including Long Beach, Huntington Beach, Seal Beach, San Pedro, Lakewood, and much of Orange County. We also operate in Griffin, Georgia.",
  },
  {
    question: "How can I schedule a service or rental?",
    answer:
      "Simply use our Contact form, call us at +1-323-333-3471, or email mebcb@yahoo.com to schedule. For Turo rentals, visit our listing page directly.",
  },
];


const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <section className="faqs-section">
        <h1 className="faqs-title">Frequently Asked Questions</h1>
        <p className="faqs-subtitle">
          Please reach out at{" "}
          <a href="mailto:mebcb@yahoo.com">mebcb@yahoo.com</a> if you can’t find an answer.
        </p>
        <div className="faqs-list">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                {item.question}
                <span className="faq-toggle">{openIndex === index ? "–" : "+"}</span>
              </div>
              {openIndex === index && (
                <div className="faq-answer">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>
      <Contact />
      <FooterComponent />
    </>
  );
};

export default FAQ;
