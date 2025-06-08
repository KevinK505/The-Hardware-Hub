import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/map">Map</Link></li>
        <li><Link to="/add-tool">Add Tool</Link></li>
        <li><Link to="/tool-listing">Tool Listing</Link></li>
        <li><Link to="/favorites">Favorites</Link></li>
        <li><Link to="/chat">Chat</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/support">Support</Link></li>
        <li><Link to="/profile" aria-label="User Profile">👤</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
