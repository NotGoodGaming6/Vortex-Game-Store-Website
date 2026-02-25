import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      const parsed = savedCart ? JSON.parse(savedCart) : [];
      if (!Array.isArray(parsed)) return [];
      
      // LocalStorage-dan oxuyanda eyni ID-li məhsulları təmizləyən filter
      const uniqueItems = parsed.filter((v, i, a) => a.findIndex(t => String(t.id) === String(v.id)) === i);
      return uniqueItems;
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    if (!product || !product.id) return;

    setCart((prev) => {
      // String müqayisəsi ilə dublikat yoxlaması
      const exists = prev.some(item => String(item.id) === String(product.id));
      if (exists) return prev; 
      
      return [...prev, { ...product }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);