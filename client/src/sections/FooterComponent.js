import React from "react";
import "./FooterComponent.css";

function FooterComponent() {
  return (
    <footer className="footer-container">
      {/* Top area with 4 columns on desktop/tablet */}
      <div className="footer-top-grid">
        {/* 1) BRAND + TAGLINE COLUMN */}
        <div className="footer-col brand-col">
          {/* Fancy Brand Row */}
          <div className="fancy-brand-row">
            <img
              src="https://i.postimg.cc/vT5Y3Jbb/BCBLogo-1.webp"
              alt="BCB Carts"
              className="fancy-brand-logo"
              height="40"
              width="40"
            />
            <div className="fancy-text-group">
              <h1 className="fancy-brand-title">BCB Carts</h1>
              <h2 className="fancy-brand-subtitle">
                Your Trusted Partner in Leisure-Filled Electric Vehicles
              </h2>
            </div>
          </div>

          {/* Tagline + Social Icons */}
          <div className="footer-tagline-container">
            <p className="fancy-brand-slogan">
              Experience quality, style, and performance with our range of electric carts.
            </p>
            <div className="footer-social-icons">
              <a
                href="https://www.instagram.com/bcbcarts"
                target="_blank"
                rel="noopener noreferrer"
                className="social-circle"
              >
                <img
                  src="https://i.postimg.cc/j5G6vJHJ/Screenshot-2025-02-22-181601-bg-removed-png.webp"
                  alt="Instagram"
                  className="social-icon-img"
                  height="24"
                  width="24"
                />
              </a>
              {/* Add more social icons as needed */}
            </div>
          </div>
        </div>

        {/* 2) NAVIGATION COLUMN */}
        <div className="footer-col footer-section nav-col">
          <h3>Navigation</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/locations">Locations</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>

        {/* 3) SERVICES COLUMN */}
        <div className="footer-col footer-section services-col">
          <h3>Services</h3>
          <ul>
            <li><a href="/services/cart-sales">Cart Sales</a></li>
            <li><a href="/services/cart-rentals">Cart Rentals</a></li>
            <li><a href="/services/installs">Installs</a></li>
            <li><a href="/services/lithium">Lithium</a></li>
            <li><a href="/services/parts">Parts</a></li>
            <li><a href="/services/pressure-wash">Pressure Wash</a></li>
            <li><a href="/services/custom-weld">Custom Weld</a></li>
            <li><a href="/services/electronics">Electronics</a></li>
          </ul>
        </div>

        {/* 4) GET IN TOUCH COLUMN */}
        <div className="footer-col footer-section contact-col">
          <h3>Get In Touch</h3>
          <ul className="address-list">
            <li>
              <a
                href="https://www.google.com/maps/search/?api=1&query=123+Cart+Avenue,+Long+Beach,+CA+90802"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://i.postimg.cc/Sx95BsW6/inverted-image-1.webp"
                  alt="Map icon"
                  className="map-icon"
                  height="16"
                  width="16"
                />
                Long Beach - 123 Cart Avenue, Long Beach, CA 90802
              </a>
            </li>
            <li>
              <a
                href="https://www.google.com/maps/search/?api=1&query=456+Electric+Street,+Griffin,+GA+30223"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://i.postimg.cc/Sx95BsW6/inverted-image-1.webp"
                  alt="Map icon"
                  className="map-icon"
                  height="16"
                  width="16"
                />
                Griffin - 456 Electric Street, Griffin, GA 30223
              </a>
            </li>
            <li>
              <strong>Phone: </strong>
              <a href="tel:+13233333471">&nbsp;+1-323-333-3471</a>
            </li>
            <li>
              <strong>Email: </strong>
              <a href="mailto:contact@yahoo.com">
                &nbsp;mebcb@yahoo.com
              </a>
            </li>
            <li>
              <strong>Hours:&nbsp; </strong>
              Mon - Fri: 09:00 AM - 06:00 PM, Sat - Sun: Closed
            </li>
          </ul>

          <p className="book-appointment-p">
            <a href="/contact" className="book-appointment-link">
              Contact Us
            </a>
          </p>
          <p className="footer-disclaimer-text">
            * All reviews and testimonials are from verified customers.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2025 BCB Carts. All Rights Reserved.</p>
        <ul className="footer-bottom-links">
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/terms-and-conditions">Terms & Conditions</a></li>
        </ul>
        <p className="footer-credit">Website by James Lagattuta</p>
      </div>
    </footer>
  );
}

export default FooterComponent;