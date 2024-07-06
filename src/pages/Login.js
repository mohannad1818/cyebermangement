import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // التأكد من أن التوجيه موجود فقط هنا
import './Login.css';
import homeIcon from '../assets/images/home.png';

const Login = () => {
  // حالات للمشرف
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // حالات للمستخدم
  const [userUsername, setUserUsername] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const navigate = useNavigate(); // استخدام navigate للتوجيه

  const handleAdminLogin = () => {
    // جلب المستخدمين المخزنين من localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    // البحث عن مستخدم يتطابق مع بيانات المشرف
    const user = storedUsers.find(
      user => user.username === adminUsername && user.password === adminPassword && user.role === 'مشرف'
    );

    if (user) {
      // إذا كانت البيانات صحيحة، التوجيه إلى صفحة /dashboard
      navigate('/dashboard');
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

  const handleHomeRedirect = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <img src={homeIcon} alt="Home" className="home-icon" onClick={handleHomeRedirect} />
      <div className="login-section admin-section">
        <h2>تسجيل دخول المشرف</h2>
        <div className="form-group">
          <label>اسم المستخدم</label>
          <input 
            type="text" 
            value={adminUsername} 
            onChange={(e) => setAdminUsername(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>كلمة المرور</label>
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
        <div className="form-group">
          <label>اسم المستخدم</label>
          <input 
            type="text" 
            value={userUsername} 
            onChange={(e) => setUserUsername(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>كلمة المرور</label>
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
