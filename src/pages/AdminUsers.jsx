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
    } catch (error) {
      console.error('Failed to fetch users');
    }
  };

  return (
    <div className="admin-users">
      <div className="admin-users-header">
        <h1>Users Management</h1>
        <Link to="/admin" className="btn">← Dashboard</Link>
      </div>

      <h2>Total Users: {users.length}</h2>

      <div className="admin-users-list">
        {users.map(user => (
          <div key={user._id} className="user-item">
            <div className="user-main">
              <h4>{user.name}</h4>
              <p>{user.email}</p>
            </div>
            <div className="user-meta-actions">
              <span className={`role-badge ${user.role || 'user'}`}>
                {user.role || 'user'}
              </span>
              <button className="btn-sm">Edit Role</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
