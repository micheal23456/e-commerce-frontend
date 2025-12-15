import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await api.get('/admin/analytics');
      setAnalytics(data);
    } catch (error) { console.error('Failed to fetch analytics'); }
  };

  return (
    <div className="admin-analytics container">
      <div className="flex justify-between items-center mb-8">
        <h1>Analytics Dashboard</h1>
        <Link to="/admin" className="btn">← Dashboard</Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="stat-card card text-center p-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl">
          <h3>Total Revenue</h3>
          <div className="stat-number text-3xl font-bold">₹{analytics.totalRevenue || 0}</div>
        </div>
        <div className="stat-card card text-center p-8 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl">
          <h3>Avg Order Value</h3>
          <div className="stat-number text-3xl font-bold">₹{(analytics.avgOrderValue || 0).toFixed(0)}</div>
        </div>
        <div className="stat-card card text-center p-8 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl">
          <h3>Conversion Rate</h3>
          <div className="stat-number text-3xl font-bold">{(analytics.conversionRate || 0).toFixed(1)}%</div>
        </div>
      </div>
    </div>
  );
};
export default AdminAnalytics;
