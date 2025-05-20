import React, { useState, useContext } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import UserContext from '../UserContext';

function ToolRentalForm() {
  const { user } = useContext(UserContext);
  const [toolName, setToolName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('rent');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!toolName || !description) return alert('Please fill out all fields.');

    try {
      await addDoc(collection(db, 'rentalTools'), {
        toolName,
        description,
        type,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });

      alert('Tool listed successfully!');
      setToolName('');
      setDescription('');
      setType('rent');
    } catch (error) {
      console.error('Error listing tool:', error);
      alert('Error adding tool.');
    }
  };

  return (
    <div className="tool-form-container">
      <h2>List a Tool for Rent or Borrow</h2>
      <form onSubmit={handleSubmit} className="tool-form">
        <input
          type="text"
          placeholder="Tool Name"
          value={toolName}
          onChange={(e) => setToolName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="rent">Rent</option>
          <option value="borrow">Borrow</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ToolRentalForm;
