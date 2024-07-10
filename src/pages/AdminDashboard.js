// src/pages/AdminDashboard.js
import React, { useState } from 'react';
import { addData } from '../FirestoreService';

const AdminDashboard = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('مستخدم'); // "مستخدم" أو "مشرف"

  const handleAddUser = async () => {
    const collectionName = role === 'مشرف' ? 'admins' : 'users';
    const newUser = { username: name, password, role };
    await addData(collectionName, newUser);
    setName('');
    setPassword('');
    alert(`تم إضافة ${role} بنجاح`);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="مستخدم">User</option>
        <option value="مشرف">Admin</option>
      </select>
      <button onClick={handleAddUser}>Add User/Admin</button>
    </div>
  );
};

export default AdminDashboard;
