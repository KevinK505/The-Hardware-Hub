// src/components/MapComponent.js
import React, { useEffect, useState, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { db } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import UserContext from '../UserContext';

// 🛠 Mock tools with experience levels
const mockTools = [
  {
    id: 1,
    name: 'Hammer',
    lat: 12.9716,
    lng: 77.5946,
    address: 'Hardware Shop 1, MG Road',
    level: 'Beginner',
  },
  {
    id: 2,
    name: 'Drill',
    lat: 12.9738,
    lng: 77.5993,
    address: 'Tool World, Church Street',
    level: 'Intermediate',
  },
  {
    id: 3,
    name: 'Wrench',
    lat: 12.9698,
    lng: 77.5915,
    address: 'FixIt Store, Brigade Road',
    level: 'Expert',
  },
  {
    id: 4,
    name: 'Paint Brush',
    lat: 12.9666,
    lng: 77.5872,
    address: 'Color Pro, Indiranagar',
    level: 'Beginner',
  }
];

function MapComponent() {
  const { user, experienceLevel } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTools, setFilteredTools] = useState([]);

  // Filter tools by search term and experience level
  useEffect(() => {
    const toolsForLevel = mockTools.filter(tool => tool.level === experienceLevel);
    if (searchTerm === '') {
      setFilteredTools(toolsForLevel);
    } else {
      const results = toolsForLevel.filter((tool) =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTools(results);
    }
  }, [searchTerm, experienceLevel]);

  // Save to Firestore favorites
  const handleSaveToFavorites = async (tool) => {
    if (!user) {
      alert('Please log in to save favorites!');
      return;
    }

    try {
      await addDoc(collection(db, 'favorites'), {
        uid: user.uid,
        name: tool.name,
        address: tool.address,
        lat: tool.lat,
        lng: tool.lng,
        savedAt: new Date()
      });
      alert(`${tool.name} saved to favorites!`);
    } catch (error) {
      console.error("Error saving to favorites: ", error);
    }
  };

  return (
    <div className="map-container">
      <h2>Find Tools Near You</h2>
      <input
        type="text"
        placeholder="Search tool (e.g., Hammer)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <MapContainer center={[12.9716, 77.5946]} zoom={14} style={{ height: '400px', marginTop: '10px' }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredTools.map((tool) => (
          <Marker key={tool.id} position={[tool.lat, tool.lng]}>
            <Popup>
              <div>
                <strong>🛠️ {tool.name}</strong><br />
                📍 {tool.address}<br />
                👤 For: {tool.level}<br />
                <button onClick={() => handleSaveToFavorites(tool)} style={{ marginTop: '5px' }}>
                  ❤️ Save to Favorites
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
