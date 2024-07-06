import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import logo from '../assets/images/logo.png';
import { ControlsContext } from '../contexts/ControlsContext';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const { controls } = useContext(ControlsContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const statusCounts = {
    complete: controls.complete,
    partial: controls.partial,
    notApplied: controls.notApplied,
  };

  const barData = {
    labels: ['مطبق كلياً', 'مطبق جزئياً', 'غير مطبق'],
    datasets: [
      {
        label: 'عدد الضوابط',
        data: [statusCounts.complete, statusCounts.partial, statusCounts.notApplied],
        backgroundColor: ['green', 'orange', 'red'],
      },
    ],
  };

  const pieData = {
    labels: ['مطبق كلياً', 'مطبق جزئياً', 'غير مطبق'],
    datasets: [
      {
        label: 'نسبة الضوابط',
        data: [statusCounts.complete, statusCounts.partial, statusCounts.notApplied],
        backgroundColor: ['green', 'orange', 'red'],
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: true, position: 'bottom' },
      datalabels: {
        display: true,
        color: 'white',
        font: {
          size: 14,
          weight: 'bold',
        },
        formatter: (value) => {
          return value;
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <img src={logo} alt="Logo" className="dashboard-logo" />
        <div className="top-buttons">
          <Link to="/add-controls" className="nav-button top-button">إضافة الضوابط</Link>
          <Link to="/compliance-status" className="nav-button top-button">حالة الالتزام</Link>
          <Link to="/statistics" className="nav-button top-button">عرض الاحصائيات</Link>
          <Link to="/evaluation" className="nav-button top-button">تقييم</Link>

        </div>
        <button className="hamburger-button" onClick={toggleMenu}>
          &#9776;
        </button>
        {menuOpen && (
          <nav className="dashboard-nav">
            <Link to="/admin-dashboard" className="nav-button">لوحة تحكم المشرف</Link>
            <button className="nav-button">5</button>
            <button className="nav-button">6</button>
            <button className="nav-button" onClick={() => window.location.href = '/'}>تسجيل الخروج</button>
          </nav>
        )}
      </header>
      <div className="dashboard-body">
        <div className="status-box status-complete">
          <h2>مطبق كلياً</h2>
          <p>عدد الضوابط: {controls.complete}</p>
        </div>
        <div className="status-box status-partial">
          <h2>مطبق جزئياً</h2>
          <p>عدد الضوابط: {controls.partial}</p>
        </div>
        <div className="status-box status-not-applied">
          <h2>غير مطبق</h2>
          <p>عدد الضوابط: {controls.notApplied}</p>
        </div>
      </div>
      <div className="charts-container">
        <div className="chart-container">
          <Bar data={barData} options={options} />
        </div>
        <div className="chart-container">
          <Pie data={pieData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
