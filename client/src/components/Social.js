import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faSnapchat, faTiktok, faInstagram, faPinterest, faThreads } from '@fortawesome/free-brands-svg-icons';
import './Social.css';

function Social() {
  const iconRefs = useRef([]);
  const [isFacebookClicked, setIsFacebookClicked] = useState(false); // Toggle between Facebook and extra icons
  const facebookContainerRef = useRef(null); // Ref for Facebook icons container

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );
  
    // Only observe icons if the Facebook section is not clicked
    if (!isFacebookClicked) {
      iconRefs.current.forEach((icon) => {
        if (icon) observer.observe(icon);
      });
    }
  
    return () => {
      iconRefs.current.forEach((icon) => {
        if (icon) observer.unobserve(icon);
      });
    };
  }, [isFacebookClicked]); // Re-run this effect when isFacebookClicked changes
  
  
  // Handle clicking outside the Facebook icons
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isFacebookClicked &&
        facebookContainerRef.current &&
        !facebookContainerRef.current.contains(event.target)
      ) {
        setIsFacebookClicked(false); // Reset to original Facebook icon
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFacebookClicked]);

  const handleFacebookClick = () => {
      setIsFacebookClicked(prevState => !prevState); // Toggle between showing and hiding extra icons
  };

  return (
    <div className="social-media">
      <hr className="underline" />

      <h2 className="social-media-title">Connect With Us</h2>
      <div className="social-icons" ref={facebookContainerRef}>
        {/* Main Facebook icon */}
        <a
          className="social-icon facebook"
          ref={(el) => (iconRefs.current[0] = el)}
          onClick={handleFacebookClick} // Show/hide additional icons when clicked
          key="facebook-main" // Add key here
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>

        {/* Conditionally render the second and third icons based on click */}
        {isFacebookClicked && (
          <>
            <a
              href="https://www.facebook.com/BCBCarts/about"
              className="social-icon facebook"
              style={{ opacity: '1', fontSize: '1.5em', color: '#1877F2', alignSelf: 'center' }}
              key="facebook-long-beach"
            >
              <FontAwesomeIcon icon={faFacebook} /> Long Beach, CA
            </a>
            <a
              href="https://www.facebook.com/profile.php/?id=61550530888896"
              className="social-icon facebook"
              style={{ opacity: '1', fontSize: '1.5em', color: '#1877F2', alignSelf: 'center' }}
              key="facebook-griffin"
            >
              <FontAwesomeIcon icon={faFacebook} /> Griffin, GA
            </a>
          </>
        )}

        {/* Other social icons, shown only when Facebook is not clicked */}
        {!isFacebookClicked && (
          <>
            <a
              href="https://snapchat.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon snapchat"
              ref={(el) => (iconRefs.current[1] = el)}
              key="snapchat"
            >
              <FontAwesomeIcon icon={faSnapchat} />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon tiktok"
              ref={(el) => (iconRefs.current[2] = el)}
              key="tiktok"
            >
              <FontAwesomeIcon icon={faTiktok} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon instagram"
              ref={(el) => (iconRefs.current[3] = el)}
              key="instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon pinterest"
              ref={(el) => (iconRefs.current[4] = el)}
              key="pinterest"
            >
              <FontAwesomeIcon icon={faPinterest} />
            </a>
            <a
              href="https://threads.net"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon threads"
              ref={(el) => (iconRefs.current[5] = el)}
              key="threads"
            >
              <FontAwesomeIcon icon={faThreads} />
            </a>
          </>
        )}
      </div>

      <hr className="underline" />

      <div className="contact-info">
        <a
          href="mailto:mebcb@yahoo.com"
          className="contact-button email-button"
        >
          Email Us
        </a>
        <a
          href="tel:+13233333471"
          className="contact-button phone-button"
        >
          Call Long Beach, CA
        </a>
        <a
          href="tel:+13233333471"
          className="contact-button phone-button"
        >
          Call Griffin, GA
        </a>
      </div>
      
      <div className="footer-info">
        <p className="copyright">© 2024 BCB Carts</p>
        <div className="divider"></div>
        <p className="powered-by">Powered by James Lagattuta</p>
      </div>
    </div>
  );
}

export default Social;
