import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { success, info, warning } = useToast();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      info('Item removed from cart');
    } else {
      updateQuantity(productId, newQuantity);
      info(`Quantity updated to ${newQuantity}`);
    }
  };

  const handleRemoveItem = (productId, productName) => {
    removeFromCart(productId);
    warning(`${productName} removed from cart`);
  };

  const handleClearCart = () => {
    clearCart();
    warning('All items removed from cart');
  };

  const formatPrice = (price) => {
    // Safety check - return early if price is invalid
    if (!price && price !== 0) return '0.00';
    
    try {
      // Convert to number directly if it's already a number
      if (typeof price === 'number') {
        return price.toFixed(2);
      }
      
      // Convert to string safely and clean it
      const priceStr = String(price);
      const cleanPrice = priceStr.replace(/[£$,\s]/g, '');
      const numPrice = parseFloat(cleanPrice);
      
      // Return formatted number or fallback
      return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
    } catch (error) {
      console.error('formatPrice error:', error, 'price:', price);
      return '0.00';
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        
        <section className="pt-24 md:pt-32 pb-12 md:pb-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-6 md:mb-8">Your Cart</h1>
            <div className="py-8 md:py-16">
              <svg className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h10a1 1 0 001-1v-6m-8 6V9a1 1 0 011-1h6a1 1 0 011 1v8" />
              </svg>
              <h2 className="text-xl md:text-2xl font-light text-gray-600 mb-3 md:mb-4">Your cart is empty</h2>
              <p className="text-sm md:text-base text-gray-500 mb-6 md:mb-8">Add some products to get started</p>
              <Link
                to="/shop"
                className="inline-block bg-black text-white px-6 md:px-8 py-2.5 md:py-3 font-medium hover:bg-gray-800 transition-colors duration-200 rounded-lg text-sm md:text-base"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="pt-24 md:pt-32 pb-12 md:pb-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-8 md:mb-12 text-center">Your Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4 md:space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 border-b border-gray-200 pb-4 md:pb-6">
                    {/* Product Image */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mx-auto sm:mx-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-base md:text-lg font-medium text-black mb-1">{item.name}</h3>
                      <p className="text-sm md:text-base text-gray-600">£{formatPrice(item.price)}</p>
                    </div>

                    {/* Mobile Layout: Quantity and Price */}
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-colors text-sm"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-medium text-sm md:text-base">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-colors text-sm"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-center sm:text-right">
                        <p className="text-base md:text-lg font-medium text-black">
                          £{(parseFloat(formatPrice(item.price)) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      className="text-gray-400 hover:text-red-500 transition-colors self-center sm:self-start"
                      title="Remove item"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              <div className="mt-6 md:mt-8 text-center sm:text-left">
                <button
                  onClick={handleClearCart}
                  className="text-gray-500 hover:text-red-500 transition-colors text-sm md:text-base"
                >
                  Clear all items
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-4 md:p-6 lg:sticky lg:top-24">
                <h3 className="text-lg md:text-xl font-medium text-black mb-4 md:mb-6">Order Summary</h3>
                
                <div className="space-y-3 md:space-y-4">
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">£{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-600">Tax (20%)</span>
                    <span className="font-medium">£{(getTotalPrice() * 0.2).toFixed(2)}</span>
                  </div>
                  <hr className="my-3 md:my-4" />
                  <div className="flex justify-between text-lg md:text-xl font-medium">
                    <span>Total</span>
                    <span>£{(getTotalPrice() * 1.2).toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full bg-black text-white px-4 md:px-6 py-3 md:py-4 font-medium mt-4 md:mt-6 hover:bg-gray-800 transition-colors duration-200 rounded-lg text-sm md:text-base">
                  Proceed to Checkout
                </button>

                <Link
                  to="/shop"
                  className="block text-center text-gray-600 hover:text-black transition-colors mt-3 md:mt-4 text-sm md:text-base"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cart;