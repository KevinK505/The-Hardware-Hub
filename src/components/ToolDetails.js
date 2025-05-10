// src/components/ToolDetails.js
import React, { useState } from 'react';
import './ToolDetails.css';

function ToolDetails({ tool, onRate }) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [availability, setAvailability] = useState(tool.available);

  const handleRating = (rating) => {
    setSelectedRating(rating);
    onRate(tool.id, rating); // Callback to update rating in Firebase later
  };

  const toggleAvailability = () => {
    const newStatus = !availability;
    setAvailability(newStatus);
    // Save to Firebase later
  };

  return (
    <div className="tool-details">
      <h3>{tool.name}</h3>
      <p>Status: <strong>{availability ? "✅ Available" : "❌ Out of Stock"}</strong></p>
      <button onClick={toggleAvailability}>
        {availability ? "Mark as Out of Stock" : "Mark as Available"}
      </button>

      <div className="rating">
        <p>Rate this tool/shop:</p>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRating(star)}
            style={{ cursor: 'pointer', color: selectedRating >= star ? '#ffc107' : '#ccc' }}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}

export default ToolDetails;
