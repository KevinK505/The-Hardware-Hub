import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <h1>About The Hardware Hub</h1>
      <p>
        The Hardware Hub is your one-stop platform to find tools in your city,
        connect with local tool renters and DIYers, and stay involved in the community.
        Whether you're a professional or just someone who loves fixing things,
        we've built this space for you.
      </p>
      <h2>Follow Us</h2>
      <div className="social-icons">
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/3670/3670211.png" alt="X/Twitter" />
        </a>
      </div>
    </div>
  );
}

export default About;
