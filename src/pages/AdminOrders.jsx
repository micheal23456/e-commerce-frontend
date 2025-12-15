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
    } catch (error) { console.error('Failed to fetch orders'); }
  };

  return (
    <div className="admin-orders container">
      <div className="flex justify-between items-center mb-8">
        <h1>Orders Management</h1>
        <Link to="/admin" className="btn">← Dashboard</Link>
      </div>
      <h2>Total Orders: {orders.length}</h2>
      <div className="grid gap-4 mt-6">
        {orders.map(order => (
          <div key={order._id} className="order-item p-6 bg-white rounded-lg shadow border">
            <div className="flex justify-between items-start">
              <div>
                <h4>Order #{order._id.slice(-6)}</h4>
                <p>User: {order.user?.name || 'N/A'}</p>
                <p>Total: ₹{order.total}</p>
                <span className={`status ${order.status}`}>{order.status}</span>
              </div>
              <div className="flex gap-2">
                <button className="btn-sm bg-green-500">Ship</button>
                <button className="btn-sm bg-blue-500">View</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminOrders;
