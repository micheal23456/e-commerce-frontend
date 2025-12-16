import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/dashboard');
        setStats(data.stats);
      } catch (error) {
        console.error('Failed to fetch stats');
      }
    };
    fetchStats();
  }, []);

 return (
  <div className="admin-dashboard">
    <div className="admin-dashboard-header">
      <h1>Admin Dashboard</h1>
    </div>

    <div className="stats-grid">
      <div className="stat-card">
        <h3>Total Users</h3>
        <div className="stat-number">{stats.totalUsers || 0}</div>
      </div>
      <div className="stat-card">
        <h3>Total Products</h3>
        <div className="stat-number">{stats.totalProducts || 0}</div>
      </div>
      <div className="stat-card">
        <h3>Completed Orders</h3>
        <div className="stat-number">{stats.totalOrders || 0}</div>
      </div>
      <div className="stat-card">
        <h3>Revenue</h3>
        <div className="stat-number">
          ₹{stats.totalRevenue?.toLocaleString() || 0}
        </div>
      </div>
    </div>

    <div className="admin-nav">
      <Link to="/admin/products" className="admin-link">
        <div className="icon">📦</div>
        <h4>Products</h4>
      </Link>
      <Link to="/admin/orders" className="admin-link">
        <div className="icon">📋</div>
        <h4>Orders</h4>
      </Link>
      <Link to="/admin/users" className="admin-link">
        <div className="icon">👥</div>
        <h4>Users</h4>
      </Link>
      <Link to="/admin/analytics" className="admin-link">
        <div className="icon">📊</div>
        <h4>Analytics</h4>
      </Link>
    </div>
  </div>
);

};

export default AdminDashboard;
