import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('spectra-cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      try {
        let price = 0;
        
        if (typeof item.price === 'number') {
          price = item.price;
        } else if (typeof item.price === 'string') {
          const cleanPrice = item.price.replace(/[£$,\s]/g, '');
          price = parseFloat(cleanPrice);
        }
        
        return total + (isNaN(price) ? 0 : price) * item.quantity;
      } catch (error) {
        console.error('getTotalPrice error for item:', item, error);
        return total;
      }
    }, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Persist to localStorage whenever cartItems changes
  useEffect(() => {
    try {
      localStorage.setItem('spectra-cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalItems,
        getTotalPrice,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};