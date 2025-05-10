// src/components/ExperienceSelector.js
import React, { useContext } from 'react';
import UserContext from '../UserContext';

const ExperienceSelector = () => {
  const { experienceLevel, setExperienceLevel } = useContext(UserContext);

  return (
    <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
      <h3>Select Your Experience Level:</h3>
      <select
        value={experienceLevel}
        onChange={(e) => setExperienceLevel(e.target.value)}
        style={{ padding: '8px', fontSize: '16px', borderRadius: '5px' }}
      >
        <option value="Beginner">🧰 Beginner</option>
        <option value="Intermediate">🔧 Intermediate</option>
        <option value="Expert">⚙️ Expert</option>
      </select>
    </div>
  );
};

export default ExperienceSelector;
