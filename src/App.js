import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import UserManagement from './pages/UserManagement';
import Commitment from './pages/Commitment';
import Statistics from './pages/Statistics';
import ComplianceStatus from './pages/ComplianceStatus';
import Evaluation from './pages/Evaluation';
import Attachments from './pages/Attachments';
import FirestoreTest from './pages/FirestoreTest';
import AdminUserView from './pages/AdminUserView';
import StatisticsDetail from './pages/StatisticsDetail'; // استيراد صفحة الإحصائيات الجديدة
import Footer from './components/Footer';

import { ControlsProvider } from './contexts/ControlsContext';
import './App.css';
import './pages/Commitment.css';
import './pages/ComplianceStatus.css';

import { addData, getData } from './FirestoreService';

function App() {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const fetchRules = async () => {
      const retrievedRules = await getData('rules');
      setRules(retrievedRules);
    };
    fetchRules();
  }, []);

  const handleAddRule = async (newRule) => {
    await addData('rules', newRule);
    const updatedRules = await getData('rules');
    setRules(updatedRules);
  };

  return (
    <ControlsProvider>
      <div className="app-container">
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/commitment" element={<Commitment />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/compliance-status" element={<ComplianceStatus />} />
            <Route path="/add-controls" element={<Commitment />} />
            <Route path="/evaluation" element={<Evaluation />} />
            <Route path="/attachments/:id" element={<Attachments rules={rules} />} />
            <Route path="/firestore-test" element={<FirestoreTest />} />
            <Route path="/admin-user-view" element={<AdminUserView />} />
            <Route path="/statistics-detail" element={<StatisticsDetail />} /> {/* إضافة صفحة الإحصائيات الجديدة */}
          </Routes>
        </div>
        <Footer />
      </div>
    </ControlsProvider>
  );
}

export default App;
