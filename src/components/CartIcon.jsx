import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartIcon = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Link to="/cart">
        <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-gray-800 hover:scale-110 transition-all duration-300 cursor-pointer group">
          <div className="relative">
            <svg className="w-9 h-9 transition-all duration-300 group-hover:w-10 group-hover:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7a2 2 0 01-2 2H8a2 2 0 01-2-2L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CartIcon;