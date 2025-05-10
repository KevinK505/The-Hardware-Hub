// src/components/FavoritesList.js
import React, { useEffect, useState, useContext } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import UserContext from '../UserContext';

function FavoritesList() {
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    if (!user) return;

    const q = query(collection(db, 'favorites'), where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);
    const favs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setFavorites(favs);
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const handleRemove = async (favId) => {
    try {
      await deleteDoc(doc(db, 'favorites', favId));
      alert('Removed from favorites');
      fetchFavorites(); // Refresh list after deletion
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h3>❤️ Your Favorite Tools</h3>
      {favorites.length === 0 ? (
        <p>No saved tools yet.</p>
      ) : (
        <ul>
          {favorites.map((tool) => (
            <li key={tool.id}>
              🛠️ <strong>{tool.name}</strong> – {tool.address}
              <button 
                onClick={() => handleRemove(tool.id)} 
                style={{ marginLeft: '10px', backgroundColor: '#f44336', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px' }}
              >
                ❌ Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoritesList;
