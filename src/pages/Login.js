import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findUser } from '../FirestoreService';
import './Login.css';
import userIcon from '../assets/images/user-icon.png'; // افترض أن أيقونات المستخدم والمشرف موجودة في مجلد الصور
import adminIcon from '../assets/images/admin-icon.png'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('مشرف');

  const navigate = useNavigate();

  const handleLogin = async () => {
    const collection = userType === 'مشرف' ? 'admins' : 'users';
    const user = await findUser(collection, username, password, userType);
    if (user) {
      navigate(userType === 'مشرف' ? '/dashboard' : '/compliance-status');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-section">
        <div className="icon-container">
          <img src={userType === 'مشرف' ? adminIcon : userIcon} alt="User Icon" className="user-icon" />
        </div>
        <div className="form-group">
          <label>اسم المستخدم</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            dir="rtl" 
          />
        </div>
        <div className="form-group">
          <label>كلمة المرور</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            dir="rtl" 
          />
        </div>
        <div className="button-group">
          <button className={`user-type-button ${userType === 'مشرف' ? 'active' : ''}`} onClick={() => setUserType('مشرف')}>
            <img src={adminIcon} alt="Admin" />
            مشرف
          </button>
          <button className={`user-type-button ${userType === 'مستخدم' ? 'active' : ''}`} onClick={() => setUserType('مستخدم')}>
            <img src={userIcon} alt="User" />
            مستخدم
          </button>
        </div>
        <button onClick={handleLogin} className="login-button">
          تسجيل دخول
        </button>
      </div>
    </div>
  );
};

export default Login;
