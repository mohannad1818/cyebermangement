import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginAdmin.css';

const LoginAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('مشرف');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // استرجاع المستخدمين المخزنين في localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // التحقق من صحة بيانات الدخول
    const user = users.find(user => user.username === username && user.password === password && user.role === role);

    if (user) {
      if (role === 'مشرف') {
        navigate('/admin-dashboard');
      } else if (role === 'مستخدم') {
        navigate('/compliance-status');
      }
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-admin-container">
      <h2>تسجيل الدخول</h2>
      <div className="login-form">
        <label>اسم المستخدم:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>كلمة المرور:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>الدور:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="مشرف">مشرف</option>
          <option value="مستخدم">مستخدم</option>
        </select>
        <button onClick={handleLogin}>دخول</button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default LoginAdmin;
