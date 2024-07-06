import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', { username, password });
      if (response.status === 200) {
        navigate('/compliance-status');
      }
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>تسجيل دخول المستخدم</h2>
      <form onSubmit={handleSubmit}>
        <label>اسم المستخدم:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label>كلمة المرور:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p>{error}</p>}
        <button type="submit">دخول</button>
      </form>
    </div>
  );
};

export default LoginUser;
