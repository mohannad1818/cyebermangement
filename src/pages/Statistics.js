import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './Statistics.css';

const Statistics = () => {
  const [rules, setRules] = useState([]);

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

  return (
    <div className="statistics-container">
      <h1>إحصائيات الضوابط</h1>
      <div className="chart-container">
        <Bar data={barData} options={options} />
      </div>
      <div className="chart-container">
        <Pie data={pieData} options={options} />
      </div>
    </div>
  );
};

export default Statistics;
