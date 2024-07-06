import React, { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('مستخدم');

  const handleAddUser = () => {
    const newUser = { username, password, role };
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));
    alert('تمت إضافة المستخدم بنجاح!');
    setUsername('');
    setPassword('');
    setRole('مستخدم');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">لوحة تحكم المشرف</h2>
      <div className="card">
        <div className="card-header">
          إضافة مستخدم جديد
        </div>
        <div className="card-body">
          <div className="form-group mb-3">
            <label>اسم المستخدم:</label>
            <input 
              type="text" 
              className="form-control" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>
          <div className="form-group mb-3">
            <label>كلمة المرور:</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <div className="form-group mb-3">
            <label>الدور:</label>
            <select 
              className="form-control" 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="مستخدم">مستخدم</option>
              <option value="مشرف">مشرف</option>
            </select>
          </div>
          <button onClick={handleAddUser} className="btn btn-primary">إضافة</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
