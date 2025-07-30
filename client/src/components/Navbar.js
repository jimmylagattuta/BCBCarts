import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { servicesData } from '../data';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  const navigate = useNavigate();
  const location = useLocation();
  const hoverTimeout = useRef(null);

  // Toggle entire mobile menu
  const toggleMenu = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
      if (isOpen) {
        setSubMenuOpen(false);
      }
    }
  };

  // Navigate to a route & close all menus
  const handleNavItemClick = (path) => {
    navigate(path);
    setIsOpen(false);
    setSubMenuOpen(false);
  };

  // New handler for "Send Us An Email!" that checks current pathname
  const handleContactClick = () => {
    const targetHash = "#contactForm";
    if (location.pathname.startsWith("/locations")) {
      // If already on locations page, scroll smoothly to contact form
      const element = document.getElementById("contactForm");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Otherwise, navigate to locations page with hash
      navigate(`/locations${targetHash}`);
    }
    setIsOpen(false);
    setSubMenuOpen(false);
  };

  // For mobile: click on "Services" toggles sub-menu
  const handleServicesClick = () => {
    if (isMobile) {
      setSubMenuOpen(!subMenuOpen);
    }
  };

  // For desktop: hover over "Services" or its submenu to show it
  const handleServicesEnter = () => {
    if (!isMobile) {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
      }
      setSubMenuOpen(true);
    }
  };

  // For desktop: add a delay before closing the submenu
  const handleServicesLeave = () => {
    if (!isMobile) {
      hoverTimeout.current = setTimeout(() => {
        setSubMenuOpen(false);
      }, 300);
    }
  };

  // On window resize, determine if we're in mobile view
  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 769;
      setIsMobile(mobileView);
      if (!mobileView) {
        setIsOpen(false);
        setSubMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand: Logo + Desktop Company Name (clickable to home) */}
        <div className="navbar-brand">
          <div className="navbar-logo" onClick={() => handleNavItemClick('/')}>
            <img
              src="https://i.postimg.cc/Qx1Xxjrb/BCBLogo-1.webp"
              alt="Company Logo"
              loading="eager"
              height="75"
              width="85"
            />
          </div>
          <div className="company-name-desktop" onClick={() => handleNavItemClick('/')}>
            BCB Carts
          </div>
        </div>

        {/* Mobile burger icon (hidden on desktop) */}
        {isMobile && (
          <div className="menu-icon" onClick={toggleMenu}>
            <div className={isOpen ? 'bar change' : 'bar'}></div>
            <div className={isOpen ? 'bar change' : 'bar'}></div>
            <div className={isOpen ? 'bar change' : 'bar'}></div>
          </div>
        )}

        {/* Main Nav Menu: visible if open on mobile, or always on desktop */}
        <ul className={`nav-menu ${isOpen || !isMobile ? 'active' : ''}`}>
          <li
            className="nav-item services-link"
            onClick={handleServicesClick}
            onMouseEnter={handleServicesEnter}
            onMouseLeave={handleServicesLeave}
          >
            Services
            {subMenuOpen && (
              <ul
                className="sub-nav-menu show"
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
              >
                {Object.entries(servicesData).map(([key, service]) => (
                  <li
                    key={key}
                    className="sub-nav-item"
                    onClick={() => handleNavItemClick(`/services/${key}`)}
                  >
                    {service.title}
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className="nav-item locations-link" onClick={() => handleNavItemClick('/locations')}>
            Locations
          </li>

          <li className="nav-item faq-link" onClick={() => handleNavItemClick('/faq')}>
            FAQ
          </li>

          <li className="nav-item aboutus-link" onClick={() => handleNavItemClick('/about-us')}>
            About Us
          </li>

          <li className="nav-item car-rentals-link" onClick={() => handleNavItemClick('/car-rentals')}>
            Car Rentals
          </li>

          <li className="nav-item blog-link" onClick={() => handleNavItemClick('/blogs')}>
            Blog
          </li>

          <li className="nav-item book-appointment" onClick={handleContactClick}>
            Send Us An Email!
          </li>
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;
