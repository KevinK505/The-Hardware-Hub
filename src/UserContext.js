// src/UserContext.js
import React, { createContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Provider component to wrap around the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User object after login
  const [experienceLevel, setExperienceLevel] = useState('Beginner'); // Default level

  return (
    <UserContext.Provider value={{ user, setUser, experienceLevel, setExperienceLevel }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
