import React, { useState } from 'react';

function ExperienceSelector() {
  const [experienceLevel, setExperienceLevel] = useState('');

  const handleChange = (e) => {
    const level = e.target.value;
    setExperienceLevel(level);
    console.log('Selected experience level:', level);
    // Optional: save to localStorage or Firestore here
  };

  return (
    <div className="experience-selector">
      <label htmlFor="experience">🔧 Select Your Experience Level:</label>
      <select id="experience" value={experienceLevel} onChange={handleChange}>
        <option value="">-- Select --</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="pro">Pro</option>
      </select>
    </div>
  );
}

export default ExperienceSelector;
