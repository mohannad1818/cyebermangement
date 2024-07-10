import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './StatisticsDetail.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // استيراد الأيقونة
import { getEncryptedData } from '../utils/encryption'; // استيراد دوال التشفير
const StatisticsDetail = () => {
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

  const totalRules = statusCounts.complete + statusCounts.partial + statusCounts.notApplied;
  const completePercentage = totalRules > 0 ? (statusCounts.complete / totalRules) * 100 : 0;
  const partialPercentage = totalRules > 0 ? (statusCounts.partial / totalRules) * 100 : 0;
  const notAppliedPercentage = totalRules > 0 ? (statusCounts.notApplied / totalRules) * 100 : 0;

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
          weight: 'bold'
        },
        formatter: (value) => {
          return value;
        }
      }
    },
    maintainAspectRatio: false,
  };

  const handleBackClick = () => {
    navigate('/dashboard'); // التوجيه إلى صفحة dashboard عند النقر على الأيقونة
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="statistics-container">
      <div className="back-icon" onClick={handleBackClick}>
        <FaArrowLeft size={30} />
      </div>
      <div className="status-boxes">
        <div className="status-box status-complete">
          <h2>مطبق كلياً</h2>
          <p>عدد الضوابط: {statusCounts.complete}</p>
        </div>
        <div className="status-box status-partial">
          <h2>مطبق جزئياً</h2>
          <p>عدد الضوابط: {statusCounts.partial}</p>
        </div>
        <div className="status-box status-not-applied">
          <h2>غير مطبق</h2>
          <p>عدد الضوابط: {statusCounts.notApplied}</p>
        </div>
      </div>
      <div className="charts-container">
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
      <div className="table-container">
        <h3>المستوى العام لتقييم  الضوابط الأساسية للأمن السيبراني</h3>
        <table className="statistics-table">
          <thead>
            <tr>
              <th>الحالة</th>
              <th>عدد الضوابط</th>
              <th>النسبة المئوية</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>مطبق كلياً - Implemented</td>
              <td>{statusCounts.complete}</td>
              <td>{completePercentage.toFixed(2)}%</td>
            </tr>
            <tr>
              <td>مطبق جزئياً - Partially Implemented</td>
              <td>{statusCounts.partial}</td>
              <td>{partialPercentage.toFixed(2)}%</td>
            </tr>
            <tr>
              <td>غير مطبق - Not Implemented</td>
              <td>{statusCounts.notApplied}</td>
              <td>{notAppliedPercentage.toFixed(2)}%</td>
            </tr>
            <tr>
              <td>نسبة التطبيق الكلي للجهة (للضوابط الإلزامية)</td>
              <td colSpan="2">{completePercentage.toFixed(2)}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="print-button" onClick={handlePrint}>طباعة</button>
    </div>
  );
};

export default StatisticsDetail;
