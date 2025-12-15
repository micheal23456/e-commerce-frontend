import { createSlice } from '@reduxjs/toolkit';

export const updateCartToLS = (cartItems) => {
  localStorage.setItem('cart', JSON.stringify(cartItems));
};

const initialCart = JSON.parse(localStorage.getItem('cart')) || [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: initialCart,
    totalItems: initialCart.reduce((sum, item) => sum + item.quantity, 0),
    totalAmount: initialCart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i._id === item._id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      
      state.totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
      state.totalAmount = state.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
      updateCartToLS(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      state.totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
      state.totalAmount = state.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
      updateCartToLS(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i._id === id);
      if (item) {
        item.quantity = quantity;
        state.totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
        state.totalAmount = state.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
        updateCartToLS(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
      localStorage.removeItem('cart');
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
