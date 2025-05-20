import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import './ToolUploadForm.css';

function ToolUploadForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    latitude: '',
    longitude: '',
    level: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, address, latitude, longitude, level } = formData;

    if (!name || !latitude || !longitude) {
      alert('Please enter required fields!');
      return;
    }

    try {
      await addDoc(collection(db, 'rentalTools'), {
        name,
        description,
        address,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        level,
        createdAt: new Date(),
      });
      alert('Tool uploaded successfully!');
      setFormData({
        name: '',
        description: '',
        address: '',
        latitude: '',
        longitude: '',
        level: '',
      });
    } catch (err) {
      console.error(err);
      alert('Failed to upload tool.');
    }
  };

  return (
    <div className="tool-upload-form">
      <h2>Upload a Tool</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Tool Name *" value={formData.name} onChange={handleChange} />
        <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        <input name="latitude" placeholder="Latitude *" value={formData.latitude} onChange={handleChange} />
        <input name="longitude" placeholder="Longitude *" value={formData.longitude} onChange={handleChange} />
        <input name="level" placeholder="Experience Level (Beginner/Advanced)" value={formData.level} onChange={handleChange} />
        <button type="submit">Upload Tool</button>
      </form>
    </div>
  );
}

export default ToolUploadForm;
