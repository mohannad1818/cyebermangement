import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  // حالات للمشرف
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // حالات للمستخدم
  const [userUsername, setUserUsername] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const navigate = useNavigate();

  const handleAdminLogin = () => {
    // جلب المستخدمين المخزنين من localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    // البحث عن مستخدم يتطابق مع بيانات المشرف
    const user = storedUsers.find(
      user => user.username === adminUsername && user.password === adminPassword && user.role === 'مشرف'
    );

    if (user) {
      // إذا كانت البيانات صحيحة، التوجيه إلى لوحة تحكم المشرف
      navigate('/admin-dashboard');
    } else {
      // إذا كانت البيانات غير صحيحة، عرض رسالة خطأ
      alert('Invalid credentials');
    }
  };

  const handleUserLogin = () => {
    // جلب المستخدمين المخزنين من localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    // البحث عن مستخدم يتطابق مع بيانات المستخدم
    const user = storedUsers.find(
      user => user.username === userUsername && user.password === userPassword && user.role === 'مستخدم'
    );

    if (user) {
      // إذا كانت البيانات صحيحة، التوجيه إلى صفحة حالة الالتزام
      navigate('/compliance-status');
    } else {
      // إذا كانت البيانات غير صحيحة، عرض رسالة خطأ
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-section admin-section">
        <h2>تسجيل دخول المشرف</h2>
        <div>
          <label>اسم المستخدم:</label>
          <input 
            type="text" 
            value={adminUsername} 
            onChange={(e) => setAdminUsername(e.target.value)} 
          />
        </div>
        <div>
          <label>كلمة المرور:</label>
          <input 
            type="password" 
            value={adminPassword} 
            onChange={(e) => setAdminPassword(e.target.value)} 
          />
        </div>
        <button onClick={handleAdminLogin}>دخول</button>
      </div>

      <div className="login-section user-section">
        <h2>تسجيل دخول المستخدم</h2>
        <div>
          <label>اسم المستخدم:</label>
          <input 
            type="text" 
            value={userUsername} 
            onChange={(e) => setUserUsername(e.target.value)} 
          />
        </div>
        <div>
          <label>كلمة المرور:</label>
          <input 
            type="password" 
            value={userPassword} 
            onChange={(e) => setUserPassword(e.target.value)} 
          />
        </div>
        <button onClick={handleUserLogin}>دخول</button>
      </div>
    </div>
  );
};

export default Login;
