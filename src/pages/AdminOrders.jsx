import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';


const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/admin/orders');
      setOrders(data.orders);
    } catch (error) {
      console.error('Failed to fetch orders');
    }
  };

  return (
    <div className="admin-orders">
      <div className="admin-orders-header">
        <h1>Orders Management</h1>
        <Link to="/admin" className="btn">← Dashboard</Link>
      </div>

      <h2>Total Orders: {orders.length}</h2>

      <div className="admin-orders-list">
        {orders.map(order => (
          <div key={order._id} className="admin-order-card">
            <div className="admin-order-header">
              <div className="admin-order-main">
                <h4>Order #{order._id.slice(-6)}</h4>
                <p>User: {order.user?.name || 'N/A'}</p>
                <p>Total: ₹{order.total}</p>
                <span
                  className={`admin-order-status ${order.status}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="admin-order-actions">
                <button className="btn-sm green">
                  Ship
                </button>
                <button className="btn-sm blue">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
