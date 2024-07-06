import React, { useContext, useState, useEffect } from 'react';
import { ControlsContext } from '../contexts/ControlsContext';
import { Link } from 'react-router-dom';
import './Evaluation.css';

const Evaluation = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [rules, setRules] = useState([]);
  const { setControls } = useContext(ControlsContext);

  useEffect(() => {
    const savedRules = JSON.parse(localStorage.getItem('rules'));
    if (savedRules) {
      setRules(savedRules);
    }
  }, []);

  const handleCardClick = (cardNumber, subCardsCount) => {
    if (selectedCard && selectedCard.number === cardNumber) {
      setSelectedCard(null); // Toggle off if the same card is clicked again
    } else {
      setSelectedCard({ number: cardNumber, count: subCardsCount });
    }
  };

  const renderSubCards = () => {
    if (selectedCard) {
      return (
        <div className="sub-cards-container">
          {Array.from({ length: selectedCard.count }, (_, index) => (
            <div key={index} className="sub-card" onClick={() => handleSubCardClick(`${index + 1}-${selectedCard.number}`)}>
              {`${index + 1}-${selectedCard.number}`}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleSubCardClick = (folderNumber) => {
    const filteredRules = rules.filter(rule => rule.folderNumber === folderNumber);
    setSelectedCard({ ...selectedCard, folderNumber, rules: filteredRules });
  };

  const handleStatusChange = (ruleIndex, newStatus) => {
    const updatedRules = rules.map((rule, index) => {
      if (index === ruleIndex) {
        return { ...rule, status: newStatus };
      }
      return rule;
    });
    setRules(updatedRules);
    localStorage.setItem('rules', JSON.stringify(updatedRules));
    updateControlsCount(updatedRules);
  };

  const updateControlsCount = (rules) => {
    const complete = rules.filter(rule => rule.status === 'مطبق كلياً').length;
    const partial = rules.filter(rule => rule.status === 'مطبق جزئياً').length;
    const notApplied = rules.filter(rule => rule.status === 'غير مطبق').length;

    setControls({ complete, partial, notApplied });
  };

  const renderRulesTable = () => {
    if (selectedCard && selectedCard.rules) {
      return (
        <table className="commitment-table">
          <thead>
            <tr>
              <th>رقم الضابط</th>
              <th>رقم الضابط الفرعي</th>
              <th>شرح الضابط</th>
              <th>رقم المجلد</th>
              <th>الحالة</th>
              <th>ملاحظات</th>
              <th>الادارات المعنية</th>
              <th>الإثبات أو الإرفاق</th>
            </tr>
          </thead>
          <tbody>
            {selectedCard.rules.map((rule, index) => (
              <tr key={index}>
                <td>{rule.number}</td>
                <td>{rule.subNumber}</td>
                <td>{rule.description}</td>
                <td>{rule.folderNumber}</td>
                <td>
                  <select
                    value={rule.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    style={{ backgroundColor: getStatusColor(rule.status) }}
                  >
                    <option value="مطبق كلياً">مطبق كلياً</option>
                    <option value="مطبق جزئياً">مطبق جزئياً</option>
                    <option value="غير مطبق">غير مطبق</option>
                  </select>
                </td>
                <td>{rule.notes}</td>
                <td>{rule.department}</td>
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
      );
    }
    return null;
  };

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

  return (
    <div className="evaluation-container" dir="rtl">
      <div className="evaluation-cards">
        <div className="evaluation-card" onClick={() => handleCardClick(1, 9)}>ECC.1</div>
        <div className="evaluation-card" onClick={() => handleCardClick(2, 15)}>ECC.2</div>
        <div className="evaluation-card" onClick={() => handleCardClick(3, 2)}>ECC.3</div>
        <div className="evaluation-card" onClick={() => handleCardClick(4, 1)}>ECC.4</div>
      </div>
      {renderSubCards()}
      {renderRulesTable()}
    </div>
  );
};

export default Evaluation;
