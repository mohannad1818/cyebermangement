import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Attachments.css';

const Attachments = () => {
  const { id } = useParams();
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    const savedRules = JSON.parse(localStorage.getItem('rules'));
    if (savedRules && savedRules[id]) {
      setAttachments(savedRules[id].attachments);
    }
  }, [id]);

  return (
    <div className="attachments-page" dir="rtl">
      <h1>المرفقات</h1>
      {attachments.length === 0 ? (
        <p>لا توجد مرفقات</p>
      ) : (
        <ul>
          {attachments.map((attachment, index) => (
            <li key={index}>
              <a href={attachment.data} target="_blank" rel="noopener noreferrer">
                {attachment.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Attachments;
