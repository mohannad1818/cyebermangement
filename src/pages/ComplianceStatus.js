import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Commitment.css';
import { FaTachometerAlt } from 'react-icons/fa'; // استيراد الأيقونة
import { getEncryptedData } from '../utils/encryption'; // استيراد دوال التشفير
const CommitmentStatus = () => {
  const [rules, setRules] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // استخدام useNavigate

  useEffect(() => {
    const savedRules = JSON.parse(localStorage.getItem('rules'));
    if (savedRules) {
      setRules(savedRules);
    }
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'مطبق كلياً':
        return 'green';
      case 'مطبق جزئياً':
        return 'orange';
      case 'غير مطبق':
        return 'red';
      default:
        return 'transparent';
    }
  };

  const filteredRules = rules.filter(rule => 
    rule.number.includes(searchTerm) || rule.status.includes(searchTerm)
  );

  const handleBackClick = () => {
    navigate('/dashboard'); // التوجيه إلى صفحة dashboard عند النقر على الأيقونة
  };

  return (
    <div className="commitment-container" dir="rtl">
      <div className="back-icon" onClick={handleBackClick}>
        <FaTachometerAlt size={30} />
      </div>
      <h1>حالة الالتزام:</h1>

      <input 
        type="text" 
        placeholder="بحث برقم الضابط أو الحالة"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <table className="commitment-table">
        <thead>
          <tr>
            <th>رقم الضابط</th>
            <th>شرح الضابط</th>
            <th>الحالة</th>
            <th>الادارات المعنية</th>
            <th>ملاحظات</th>
            <th>الإثبات أو الإرفاق</th>
          </tr>
        </thead>
        <tbody>
          {filteredRules.map((rule, index) => (
            <tr key={index}>
              <td>{rule.number}</td>
              <td>{rule.description}</td>
              <td style={{ backgroundColor: getStatusColor(rule.status) }}>{rule.status}</td>
              <td>{rule.department}</td>
              <td>{rule.notes}</td>
              <td>
                {rule.attachments.length > 0 && 
                  <Link to={`/attachments/${index}`}>
                    عرض الملفات ({rule.attachments.length})
                  </Link>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommitmentStatus;
