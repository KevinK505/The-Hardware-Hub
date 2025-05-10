// src/components/Experience.js
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, get } from 'firebase/database';

function Experience({ user }) {
  const db = getDatabase();
  const [level, setLevel] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const userRef = ref(db, 'users/' + user.uid + '/experience');
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        setLevel(snapshot.val());
        setSaved(true);
      }
    });
  }, [user]);

  const saveExperience = () => {
    if (!level) return;
    const userRef = ref(db, 'users/' + user.uid + '/experience');
    set(userRef, level).then(() => setSaved(true));
  };

  return (
    <div style={{ margin: '20px auto' }}>
  <h2>Select Your Experience Level</h2>
  <select value={level} onChange={(e) => setLevel(e.target.value)}>
    <option value="">-- Choose --</option>
    <option value="Beginner">Beginner</option>
    <option value="Intermediate">Intermediate</option>
    <option value="Pro">Pro</option>
  </select>
  <br />
  <button onClick={saveExperience}>Save</button>
  {saved && <p>Saved as: <strong>{level}</strong></p>}
</div>

  );
}

export default Experience;
