import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    agreement: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First Name is required.';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required.';
    if (!formData.email) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is not valid.';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is not valid. Please include country code.';
    }
    if (!formData.message) newErrors.message = 'Message is required.';
    if (!formData.agreement) newErrors.agreement = 'You must agree to the terms.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      try {
        const response = await fetch('https://bcb-carts-f625407d6d04.herokuapp.com/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
          body: JSON.stringify({ contact: formData }),
        });

        if (response.ok) {
          setSubmitted(true);
          console.log('Email sent successfully:', formData);
        } else {
          console.error('Email sending failed', response);
          alert('There was an error sending your message. Please try again later.');
        }
      } catch (error) {
        console.error('Error sending email:', error);
        alert('There was an error sending your message. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="contact-section">
      <div className="contact-section-header">
        <h2>Send A Message To BCB Carts</h2>
        <p>If you have any inquiries, concerns, or comments regarding BCB Carts, please fill out the short contact form below.</p>
      </div>
      {!submitted ? (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-row">
            <div className="contact-form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                required
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>
            <div className="contact-form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                required
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
          </div>
          <div className="contact-form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="contact-form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number (e.g. +123456789)"
              required
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
          <div className="contact-form-group">
            <label htmlFor="message">Comments</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Type your message here..."
              required
            />
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>
          <div className="contact-form-agreement">
            <input
              type="checkbox"
              id="agreement"
              name="agreement"
              checked={formData.agreement}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="agreement">
              By clicking, I understand and agree that any information submitted will be forwarded to our office by email and not via a secure messaging system. This form should not be used to transmit private information, and we disclaim all warranties with respect to the privacy and confidentiality of any information submitted through this form.
            </label>
            {errors.agreement && <span className="error-message">{errors.agreement}</span>}
          </div>
          <button type="submit" className="contact-submit-button" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>
      ) : (
        <div className="contact-submitted-message">
          <h3>Thank You!</h3>
          <p>Your message has been sent successfully. We will get back to you shortly.</p>
        </div>
      )}
    </div>
  );
}

export default Contact;
