import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context
import { ShopProvider } from './context/ShopContext';
import { CartProvider } from './context/CartContext';

// Routes
import AppRouter from './routes/AppRouter';

// External CSS
import "./App.css";

export const App = () => {
  return (
    <ShopProvider>
      <Router>
        {/* Toast Bildirişləri Qlobaldır */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#18181b',
              color: '#fff',
              border: '1px solid #27272a',
              fontSize: '14px',
              borderRadius: '12px'
            }
          }}
        />
        
        {/* Bütün səhifə məntiqi AppRouter-də */}
        <AppRouter />
        
      </Router>
    </ShopProvider>
  );
};