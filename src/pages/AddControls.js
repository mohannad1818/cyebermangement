import React, { useState, useEffect } from 'react';
import './Commitment.css';

const AddControls = () => {
  const [rules, setRules] = useState([]);
  const [newRuleNumber, setNewRuleNumber] = useState('');
  const [newRuleDescription, setNewRuleDescription] = useState('');
  const [newFolderNumber, setNewFolderNumber] = useState(''); // حالة لحفظ رقم المجلد الجديد
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [department, setDepartment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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
    if (newRuleNumber && newRuleDescription && newFolderNumber && status && department) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRules([...rules, { 
          number: newRuleNumber, 
          description: newRuleDescription,
          folderNumber: newFolderNumber, // إضافة رقم المجلد
          status, 
          notes, 
          attachment: reader.result,
          department 
        }]);
        setNewRuleNumber('');
        setNewRuleDescription('');
        setNewFolderNumber(''); // إعادة تعيين حالة رقم المجلد
        setStatus('');
        setNotes('');
        setAttachment(null);
        setDepartment('');
      };
      if (attachment) {
        reader.readAsDataURL(attachment);
      } else {
        setRules([...rules, { 
          number: newRuleNumber, 
          description: newRuleDescription,
          folderNumber: newFolderNumber, // إضافة رقم المجلد
          status, 
          notes, 
          attachment: null,
          department 
        }]);
        setNewRuleNumber('');
        setNewRuleDescription('');
        setNewFolderNumber(''); // إعادة تعيين حالة رقم المجلد
        setStatus('');
        setNotes('');
        setAttachment(null);
        setDepartment('');
      }
    }
  };

  const deleteRule = (index) => {
    const updatedRules = rules.filter((_, i) => i !== index);
    setRules(updatedRules);
  };

  const editRule = (index) => {
    const ruleToEdit = rules[index];
    setNewRuleNumber(ruleToEdit.number);
    setNewRuleDescription(ruleToEdit.description);
    setNewFolderNumber(ruleToEdit.folderNumber); // تعيين رقم المجلد للحالة
    setStatus(ruleToEdit.status);
    setNotes(ruleToEdit.notes);
    setAttachment(null);
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
    setAttachment(e.target.files[0]);
  };

  const filteredRules = rules.filter(rule => 
    rule.number.includes(searchTerm) || rule.status.includes(searchTerm)
  );

  return (
    <div className="commitment-container">
      <h1>إضافة الضوابط:</h1>
      <div className="form-group">
        <label>رقم الضابط:</label>
        <input 
          type="text" 
          value={newRuleNumber} 
          onChange={(e) => setNewRuleNumber(e.target.value)} 
          style={{ textAlign: 'right' }} 
        />
      </div>
      <div className="form-group"> 
        <label>شرح الضابط:</label>
        <input 
          type="text" 
          value={newRuleDescription} 
          onChange={(e) => setNewRuleDescription(e.target.value)} 
          style={{ textAlign: 'right' }} 
        />
      </div>
      <div className="form-group">
        <label>رقم المجلد:</label>
        <input 
          type="text" 
          value={newFolderNumber} 
          onChange={(e) => setNewFolderNumber(e.target.value)} 
          style={{ textAlign: 'right' }} 
        />
      </div>
      <div className="form-group">
        <label>الحالة:</label>
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
          style={{ textAlign: 'right' }} 
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
          style={{ textAlign: 'right' }} 
        />
      </div>
      <div className="form-group">
        <label>الادارات المعنية:</label>
        <input 
          type="text" 
          value={department} 
          onChange={(e) => setDepartment(e.target.value)} 
          style={{ textAlign: 'right' }} 
        />
      </div>
      <div className="form-group">
        <label>الإثبات أو الإرفاق:</label>
        <input 
          type="file" 
          onChange={handleFileChange}
          accept="image/png, image/jpeg, application/pdf"
        />
      </div>
      <button onClick={addRule}>إضافة الضابط</button>

      <input 
        type="text" 
        placeholder="بحث برقم الضابط أو الحالة"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
        style={{ textAlign: 'right' }} 
      />

      <table className="commitment-table">
        <thead>
          <tr>
            <th>رقم الضابط</th>
            <th>شرح الضابط</th>
            <th>رقم المجلد</th> {/* إضافة عمود رقم المجلد */}
            <th>الحالة</th>
            <th>ملاحظات</th>
            <th>الادارات المعنية</th>
            <th>الإثبات أو الإرفاق</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {filteredRules.map((rule, index) => (
            <tr key={index}>
              <td>{rule.number}</td>
              <td>{rule.description}</td>
              <td>{rule.folderNumber}</td> {/* عرض رقم المجلد */}
              <td style={{ backgroundColor: getStatusColor(rule.status) }}>{rule.status}</td>
              <td>{rule.notes}</td>
              <td>{rule.department}</td>
              <td>
                {rule.attachment && 
                  <a href={rule.attachment} target="_blank" rel="noopener noreferrer">
                    عرض الملف
                  </a>
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

export default AddControls;
