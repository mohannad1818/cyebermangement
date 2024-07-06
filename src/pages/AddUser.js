import React, { useState } from 'react';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('مستخدم'); // افتراضيا، إضافة المستخدم يكون للدور "مستخدم"

  const handleAddUser = () => {
    const newUser = { username, password, role };
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));
    alert('تمت إضافة المستخدم بنجاح');
  };

  return (
    <div>
      <h2>إضافة مستخدم جديد</h2>
      <div>
        <label>اسم المستخدم:</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>
      <div>
        <label>كلمة المرور:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      <div>
        <label>الدور:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="مستخدم">مستخدم</option>
          <option value="مشرف">مشرف</option>
        </select>
      </div>
      <button onClick={handleAddUser}>إضافة</button>
    </div>
  );
};

export default AddUser;
