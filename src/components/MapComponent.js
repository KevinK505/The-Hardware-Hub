// src/components/MapComponent.js
import React, { useEffect, useState, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { db } from '../firebase/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import UserContext from '../UserContext';
import './MapComponent.css';

// Fix leaflet marker icon path issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapComponent() {
  const { user } = useContext(UserContext);
  const [tools, setTools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTools, setFilteredTools] = useState([]);

  useEffect(() => {
    const fetchTools = async () => {
      const snapshot = await getDocs(collection(db, 'rentalTools'));
      const toolsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched tools:", toolsData);
      setTools(toolsData);
      setFilteredTools(toolsData);
    };
    fetchTools();
  }, []);

  const filterTools = (term) => {
    if (!term) {
      setFilteredTools(tools);
      return;
    }

    const filtered = tools.filter(tool =>
      tool.name?.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTools(filtered);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      filterTools(searchTerm);
    }
  };

  const handleManualSearch = () => {
    filterTools(searchTerm);
  };

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
        lat: tool.latitude,
        lng: tool.longitude,
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
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search tool (e.g., Hammer)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
        />
        <button onClick={handleManualSearch}>Search</button>
      </div>

      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '500px', marginTop: '10px' }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredTools.map((tool, idx) => {
          const lat = tool.latitude || tool.location?.lat;
          const lng = tool.longitude || tool.location?.lng;

          return (
            lat && lng && (
              <Marker key={idx} position={[lat, lng]}>
                <Popup>
                  <div>
                    <strong>🛠️ {tool.name}</strong><br />
                    📍 {tool.address || 'No address'}<br />
                    👤 For: {tool.level || 'All levels'}<br />
                    <button onClick={() => handleSaveToFavorites(tool)} style={{ marginTop: '5px' }}>
                      ❤️ Save to Favorites
                    </button>
                  </div>
                </Popup>
              </Marker>
            )
          );
        })}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
