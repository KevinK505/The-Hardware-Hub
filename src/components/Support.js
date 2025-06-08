import React from 'react';
import './Support.css';

const Support = () => {
  return (
    <div className="support-page">
      <h1>Support</h1>
      <p className="intro">
        Need help? We're here for you. Check out our FAQs below or contact us directly.
      </p>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <ul>
          <li><strong>How do I borrow a tool?</strong> Browse tools on the map, click the tool, then request to borrow it.</li>
          <li><strong>How can I list my tools?</strong> Use the “List a Tool” option in the navigation bar.</li>
          <li><strong>Is this service free?</strong> Yes, The Hardware Hub is free to use.</li>
        </ul>
      </div>

      <div className="contact-section">
        <h2>Contact Us</h2>
        <p>Email: <a href="mailto:support@hardwarehub.com">support@hardwarehub.com</a></p>
        <p>Phone: +1 (800) 123‑4567</p>
      </div>

      <div className="form-section">
        <h2>Submit a Support Request</h2>
        <form>
          <label>Name</label>
          <input type="text" placeholder="Your name" />

          <label>Email</label>
          <input type="email" placeholder="Your email" />

          <label>Message</label>
          <textarea rows="5" placeholder="Describe your issue..."></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Support;
