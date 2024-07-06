import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <img src={logo} alt="Logo" className="home-logo" />
      </header>
      <div className="home-body">
        <div className="home-box">
          <h1>الإدارة العامة لأمن السيبراني</h1>
          <Link to="/login" className="home-link">بوابة الخدمة</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
