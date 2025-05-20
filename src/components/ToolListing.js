// src/components/ToolListing.js
import React, { useEffect, useState, useContext } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import './ToolListing.css';
import UserContext from '../UserContext';

const ToolListing = () => {
  const [tools, setTools] = useState([]);
  const { user } = useContext(UserContext); // ✅ Access logged-in user

  useEffect(() => {
    const fetchTools = async () => {
      const querySnapshot = await getDocs(collection(db, 'rentalTools'));
      const toolList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTools(toolList);
    };

    fetchTools();
  }, []);

  const handleRequest = async (tool) => {
    try {
      await addDoc(collection(db, 'toolRequests'), {
        toolId: tool.id,
        name: tool.name,
        requesterEmail: user?.email || 'unknown', // ✅ Use authenticated user's email
        timestamp: new Date()
      });
      alert(`Requested ${tool.name} successfully!`);
    } catch (error) {
      console.error('Error requesting tool:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="tool-listing">
      <h2>Available Tools for Rent/Borrow</h2>
      <ul>
        {tools.map(tool => (
          <li key={tool.id}>
            <strong>{tool.name}</strong>
            <em>{tool.address}</em>
            <em>Rating: {tool.averageRating || 'N/A'}</em>
            <em>Available: {tool.available ? 'Yes' : 'No'}</em>
            <button onClick={() => handleRequest(tool)}>Request Tool</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToolListing;
