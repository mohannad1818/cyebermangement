import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Alahsa Municipality</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMenu} 
          aria-controls="navbarNav" 
          aria-expanded={menuOpen ? "true" : "false"} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/add-controls" onClick={toggleMenu}>إضافة الضوابط</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/compliance-status" onClick={toggleMenu}>حالة الالتزام</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/statistics" onClick={toggleMenu}>عرض الإحصائيات</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin-dashboard" onClick={toggleMenu}>لوحة تحكم المشرف</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#" onClick={toggleMenu}>5</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#" onClick={toggleMenu}>6</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-danger text-white" to="/" onClick={toggleMenu}>تسجيل الخروج</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
