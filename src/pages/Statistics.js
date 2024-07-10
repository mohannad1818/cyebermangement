import React, { useEffect, useState } from 'react';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import './Statistics.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // استيراد الأيقونة
import { getEncryptedData } from '../utils/encryption'; // استيراد دوال التشفير
const Statistics = () => {
  const [rules, setRules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedRules = JSON.parse(localStorage.getItem('rules'));
    if (savedRules) {
      setRules(savedRules);
    }
  }, []);

  const statusCounts = rules.reduce(
    (counts, rule) => {
      if (rule.status === 'مطبق كلياً') {
        counts.complete += 1;
      } else if (rule.status === 'مطبق جزئياً') {
        counts.partial += 1;
      } else if (rule.status === 'غير مطبق') {
        counts.notApplied += 1;
      }
      return counts;
    },
    { complete: 0, partial: 0, notApplied: 0 }
  );

  const departmentCounts = rules.reduce((counts, rule) => {
    if (rule.department) {
      counts[rule.department] = (counts[rule.department] || 0) + 1;
    }
    return counts;
  }, {});

  const totalRules = rules.length;
  const completePercentage = totalRules > 0 ? (statusCounts.complete / totalRules) * 100 : 0;

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

  const doughnutData = {
    labels: ['مطبق كلياً بنسبة 100%', 'البقية'],
    datasets: [
      {
        label: 'نسبة الضوابط المطبقة بنسبة 100%',
        data: [completePercentage, 100 - completePercentage],
        backgroundColor: ['green', '#ccc'],
      },
    ],
  };

  const departmentData = {
    labels: Object.keys(departmentCounts),
    datasets: [
      {
        label: 'عدد الضوابط حسب الإدارة',
        data: Object.values(departmentCounts),
        backgroundColor: ['#007bff', '#ffc107', '#28a745', '#17a2b8', '#6f42c1', '#e83e8c', '#fd7e14'],
      },
    ],
  };

  const departmentPieData = {
    labels: Object.keys(departmentCounts),
    datasets: [
      {
        label: 'نسبة الضوابط حسب الإدارة',
        data: Object.values(departmentCounts),
        backgroundColor: ['#007bff', '#ffc107', '#28a745', '#17a2b8', '#6f42c1', '#e83e8c', '#fd7e14'],
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
          weight: 'bold'
        },
        formatter: (value) => `${value}%`,
      }
    },
    maintainAspectRatio: false,
  };

  const handleNavigate = () => {
    navigate('/statistics-detail'); // التنقل إلى صفحة الإحصائيات الجديدة
  };

  const handleBackClick = () => {
    navigate('/dashboard'); // التوجيه إلى صفحة dashboard عند النقر على الأيقونة
  };

  return (
    <div className="statistics-container">
      <div className="back-icon" onClick={handleBackClick}>
        <FaArrowLeft size={30} />
      </div>
      <h1>لوحة المعلومات</h1>
      <div className="section">
        <button className="section-header" onClick={handleNavigate}>إحصائية الحالة</button>
        <div className="charts-grid">
          <div className="chart-wrapper">
            <div className="chart-header">عدد الضوابط</div>
            <div className="chart-container">
              <Bar data={barData} options={options} />
            </div>
          </div>
          <div className="chart-wrapper">
            <div className="chart-header">نسبة الضوابط</div>
            <div className="chart-container">
              <Pie data={pieData} options={options} />
            </div>
          </div>
        </div>
      </div>
      <div className="separator"></div>
      <div className="section">
        <button className="section-header">الضوابط المطبقة</button>
        <div className="chart-wrapper full-width">
          <div className="chart-header">نسبة الضوابط المطبقة بنسبة 100%</div>
          <div className="chart-container">
            <Doughnut data={doughnutData} options={options} />
          </div>
        </div>
      </div>
      <div className="separator"></div>
      <div className="section">
        <button className="section-header">إحصائية الإدارات</button>
        <div className="charts-grid">
          <div className="chart-wrapper">
            <div className="chart-header">عدد الضوابط حسب الإدارة</div>
            <div className="chart-container">
              <Bar data={departmentData} options={options} />
            </div>
          </div>
          <div className="chart-wrapper">
            <div className="chart-header">نسبة الضوابط حسب الإدارة</div>
            <div className="chart-container">
              <Pie data={departmentPieData} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
