// src/FirestoreService.js
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { db } from './firebaseConfig';

const addData = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const getData = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const findUser = async (collectionName, username, password, role) => {
  const q = query(collection(db, collectionName), where("username", "==", username), where("password", "==", password), where("role", "==", role));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return null;
  } else {
    return querySnapshot.docs[0].data();
  }
};

const getAdmins = async () => {
  const q = query(collection(db, 'admins'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const getUsers = async () => {
  const q = query(collection(db, 'users'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export { addData, getData, findUser, getAdmins, getUsers };
