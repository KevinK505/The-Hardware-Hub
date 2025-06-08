// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './components/Navbar.css';

import ToolListingForm from './components/ToolListingForm';
import ToolListing from './components/ToolListing';
import MyRequests from './components/MyRequests';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import Auth from './components/Auth';
import MapComponent from './components/MapComponent';
import FavoritesList from './components/FavoritesList';
import Chat from './components/Chat';
import ToolImageUpload from './components/ToolImageUpload';
import ToolRentalForm from './components/ToolRentalForm';
import ToolUploadForm from './components/ToolUploadForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import UserContext from './UserContext';

// ✅ NEW: Import the About and Support pages
import About from './components/About';
import Support from './components/Support'; 

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        {!user ? (
          <>
            <h1>The Hardware Hub – Find Tools Near You</h1>
            <Auth onAuthSuccess={setUser} />
          </>
        ) : (
          <UserContext.Provider value={{ user }}>
            <Navbar />
            <h1 id="home">The Hardware Hub – Find Tools Near You</h1>
            <p>Welcome, {user.email}!</p>

            <Routes>
              <Route path="/" element={<h2>Welcome to The Hardware Hub!</h2>} />
              <Route path="/map" element={<MapComponent />} />
              <Route path="/favorites" element={<FavoritesList />} />
              <Route path="/chat" element={<Chat user={user} />} />
              <Route path="/profile" element={<Profile user={user} />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/tool-listing" element={<ToolListing />} />
              <Route path="/my-requests" element={<MyRequests />} />
              <Route path="/tool-rental" element={<ToolRentalForm />} />
              <Route path="/upload" element={<ToolImageUpload />} />
              <Route path="/tool-listing-form" element={<ToolListingForm />} />
              <Route path="/add-tool" element={<ToolUploadForm />} />

              {/* ✅ NEW: About and Support page routes */}
              <Route path="/about" element={<About />} />
              <Route path="/support" element={<Support />} />
            </Routes>

            <Footer />
          </UserContext.Provider>
        )}
      </div>
    </Router>
  );
}

export default App;
