// src/pages/AdminUserView.js
import React, { useEffect, useState } from 'react';
import { getAdmins, getUsers } from '../FirestoreService';

const AdminUserView = () => {
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      const adminsData = await getAdmins();
      setAdmins(adminsData);
    };

    const fetchUsers = async () => {
      const usersData = await getUsers();
      setUsers(usersData);
    };

    fetchAdmins();
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admins</h1>
      <ul>
        {admins.map(admin => (
          <li key={admin.id}>{admin.username} - {admin.password}</li>
        ))}
      </ul>
      
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username} - {user.password}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUserView;
