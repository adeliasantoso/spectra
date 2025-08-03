import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { success, error, info } = useToast();
  
  // Form states
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United Kingdom',
    
    // Payment Information
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardName: '',
    
    // Billing same as shipping
    sameAsShipping: true,
    billingAddress: '',
    billingCity: '',
    billingPostalCode: '',
    billingCountry: 'United Kingdom'
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review

  // Animation states
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'cardNumber') {
      // Format card number with spaces
      const cleanValue = value.replace(/\s/g, '');
      const formattedValue = cleanValue.replace(/(.{4})/g, '$1 ').trim();
      if (cleanValue.length <= 16) {
        setFormData(prev => ({ ...prev, [name]: formattedValue }));
      }
    } else if (name === 'phone') {
      // Format phone number
      const cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length <= 11) {
        setFormData(prev => ({ ...prev, [name]: cleanValue }));
      }
    } else if (name === 'postalCode' || name === 'billingPostalCode') {
      // UK postcode format
      const upperValue = value.toUpperCase();
      if (upperValue.length <= 8) {
        setFormData(prev => ({ ...prev, [name]: upperValue }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      // Validate shipping information
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    } else if (step === 2) {
      // Validate payment information
      const cleanCardNumber = formData.cardNumber.replace(/\s/g, '');
      if (!cleanCardNumber) newErrors.cardNumber = 'Card number is required';
      else if (cleanCardNumber.length !== 16) newErrors.cardNumber = 'Card number must be 16 digits';
      
      if (!formData.expiryMonth) newErrors.expiryMonth = 'Expiry month is required';
      if (!formData.expiryYear) newErrors.expiryYear = 'Expiry year is required';
      if (!formData.cvv) newErrors.cvv = 'CVV is required';
      else if (formData.cvv.length < 3) newErrors.cvv = 'CVV must be at least 3 digits';
      if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
      
      // Validate billing address if different from shipping
      if (!formData.sameAsShipping) {
        if (!formData.billingAddress.trim()) newErrors.billingAddress = 'Billing address is required';
        if (!formData.billingCity.trim()) newErrors.billingCity = 'Billing city is required';
        if (!formData.billingPostalCode.trim()) newErrors.billingPostalCode = 'Billing postal code is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      info('Proceeding to next step', {
        title: 'Step Progress',
        message: `Moving to step ${currentStep + 1} of 3`
      });
    } else {
      error('Information required', {
        title: 'Form Incomplete',
        message: 'Please complete all required fields to continue'
      });
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const simulatePaymentProcessing = () => {
    return new Promise((resolve) => {
      // Simulate different processing times and outcomes
      const processingTime = Math.random() * 3000 + 2000; // 2-5 seconds
      const shouldSucceed = Math.random() > 0.1; // 90% success rate
      
      setTimeout(() => {
        resolve(shouldSucceed);
      }, processingTime);
    });
  };

  const handleSubmitOrder = async () => {
    if (!validateStep(2)) {
      error('Information required', {
        title: 'Form Incomplete',
        message: 'Please complete all required fields to continue'
      });
      return;
    }

    setIsProcessing(true);
    info('Processing payment', {
      title: 'Please Wait',
      message: 'Your payment is being processed securely'
    });

    try {
      const paymentSuccess = await simulatePaymentProcessing();
      
      if (paymentSuccess) {
        // Generate order number
        const orderNumber = `SP${Date.now().toString().slice(-6)}`;
        
        // Store order details in localStorage for confirmation page
        const orderDetails = {
          orderNumber,
          items: cartItems,
          shippingInfo: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country
          },
          paymentInfo: {
            cardLast4: formData.cardNumber.slice(-4),
            cardName: formData.cardName
          },
          totals: {
            subtotal: getTotalPrice(),
            tax: getTotalPrice() * 0.2,
            total: getTotalPrice() * 1.2
          },
          orderDate: new Date().toISOString()
        };
        
        localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
        
        // Clear cart and redirect to success page
        clearCart();
        success('Payment completed successfully', {
          title: 'Order Confirmed',
          message: 'Thank you for your purchase. Redirecting to confirmation...'
        });
        
        setTimeout(() => {
          navigate('/order-success');
        }, 1500);
        
      } else {
        error('Payment could not be processed', {
          title: 'Payment Failed',
          message: 'Please verify your card details and try again'
        });
      }
    } catch (err) {
      error('Processing error occurred', {
        title: 'Payment Error',
        message: 'An unexpected error occurred. Please try again'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toFixed(2) : '0.00';
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step, index) => (
        <React.Fragment key={step}>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
            step === currentStep 
              ? 'bg-black text-white border-black' 
              : step < currentStep 
                ? 'bg-green-500 text-white border-green-500'
                : 'bg-white text-gray-400 border-gray-300'
          }`}>
            {step < currentStep ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <span className="text-sm font-medium">{step}</span>
            )}
          </div>
          {index < 2 && (
            <div className={`w-12 h-0.5 mx-2 transition-all duration-300 ${
              step < currentStep ? 'bg-green-500' : 'bg-gray-300'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderShippingForm = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-black mb-6">Shipping Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="John"
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Doe"
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="john.doe@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="07123456789"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address *
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all ${
            errors.address ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="123 Main Street"
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="London"
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Postal Code *
          </label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all ${
              errors.postalCode ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="SW1A 1AA"
          />
          {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country *
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
          >
            <option value="United Kingdom">United Kingdom</option>
            <option value="Ireland">Ireland</option>
            <option value="France">France</option>
            <option value="Germany">Germany</option>
            <option value="Netherlands">Netherlands</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderPaymentForm = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-black mb-6">Payment Information</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Number *
        </label>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all ${
            errors.cardNumber ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="1234 5678 9012 3456"
          maxLength="19"
        />
        {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiry Month *
          </label>
          <select
            name="expiryMonth"
            value={formData.expiryMonth}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all ${
              errors.expiryMonth ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Month</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                {String(i + 1).padStart(2, '0')}
              </option>
            ))}
          </select>
          {errors.expiryMonth && <p className="text-red-500 text-sm mt-1">{errors.expiryMonth}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiry Year *
          </label>
          <select
            name="expiryYear"
            value={formData.expiryYear}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all ${
              errors.expiryYear ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Year</option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={2025 + i}>
                {2025 + i}
              </option>
            ))}
          </select>
          {errors.expiryYear && <p className="text-red-500 text-sm mt-1">{errors.expiryYear}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CVV *
          </label>
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all ${
              errors.cvv ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="123"
            maxLength="4"
          />
          {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cardholder Name *
        </label>
        <input
          type="text"
          name="cardName"
          value={formData.cardName}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all ${
            errors.cardName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="John Doe"
        />
        {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
      </div>

      <div className="border-t pt-6">
        <h4 className="text-lg font-medium text-black mb-4">Billing Address</h4>
        
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="sameAsShipping"
              checked={formData.sameAsShipping}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-sm">Billing address is the same as shipping address</span>
          </label>
        </div>

        {!formData.sameAsShipping && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Billing Address *
              </label>
              <input
                type="text"
                name="billingAddress"
                value={formData.billingAddress}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all ${
                  errors.billingAddress ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="123 Billing Street"
              />
              {errors.billingAddress && <p className="text-red-500 text-sm mt-1">{errors.billingAddress}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="billingCity"
                  value={formData.billingCity}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all ${
                    errors.billingCity ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="London"
                />
                {errors.billingCity && <p className="text-red-500 text-sm mt-1">{errors.billingCity}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Postal Code *
                </label>
                <input
                  type="text"
                  name="billingPostalCode"
                  value={formData.billingPostalCode}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all ${
                    errors.billingPostalCode ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="SW1A 1AA"
                />
                {errors.billingPostalCode && <p className="text-red-500 text-sm mt-1">{errors.billingPostalCode}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <select
                  name="billingCountry"
                  value={formData.billingCountry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                >
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Ireland">Ireland</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                  <option value="Netherlands">Netherlands</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderOrderReview = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-black mb-6">Review Your Order</h3>
      
      {/* Order Items */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium text-black mb-4">Items</h4>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <img
                src={item.images ? item.images[0] : item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h5 className="font-medium text-black">{item.name}</h5>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <p className="font-medium">£{(parseFloat(formatPrice(item.price)) * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Info */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium text-black mb-4">Shipping Address</h4>
        <div className="text-sm text-gray-600">
          <p>{formData.firstName} {formData.lastName}</p>
          <p>{formData.address}</p>
          <p>{formData.city}, {formData.postalCode}</p>
          <p>{formData.country}</p>
          <p className="mt-2">{formData.email}</p>
          <p>{formData.phone}</p>
        </div>
      </div>

      {/* Payment Info */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium text-black mb-4">Payment Method</h4>
        <div className="text-sm text-gray-600">
          <p>Card ending in {formData.cardNumber.slice(-4)}</p>
          <p>{formData.cardName}</p>
          <p>Expires {formData.expiryMonth}/{formData.expiryYear}</p>
        </div>
      </div>
    </div>
  );

  if (cartItems.length === 0) {
    return null; // This will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section 
        id="checkout-main"
        ref={(el) => sectionRefs.current['checkout-main'] = el}
        className="pt-24 md:pt-32 pb-12 md:pb-20"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-light text-black mb-8 md:mb-12 text-center transition-all duration-700 ${
            visibleSections.has('checkout-main') ? 'animate-fade-up opacity-100' : 'opacity-0 translate-y-8'
          }`}>Checkout</h1>
          
          {renderStepIndicator()}
          
          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 transition-all duration-700 delay-200 ${
            visibleSections.has('checkout-main') ? 'animate-fade-up opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-6 md:p-8 border border-gray-200">
                {currentStep === 1 && renderShippingForm()}
                {currentStep === 2 && renderPaymentForm()}
                {currentStep === 3 && renderOrderReview()}
                
                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <div>
                    {currentStep > 1 && (
                      <button
                        onClick={handlePreviousStep}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Previous
                      </button>
                    )}
                    <Link
                      to="/cart"
                      className="ml-4 text-gray-600 hover:text-black transition-colors"
                    >
                      Back to Cart
                    </Link>
                  </div>
                  
                  <div>
                    {currentStep < 3 ? (
                      <button
                        onClick={handleNextStep}
                        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitOrder}
                        disabled={isProcessing}
                        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {isProcessing ? (
                          <>
                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>Processing...</span>
                          </>
                        ) : (
                          <span>Place Order</span>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 lg:sticky lg:top-24">
                <h3 className="text-lg md:text-xl font-medium text-black mb-6">Order Summary</h3>
                
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.images ? item.images[0] : item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-black truncate">{item.name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">£{(parseFloat(formatPrice(item.price)) * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                
                <hr className="my-6" />
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">£{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (20%)</span>
                    <span className="font-medium">£{(getTotalPrice() * 0.2).toFixed(2)}</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span>£{(getTotalPrice() * 1.2).toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Secure SSL encrypted payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Checkout;