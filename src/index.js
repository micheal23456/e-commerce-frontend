import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store'; // ✅ SIMPLE import
import App from './App';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate 
      loading={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-orange-500">
          <div className="text-white text-2xl font-bold animate-pulse">
            Loading AquaShop...
          </div>
        </div>
      } 
      persistor={persistor}
    >
      <App />
    </PersistGate>
  </Provider>
);
