import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import ProductQuickView from './ProductQuickView';

const ProductCard = ({ product, showQuickView = true }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const handleProductClick = () => {
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <div className="group cursor-pointer" onClick={handleProductClick}>
        {/* Product Image */}
        <div className="relative overflow-hidden mb-4 rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Quick View Button - appears on hover */}
          {showQuickView && (
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <button
                onClick={handleQuickView}
                className="bg-white text-black px-6 py-2 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-100"
              >
                Quick View
              </button>
            </div>
          )}

          {product.featured && (
            <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-sm font-medium">
              Featured
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="text-xl font-medium text-black group-hover:text-gray-600 transition-colors duration-200">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-gray-600 text-sm">
              {product.description}
            </p>
          )}
          <div className="flex justify-between items-center pt-2">
            <span className="text-2xl font-light text-black">
              {product.price}
            </span>
            <button 
              onClick={handleAddToCart}
              className="bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <ProductQuickView
          product={product}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
};

export default ProductCard;