import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../utils/api';

const Orders = () => {
  const { user } = useSelector(state => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/myorders');
        setOrders(data.orders);
      } catch (error) {
        console.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  if (loading) return <div className="loading">Loading orders...</div>;

  
return (
  <div className="orders">
    <h2>My Orders</h2>
    {orders.length === 0 ? (
      <p>No orders yet. <a href="/products">Start shopping!</a></p>
    ) : (
      <div className="grid">
        {orders.map(order => (
          <div key={order._id} className="order-card">
            <div className="order-card-header">
              <div>
                <h4 className="order-id">Order #{order._id.slice(-6)}</h4>
                <p className={`status status-${order.status}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </p>
                <p className="order-items-count">{order.items.length} items</p>
              </div>
              <div className="order-summary">
                <div className="order-total">₹{order.totalAmount}</div>
                <p className="order-date">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="order-items-preview">
              {order.items.slice(0, 2).map(item => (
                <div key={item._id} className="order-item-row">
                  <img
                    src={item.product?.images?.[0]}
                    alt={item.name}
                    className="order-item-thumb"
                  />
                  <div>
                    <p className="order-item-text-main">{item.name}</p>
                    <p className="order-item-text-sub">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
              {order.items.length > 2 && (
                <p className="order-more-items">
                  +{order.items.length - 2} more items
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
};
export default Orders;
