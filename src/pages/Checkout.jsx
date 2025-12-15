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
      // Create order after payment
      await api.post('/orders', {
        items,
        totalAmount,
        shippingAddress: address
      });
      
      // Clear cart & redirect
      navigate('/orders?success=true');
    } catch (error) {
      console.error('Order creation failed');
    }
  };

  return (
    <div className="checkout container">
      <h1 className="mb-8">Checkout</h1>
      
      <div className="grid grid-cols-2 gap-12">
        {/* Billing Address */}
        <div className="billing-section">
          <h3 className="mb-6">Shipping Address</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={address.name}
              onChange={(e) => setAddress({...address, name: e.target.value})}
              className="input-group"
              required
            />
            <input
              type="text"
              placeholder="Street Address"
              value={address.street}
              onChange={(e) => setAddress({...address, street: e.target.value})}
              className="input-group"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) => setAddress({...address, city: e.target.value})}
                className="input-group"
              />
              <input
                type="text"
                placeholder="Pincode"
                value={address.pincode}
                onChange={(e) => setAddress({...address, pincode: e.target.value})}
                className="input-group"
              />
            </div>
            <input
              type="tel"
              placeholder="Phone"
              value={address.phone}
              onChange={(e) => setAddress({...address, phone: e.target.value})}
              className="input-group"
              required
            />
          </form>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h3 className="mb-6">Order Summary</h3>
          
          <div className="summary-items space-y-3 mb-8">
            {items.map(item => (
              <div key={item._id} className="flex justify-between items-center py-2">
                <div>
                  <div>{item.name}</div>
                  <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                </div>
                <div>₹{(item.price * item.quantity).toLocaleString()}</div>
              </div>
            ))}
          </div>

          <div className="total-section border-t pt-4 space-y-2">
            <div className="flex justify-between text-lg">
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
