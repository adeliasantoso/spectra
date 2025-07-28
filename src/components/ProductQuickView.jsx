import React, { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductQuickView = memo(({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleViewFullItem = () => {
    onClose();
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-light">Quick View</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover rounded-2xl"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-medium text-black mb-2">
                  {product.name}
                </h3>
                <p className="text-2xl font-light text-black">
                  {product.price}
                </p>
              </div>

              {product.description && (
                <div>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-black text-white px-6 py-3 text-lg font-medium hover:bg-gray-800 transition-colors duration-200 rounded-lg"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleViewFullItem}
                  className="w-full border border-black text-black px-6 py-3 text-lg font-medium hover:bg-black hover:text-white transition-colors duration-200 rounded-lg"
                >
                  View Full Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductQuickView;