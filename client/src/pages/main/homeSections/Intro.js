import React, { useState, useEffect } from 'react';
import './Intro.css';

const images = [
  'https://i.imgur.com/HDAlZ7d.jpeg',
  'https://i.imgur.com/fiqweb3.jpeg',
  'https://i.imgur.com/dRbhXia.jpeg',
  'https://i.imgur.com/7K3Uz6A.jpeg',
  'https://i.imgur.com/bRqbId5.jpeg'
];

const Intro = ({ scrollToContact }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Switches images every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-section">
      <div className="hero-overlay">
        <div className="hero-text">
          <h1>Welcome to BCB Carts!</h1>
          <p>Your Trusted Partner in Leisure-Filled Electric Vehicles</p>
          <button className="hero-button" onClick={scrollToContact}>Contact Us</button>
        </div>
      </div>
      <div className="hero-image-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Slideshow"
            className={`hero-image ${index === currentImage ? 'fade-in' : 'fade-out'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Intro;
