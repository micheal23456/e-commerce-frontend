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
    } catch (error) {
      console.error('Failed to fetch analytics');
    }
  };

  return (
    <div className="admin-analytics">
      <div className="admin-analytics-header">
        <h1>Analytics Dashboard</h1>
        <Link to="/admin" className="btn">← Dashboard</Link>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card revenue">
          <h3>Total Revenue</h3>
          <div className="stat-number">
            ₹{analytics.totalRevenue || 0}
          </div>
        </div>

        <div className="analytics-card aov">
          <h3>Avg Order Value</h3>
          <div className="stat-number">
            ₹{(analytics.avgOrderValue || 0).toFixed(0)}
          </div>
        </div>

        <div className="analytics-card conversion">
          <h3>Conversion Rate</h3>
          <div className="stat-number">
            {(analytics.conversionRate || 0).toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
