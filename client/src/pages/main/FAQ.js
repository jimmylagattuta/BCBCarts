import React, { useState } from "react";
import "./FAQ.css";
import Contact from "./Contact"; // Adjust path as necessary
import FooterComponent from "../../sections/FooterComponent"; // Adjust path as necessary

const faqData = [
  {
    question: "What services do you offer?",
    answer:
      "BCB Carts offers a variety of electric cart services, including cart sales, rentals, professional installations, lithium battery upgrades, parts & accessories, pressure washing, custom welds, and electronics upgrades.",
  },
  {
    question: "Which areas do you serve?",
    answer:
      "We proudly serve customers throughout Southern California – including Long Beach, Seal Beach, Huntington Beach, San Pedro, Lakewood, and key Orange County cities – as well as select locations in Georgia.",
  },
  {
    question: "Do you offer financing or leasing options?",
    answer:
      "Yes, we provide competitive financing and leasing options to help you get the electric cart that fits your lifestyle or business needs.",
  },
  {
    question: "How can I schedule an appointment?",
    answer:
      "You can schedule an appointment by filling out our contact form or by calling us directly at +1-323-333-3471.",
  },
  {
    question: "What is your turnaround time for installations?",
    answer:
      "Our professional installations are typically scheduled within a few days after consultation, depending on your requirements.",
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
