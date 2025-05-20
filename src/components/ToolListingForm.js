import React, { useState, useContext } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import UserContext from '../UserContext';

function ToolListingForm() {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    available: true,
    lat: '',
    lng: '',
    address: '',
    contact: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'rentalTools'), {
        ...formData,
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng),
        userId: user.uid,
        timestamp: new Date()
      });
      alert('Tool listed successfully!');
      setFormData({ name: '', description: '', available: true, lat: '', lng: '', address: '', contact: '' });
    } catch (err) {
      console.error('Error adding tool:', err);
      alert('Error listing tool. Check console for details.');
    }
  };

  return (
    <div className="tool-form-container">
      <h2>📦 List a Tool for Rent or Borrow</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Tool Name" value={formData.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Tool Description" value={formData.description} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Shop or Pickup Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact Info (Phone/Email)" value={formData.contact} onChange={handleChange} required />
        <input type="number" name="lat" placeholder="Latitude" value={formData.lat} onChange={handleChange} required />
        <input type="number" name="lng" placeholder="Longitude" value={formData.lng} onChange={handleChange} required />
        <button type="submit">List Tool</button>
      </form>
    </div>
  );
}

export default ToolListingForm;
