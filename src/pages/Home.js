import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import background from '../assets/images/Create_a_sophisticated_and_elegant_background_imag.png';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container" style={{ backgroundImage: `url(${background})` }}>
      <header className="home-header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="home-logo" />
        </div>
      </header>
      <div className="home-body">
        <div className="home-box">
          <h1 className="home-title">الإدارة العامة لأمن السيبراني</h1>
        </div>
        <Link to="/login" className="home-link">بوابة الدخول</Link>
      </div>
    </div>
  );
};

export default Home;
