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
        <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-gray-800 hover:scale-125 transition-all duration-200 cursor-pointer">
          <div className="relative">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h10a1 1 0 001-1v-6m-8 6V9a1 1 0 011-1h6a1 1 0 011 1v8" />
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