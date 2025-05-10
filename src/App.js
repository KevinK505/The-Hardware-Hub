// src/App.js
import FavoritesList from './components/FavoritesList'; 
import React, { useState } from 'react';
import './App.css';
import Auth from './components/Auth';
import MapComponent from './components/MapComponent';
import UserContext from './UserContext';
import Chat from './components/Chat';
import Experience from './components/Experience';
import ExperienceSelector from './components/ExperienceSelector';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <h1>The Hardware Hub – Find Tools Near You</h1>

      {!user ? (
        <Auth onAuthSuccess={setUser} />
      ) : (
        <>
          <p>Welcome, {user.email}!</p>
          <ExperienceSelector /> {/* 👈 Experience level dropdown added here */}
          <Experience user={user} />
          <MapComponent />
          <FavoritesList />
          <Chat user={user} />
        </>
      )}
    </div>
  );
}

export default App;
