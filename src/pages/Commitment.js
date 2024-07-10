import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Commitment.css';
import { ControlsContext } from '../contexts/ControlsContext';
import { FaTachometerAlt } from 'react-icons/fa'; // استيراد الأيقونة
import { getEncryptedData } from '../utils/encryption'; // استيراد دوال التشفير
const Commitment = () => {
  const { setControls } = useContext(ControlsContext);

  const [rules, setRules] = useState([]);
  const [newRuleNumber, setNewRuleNumber] = useState('');
  const [newSubRuleNumber, setNewSubRuleNumber] = useState('');
  const [newRuleDescription, setNewRuleDescription] = useState('');
  const [newFolderNumber, setNewFolderNumber] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [department, setDepartment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedRules = JSON.parse(localStorage.getItem('rules'));
    if (savedRules) {
      setRules(savedRules);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rules', JSON.stringify(rules));
  }, [rules]);

  const addRule = () => {
    if (rules.some(rule => rule.number === newRuleNumber)) {
      setErrorMessage('رقم الضابط موجود بالفعل');
      return;
    }

    if (newRuleNumber && newSubRuleNumber && newRuleDescription && newFolderNumber && status && department) {
      const newRules = [...rules, { 
        number: newRuleNumber, 
        subNumber: newSubRuleNumber,
        description: newRuleDescription, 
        folderNumber: newFolderNumber,
        status, 
        notes, 
        attachments,
        department 
      }];
      setRules(newRules);
      setNewRuleNumber('');
      setNewSubRuleNumber('');
      setNewRuleDescription('');
      setNewFolderNumber('');
      setStatus('');
      setNotes('');
      setAttachments([]);
      setDepartment('');
      updateControlsCount(newRules);
      setErrorMessage('');
    }
  };

  const updateControlsCount = (rules) => {
    const complete = rules.filter(rule => rule.status === 'مطبق كلياً').length;
    const partial = rules.filter(rule => rule.status === 'مطبق جزئياً').length;
    const notApplied = rules.filter(rule => rule.status === 'غير مطبق').length;

    setControls({ complete, partial, notApplied });
  };

  const deleteRule = (index) => {
    const updatedRules = rules.filter((_, i) => i !== index);
    setRules(updatedRules);
    updateControlsCount(updatedRules);
  };

  const editRule = (index) => {
    const ruleToEdit = rules[index];
    setNewRuleNumber(ruleToEdit.number);
    setNewSubRuleNumber(ruleToEdit.subNumber);
    setNewRuleDescription(ruleToEdit.description);
    setNewFolderNumber(ruleToEdit.folderNumber);
    setStatus(ruleToEdit.status);
    setNotes(ruleToEdit.notes);
    setAttachments(ruleToEdit.attachments);
    setDepartment(ruleToEdit.department);
    deleteRule(index);
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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => {
      return { name: file.name, data: URL.createObjectURL(file) }; // كود رفع الصور
    });
    setAttachments(prevAttachments => [...prevAttachments, ...newAttachments]);
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
      <h1>الضوابط</h1>
      <div className="form-group">
        <label>رقم الضابط:</label>
        <input 
          type="text" 
          value={newRuleNumber} 
          onChange={(e) => setNewRuleNumber(e.target.value)} 
          style={{ direction: 'rtl', textAlign: 'right' }}
        />
      </div>
      <div className="form-group">
        <label>رقم الضابط الفرعي:</label>
        <input 
          type="text" 
          value={newSubRuleNumber} 
          onChange={(e) => setNewSubRuleNumber(e.target.value)} 
          style={{ direction: 'rtl', textAlign: 'right' }}
        />
      </div>
      <div className="form-group">
        <label>شرح الضابط:</label>
        <textarea
          value={newRuleDescription}
          onChange={(e) => setNewRuleDescription(e.target.value)}
          style={{ direction: 'rtl', textAlign: 'right' }}
          rows="4"
        />
      </div>
      <div className="form-group">
        <label>رقم المجلد:</label>
        <input 
          type="text" 
          value={newFolderNumber} 
          onChange={(e) => setNewFolderNumber(e.target.value)} 
          style={{ direction: 'rtl', textAlign: 'right' }}
        />
      </div>
      <div className="form-group">
        <label>الحالة:</label>
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
          style={{ direction: 'rtl', textAlign: 'right' }}
        >
          <option value="">اختر الحالة</option>
          <option value="مطبق كلياً">مطبق كلياً</option>
          <option value="مطبق جزئياً">مطبق جزئياً</option>
          <option value="غير مطبق">غير مطبق</option>
        </select>
      </div>
      <div className="form-group">
        <label>ملاحظات:</label>
        <input 
          type="text" 
          value={notes} 
          onChange={(e) => setNotes(e.target.value)} 
          style={{ direction: 'rtl', textAlign: 'right' }}
        />
      </div>
      <div className="form-group">
        <label>الإدارات المعنية:</label>
        <select 
          value={department} 
          onChange={(e) => setDepartment(e.target.value)} 
          style={{ direction: 'rtl', textAlign: 'right' }}
        >
          <option value="">اختر الإدارة</option>
          <option value="وكالة التحول الرقمي">وكالة التحول الرقمي</option>
          <option value="وكالة المشاريع">وكالة المشاريع</option>
          <option value="وكالة الخدمات">وكالة الخدمات</option>
          <option value="الادارة العامة للموارد البشرية">الادارة العامة للموارد البشرية</option>
          <option value="الادارة العامة للشؤون الإدارية والمالية">الادارة العامة للشؤون الإدارية والمالية</option>
          <option value="الإدارة العامة للشؤون القانونية">الإدارة العامة للشؤون القانونية</option>
          <option value="الإدارة العامة للأمن السيبراني">الإدارة العامة للأمن السيبراني</option>
        </select>
      </div>
      <div className="form-group">
        <label>الإثبات أو الإرفاق:</label>
        <input 
          type="file" 
          multiple
          onChange={handleFileChange}
          accept="image/png, image/jpeg, application/pdf"
          style={{ direction: 'rtl', textAlign: 'right' }}
        />
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button onClick={addRule}>إضافة الضابط</button>

      <Link to="/statistics">
        <button>عرض الإحصائيات</button>
      </Link>

      <input 
        type="text" 
        placeholder="بحث برقم الضابط أو الحالة"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
        style={{ direction: 'rtl', textAlign: 'right' }}
      />

      <table className="commitment-table">
        <thead>
          <tr>
            <th>رقم الضابط</th>
            <th>رقم الضابط الفرعي</th>
            <th>شرح الضابط</th>
            <th>رقم المجلد</th>
            <th>الحالة</th>
            <th>ملاحظات</th>
            <th>الإدارات المعنية</th>
            <th>الإثبات أو الإرفاق</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {filteredRules.map((rule, index) => (
            <tr key={index}>
              <td>{rule.number}</td>
              <td>{rule.subNumber}</td>
              <td>{rule.description}</td>
              <td>{rule.folderNumber}</td>
              <td style={{ backgroundColor: getStatusColor(rule.status) }}>{rule.status}</td>
              <td>{rule.notes}</td>
              <td>{rule.department}</td>
              <td>
                {rule.attachments.length > 0 && 
                  <Link to={`/attachments/${index}`}>
                    عرض الملفات ({rule.attachments.length})
                  </Link>
                }
              </td>
              <td>
                <button onClick={() => editRule(index)}>تعديل</button>
                <button onClick={() => deleteRule(index)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Commitment;
