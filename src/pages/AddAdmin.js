import React, { useState } from 'react';
import axios from 'axios';
import './AddAdmin.css';
import { getEncryptedData } from '../utils/encryption'; // استيراد دوال التشفير

const AddAdmin = () => {
  const [username, setUsername] = useState('');//hgnhg.nd;
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users', {// ابوحسن 
        username,
        password,
        role: 'admin',
      });
      setMessage('Admin added successfully');
      setUsername('');
      setPassword('');
      setError('');
    } catch (error) {
      setError('Error adding admin');
      setMessage('');
    }
  };

  return (
    <div className="add-admin-container">
      <h2>إضافة مشرف جديد</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">إضافة المشرف</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddAdmin;
