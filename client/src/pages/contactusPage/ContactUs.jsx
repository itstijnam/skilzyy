import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./ContactUs.css";

function ContactUs() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <p>We're here to help! Reach out to us using the information below.</p>

      <div className="contact-info">
        <div className="info-item">
          <span className="info-label">Us:</span>
          <span className="info-value">Skilzyy</span>
        </div>

        <div className="info-item">
          <span className="info-label">Email:</span>
          <span className="info-value">getfreelancerconnect@gmail.com</span>
        </div>
      </div>

      {/* Go Back Button */}
      <button className="go-back-btn" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  );
}

export default ContactUs;