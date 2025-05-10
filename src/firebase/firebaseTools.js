// src/firebase/firebaseTools.js
import { db } from './firebase'; // your initialized Firebase
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
} from 'firebase/firestore';

const toolsRef = collection(db, 'tools');

// Fetch all tools
export const fetchTools = async () => {
  const snapshot = await getDocs(toolsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Update tool rating
export const updateToolRating = async (toolId, newRating) => {
  const toolDoc = doc(db, 'tools', toolId);
  await updateDoc(toolDoc, { averageRating: newRating });
};

// Update availability
export const updateAvailability = async (toolId, available) => {
  const toolDoc = doc(db, 'tools', toolId);
  await updateDoc(toolDoc, { available });
};

// Add a tool (only needed once to insert initial tools)
export const addTool = async (tool) => {
  await addDoc(toolsRef, tool);
};
