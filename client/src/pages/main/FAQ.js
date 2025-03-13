import React, { useState } from "react";
import "./FAQ.css";

const faqData = [
  {
    question: "What insurance do you currently accept?",
    answer:
      "Currently, we are only treating personal injury patients. (Patient on liens)",
  },
  {
    question: "Do you offer telemedicine appointments?",
    answer:
      "Yes! We offer expert, trusted telehealth services by video and phone.",
  },
  {
    question: "Do you perform EMG diagnostics?",
    answer: "Yes, in all of our locations!",
  },
  {
    question: "Do you perform outpatient injections?",
    answer: "Yes, in all of our locations!",
  },
  {
    question: "How soon can my client be scheduled?",
    answer: "Within 24-48 hrs. of referral receipt.",
  },
  {
    question: "How to send a referral?",
    answer:
      "Send us an email to referrals@californiapremierpainclinics.com or drop us a file on our website.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="faqs-section">
      <h1 className="faqs-title">Frequently Asked Questions</h1>
      <p className="faqs-subtitle">
        Please reach us at{" "}
        <a href="mailto:referrals@californiapremierpainclinics.com">
          referrals@californiapremierpainclinics.com
        </a>{" "}
        if you cannot find an answer to your question.
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
  );
};

export default FAQ;
