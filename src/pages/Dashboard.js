import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import logo from '../assets/images/logo.png';
import { getEncryptedData } from '../utils/encryption'; // استيراد دوال التشفير
const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <img src={logo} alt="Logo" className="dashboard-logo" />
        <button className="hamburger-button" onClick={toggleMenu}>
          &#9776;
        </button>
        <nav className={`dashboard-nav ${menuOpen ? 'open' : ''}`}>
          <Link to="/admin-dashboard" className="nav-button">لوحة تحكم المشرف</Link>
          <Link to="/admin-user-view" className="nav-button">عرض المستخدمين</Link>
          <button className="nav-button logout-button" onClick={() => window.location.href = '/'}>
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </nav>
      </aside>
      <div className="dashboard-body">
        <Link to="/add-controls" className="card">
          <div className="card-content">إضافة الضوابط</div>
        </Link>
        <Link to="/compliance-status" className="card">
          <div className="card-content">حالة الالتزام</div>
        </Link>
        <Link to="/statistics" className="card">
          <div className="card-content">عرض الاحصائيات</div>
        </Link>
        <Link to="/evaluation" className="card">
          <div className="card-content">تقييم</div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
