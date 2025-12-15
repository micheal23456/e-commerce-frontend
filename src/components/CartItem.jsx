import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../slices/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (quantity) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(item._id));
    } else {
      dispatch(updateQuantity({ id: item._id, quantity }));
    }
  };

  return (
    <div className="cart-item flex items-center gap-4 p-4 border-b">
      <img 
        src={item.images?.[0] || '/placeholder.jpg'} 
        alt={item.name} 
        className="w-20 h-20 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h4 className="font-semibold">{item.name}</h4>
        <p className="text-gray-600">₹{item.price.toLocaleString()}</p>
      </div>
      <div className="quantity-controls flex items-center gap-2">
        <button 
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
        >
          -
        </button>
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        <button 
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
        >
          +
        </button>
      </div>
      <div className="font-bold text-lg">₹{(item.price * item.quantity).toLocaleString()}</div>
      <button 
        onClick={() => dispatch(removeFromCart(item._id))}
        className="text-red-500 hover:text-red-700 font-medium"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
