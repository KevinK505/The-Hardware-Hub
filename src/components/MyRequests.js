// src/components/MyRequests.js
import React, { useEffect, useState, useContext } from 'react';
import { db } from '../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import UserContext from '../UserContext';
import './MyRequests.css';

const MyRequests = () => {
  const { user } = useContext(UserContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user) return;
      const q = query(
        collection(db, 'toolRequests'),
        where('requesterEmail', '==', user.email)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(data);
    };

    fetchRequests();
  }, [user]);

  return (
    <div className="my-requests">
      <h2>My Tool Requests</h2>
      {requests.length === 0 ? (
        <p>No requests made yet.</p>
      ) : (
        <ul>
          {requests.map(req => (
            <li key={req.id}>
              <strong>{req.name}</strong> – Requested on{' '}
              {req.timestamp?.toDate().toLocaleString() || 'N/A'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyRequests;
