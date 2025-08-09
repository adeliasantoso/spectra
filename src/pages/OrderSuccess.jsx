import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  useEffect(() => {
    // Get order details from localStorage
    const lastOrder = localStorage.getItem('lastOrder');
    console.log('LastOrder from localStorage:', lastOrder);
    
    if (!lastOrder) {
      console.log('No order found in localStorage, redirecting to home');
      // Give user some time to see what happened
      setTimeout(() => navigate('/'), 2000);
      return;
    }

    try {
      const orderData = JSON.parse(lastOrder);
      console.log('Parsed order data:', orderData);
      setOrderDetails(orderData);
    } catch (error) {
      console.error('Error parsing order data:', error);
      setTimeout(() => navigate('/'), 2000);
    }
  }, [navigate]);

  // Animation observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set(prev).add(entry.target.id));
        }
      });
    }, observerOptions);

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toFixed(2) : '0.00';
  };

  const estimatedDeliveryDate = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3); // 3 days from now
    return deliveryDate.toLocaleDateString('en-GB', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh] pt-32">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="animate-spin w-12 h-12 border-4 border-gray-300 border-t-black rounded-full mx-auto mb-6"></div>
            <h2 className="text-xl font-medium text-gray-800 mb-3">Loading order details...</h2>
            <p className="text-gray-600 text-sm">
              Please wait while we retrieve your order information.
            </p>
            <p className="text-gray-500 text-xs mt-4">
              If this takes too long, you'll be redirected to the homepage.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section 
        id="success-main"
        ref={(el) => sectionRefs.current['success-main'] = el}
        className="pt-24 md:pt-32 pb-12 md:pb-20"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
          {/* Success Header */}
          <div className="text-center mb-12 animate-fade-up opacity-100">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-4">
              Order Confirmed!
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Thank you for your purchase, {orderDetails.shippingInfo.firstName}!
            </p>
            <p className="text-sm text-gray-500">
              Order #{orderDetails.orderNumber} • Placed on {formatDate(orderDetails.orderDate)}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 animate-fade-up opacity-100" style={{animationDelay: '200ms'}}>
            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-medium text-black mb-6">Order Summary</h3>
                
                <div className="space-y-4">
                  {orderDetails.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.images ? item.images[0] : item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-black">{item.name}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-sm text-gray-600">£{formatPrice(item.price)} each</p>
                      </div>
                      <p className="font-medium">£{(parseFloat(formatPrice(item.price)) * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                
                <hr className="my-6" />
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">£{formatPrice(orderDetails.totals.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (20%)</span>
                    <span className="font-medium">£{formatPrice(orderDetails.totals.tax)}</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total Paid</span>
                    <span>£{formatPrice(orderDetails.totals.total)}</span>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-black mb-4">What happens next?</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium mt-0.5">1</div>
                    <div>
                      <p className="font-medium">Order Processing</p>
                      <p className="text-gray-600">We'll prepare your items for shipment within 24 hours.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium mt-0.5">2</div>
                    <div>
                      <p className="font-medium">Shipping Notification</p>
                      <p className="text-gray-600">You'll receive a tracking number via email once your order ships.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium mt-0.5">3</div>
                    <div>
                      <p className="font-medium">Delivery</p>
                      <p className="text-gray-600">Expected delivery: <span className="font-medium">{estimatedDeliveryDate()}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping & Payment Info */}
            <div className="space-y-6">
              {/* Shipping Address */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-black mb-4">Shipping Address</h3>
                <div className="text-sm text-gray-700 space-y-1">
                  <p className="font-medium">{orderDetails.shippingInfo.firstName} {orderDetails.shippingInfo.lastName}</p>
                  <p>{orderDetails.shippingInfo.address}</p>
                  <p>{orderDetails.shippingInfo.city}, {orderDetails.shippingInfo.postalCode}</p>
                  <p>{orderDetails.shippingInfo.country}</p>
                  <p className="pt-2">{orderDetails.shippingInfo.email}</p>
                  <p>{orderDetails.shippingInfo.phone}</p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-black mb-4">Payment Method</h3>
                <div className="text-sm text-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center">
                      <svg className="w-6 h-4 text-white" viewBox="0 0 24 16" fill="currentColor">
                        <rect x="0" y="0" width="24" height="16" rx="2"/>
                        <rect x="2" y="3" width="20" height="2" fill="white"/>
                        <rect x="2" y="8" width="8" height="1" fill="white"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Card ending in {orderDetails.paymentInfo.cardLast4}</p>
                      <p className="text-gray-600">{orderDetails.paymentInfo.cardName}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-black mb-4">Need Help?</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Have questions about your order? Our customer support team is here to help.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700">support@spectravision.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-700">+44 20 7946 0958</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`text-center mt-12 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center transition-all duration-700 delay-400 ${
            'animate-fade-up opacity-100'
          }`}>
            <Link
              to="/shop"
              className="inline-block bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors duration-200 rounded-lg"
            >
              Continue Shopping
            </Link>
            <button
              onClick={() => window.print()}
              className="inline-block border-2 border-gray-300 text-gray-700 px-8 py-3 font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200 rounded-lg"
            >
              Print Receipt
            </button>
          </div>

          {/* Order Tracking Info */}
          <div className={`mt-12 text-center transition-all duration-700 delay-600 ${
            'animate-fade-up opacity-100'
          }`}>
            <div className="bg-gray-50 rounded-lg p-6 inline-block">
              <h4 className="font-medium text-black mb-2">Track Your Order</h4>
              <p className="text-sm text-gray-600 mb-3">
                You can track your order status using your order number:
              </p>
              <div className="flex items-center justify-center space-x-3">
                <code className="bg-white px-4 py-2 rounded border text-sm font-mono">
                  {orderDetails.orderNumber}
                </code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(orderDetails.orderNumber);
                    // You could add a toast notification here
                  }}
                  className="text-gray-500 hover:text-black transition-colors"
                  title="Copy order number"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Social Sharing */}
          <div className={`mt-8 text-center transition-all duration-700 delay-700 ${
            'animate-fade-up opacity-100'
          }`}>
            <p className="text-sm text-gray-600 mb-4">
              Love Spectra 1.0? Share your excitement with friends!
            </p>
            <div className="flex justify-center space-x-6">
              {/* Instagram */}
              <button className="text-gray-400 hover:text-pink-500 transition-colors group">
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </button>
              
              {/* X (Twitter) */}
              <button className="text-gray-400 hover:text-black transition-colors group">
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                </svg>
              </button>
              
              {/* Meta */}
              <button className="text-gray-400 hover:text-blue-600 transition-colors group">
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OrderSuccess;