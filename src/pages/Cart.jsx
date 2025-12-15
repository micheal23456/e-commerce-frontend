import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../slices/cartSlice';
import api from '../utils/api';

const Cart = () => {
  const { items, totalItems, totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const updateCartItem = async (id, quantity) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleCheckout = async () => {
    try {
      const { data } = await api.post('/orders/createPayment', { amount: totalAmount });
      // Open Razorpay modal (production)
      console.log('Razorpay Order:', data.order);
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  if (items.length === 0) {
    return (
      <div className="empty-cart container">
        <h2>Your Cart is Empty</h2>
        <Link to="/products" className="btn">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart container">
      <h2>Shopping Cart</h2>
      <div className="cart-content">
        <div className="cart-items">
          {items.map(item => (
            <div key={item._id} className="cart-item card">
              <img src={item.images?.[0]} alt={item.name} className="cart-img" />
              <div className="item-details">
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => updateCartItem(item._id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateCartItem(item._id, item.quantity + 1)}>+</button>
              </div>
              <div className="item-total">₹{(item.price * item.quantity).toLocaleString()}</div>
              <button 
                className="btn-danger btn-sm"
                onClick={() => dispatch(removeFromCart(item._id))}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        
        <div className="cart-summary card">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Total Items:</span>
            <span>{totalItems}</span>
          </div>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>₹{totalAmount.toLocaleString()}</span>
          </div>
          <div className="summary-row total">
            <span>Total Amount:</span>
            <span>₹{totalAmount.toLocaleString()}</span>
          </div>
          <Link to="/checkout" className="btn w-full" onClick={handleCheckout}>
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
