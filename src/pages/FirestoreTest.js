// src/pages/FirestoreTest.js
import React, { useEffect, useState } from 'react';
import { addData, getData } from '../FirestoreService';

const FirestoreTest = () => {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const fetchRules = async () => {
      const retrievedRules = await getData('rules');
      setRules(retrievedRules);
    };
    fetchRules();
  }, []);

  const handleAddRule = async () => {
    console.log("Button clicked"); // رسالة تصحيح عند النقر على الزر
    const newRule = { field1: 'value1', field2: 'value2' };
    try {
      await addData('rules', newRule);
      console.log("Data added successfully"); // رسالة تصحيح عند إضافة البيانات بنجاح
      const updatedRules = await getData('rules');
      console.log("Data retrieved:", updatedRules); // رسالة تصحيح عند استرجاع البيانات بنجاح
      setRules(updatedRules);
    } catch (error) {
      console.error("Error in handleAddRule:", error); // رسالة تصحيح عند حدوث خطأ
    }
  };

  return (
    <div>
      <h1>Firestore Test Page</h1>
      <button onClick={handleAddRule}>Add Rule</button>
      <ul>
        {rules.map((rule) => (
          <li key={rule.id}>{JSON.stringify(rule)}</li>
        ))}
      </ul>
    </div>
  );
};

export default FirestoreTest;
