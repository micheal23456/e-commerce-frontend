import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';
import productSlice from './slices/productSlice';

// ✅ PERSIST AUTH ONLY
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token']
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,  // ✅ Persisted!
    cart: cartSlice,
    products: productSlice
  },
  devTools: process.env.NODE_ENV !== 'production'
});

// ✅ EXPORT persistor for index.js
export const persistor = persistStore(store);

export default store;
