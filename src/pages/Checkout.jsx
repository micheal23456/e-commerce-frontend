import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaymentButton from '../components/PaymentButton';
import api from '../utils/api';
const Checkout = () => {
  const { items, totalAmount } = useSelector(state => state.cart);
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });

  const handlePaymentSuccess = async () => {
    try {
      await api.post('/orders', {
        items,
        totalAmount,
        shippingAddress: address
      });
      navigate('/orders?success=true');
    } catch (error) {
      console.error('Order creation failed');
    }
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        {/* Shipping Address */}
        <div className="billing-section">
          <h3>Shipping Address</h3>
          <form className="checkout-form">
            <input
              type="text"
              placeholder="Full Name"
              value={address.name}
              onChange={(e) => setAddress({ ...address, name: e.target.value })}
              className="checkout-input"
              required
            />
            <input
              type="text"
              placeholder="Street Address"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
              className="checkout-input"
              required
            />
            <div className="checkout-row-2">
              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="checkout-input"
              />
              <input
                type="text"
                placeholder="Pincode"
                value={address.pincode}
                onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                className="checkout-input"
              />
            </div>
            <input
              type="tel"
              placeholder="Phone"
              value={address.phone}
              onChange={(e) => setAddress({ ...address, phone: e.target.value })}
              className="checkout-input"
              required
            />
          </form>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>

          <div className="summary-items">
            {items.map(item => (
              <div key={item._id} className="summary-item-row">
                <div>
                  <div>{item.name}</div>
                  <div className="summary-item-sub">Qty: {item.quantity}</div>
                </div>
                <div>₹{(item.price * item.quantity).toLocaleString()}</div>
              </div>
            ))}
          </div>

          <div className="total-section">
            <div className="total-section-row">
              <span>Total:</span>
              <span>₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <PaymentButton
            amount={totalAmount}
            onSuccess={handlePaymentSuccess}
          />
        </div>
      </div>
    </div>
  );
};


export default Checkout;
