import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/admin/users');
      setUsers(data.users);
    } catch (error) { console.error('Failed to fetch users'); }
  };

  return (
    <div className="admin-users container">
      <div className="flex justify-between items-center mb-8">
        <h1>Users Management</h1>
        <Link to="/admin" className="btn">← Dashboard</Link>
      </div>
      <h2>Total Users: {users.length}</h2>
      <div className="grid gap-4 mt-6">
        {users.map(user => (
          <div key={user._id} className="user-item flex justify-between items-center p-6 bg-gray-50 rounded-lg">
            <div>
              <h4>{user.name}</h4>
              <p>{user.email}</p>
            </div>
            <div className="flex gap-2">
              <span className="role-badge">{user.role || 'user'}</span>
              <button className="btn-sm bg-orange-500">Edit Role</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminUsers;
