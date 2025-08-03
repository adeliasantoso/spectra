import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CartIcon from '../components/CartIcon';
import OptimizedImage from '../components/OptimizedImage';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useWishlist } from '../context/WishlistContext';
import { getProductById, getAllProducts } from '../data/products';
import social1Image from '../assets/images/landing-page/social1.png';
import social3Image from '../assets/images/landing-page/social3.png';
import isabellaMontoyaImg from '../assets/images/product-page/testimonial/isabella-montoya.png';
import jamesAlbrightImg from '../assets/images/product-page/testimonial/james-albright.png';
import jordanCarterImg from '../assets/images/product-page/testimonial/jordan-carter.png';
import chloeChenImg from '../assets/images/product-page/testimonial/chloe-chen.png';
import sarahMyersImg from '../assets/images/product-page/testimonial/sarah-myers.png';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { success, error, info } = useToast();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeSection, setActiveSection] = useState('description');
  const descriptionRef = useRef(null);
  const specificationsRef = useRef(null);
  const reviewsRef = useRef(null);

  const handleTestimonialChange = (newIndex) => {
    if (isTransitioning || newIndex === currentTestimonialIndex) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTestimonialIndex(newIndex);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 150);
  };



  // Get product data based on URL parameter
  const product = getProductById(id);
  
  // Get related products (exclude current product)
  const allProducts = getAllProducts();
  const relatedProducts = allProducts.filter(p => p.id !== id).slice(0, 3);
  
  // Redirect to shop if product not found
  useEffect(() => {
    if (!product) {
      // Could redirect to shop page or show 404
      console.warn(`Product with ID ${id} not found`);
    }
  }, [id, product]);
  
  // Return early if product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-blue-600 hover:text-blue-800">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const testimonials = [
    {
      name: 'James Albright',
      headline: 'Best purchase ever',
      rating: 5,
      review: 'We tried to find an interior designer for our house, but it was hard because we live in a small town. Spectra gave us some good options, and soon after, we hired someone from that list.',
      avatar: jamesAlbrightImg,
      date: 'March 15, 2025'
    },
    {
      name: 'Jordan Carter',
      headline: 'Really love Spectra Vision!',
      rating: 5,
      review: 'I always dread those weekly grocery runs. Now, fresh stuff just shows up at my door on weekends. Spectra did all the heavy lifting for me.',
      avatar: jordanCarterImg,
      date: 'February 28, 2025'
    },
    {
      name: 'Isabella Montoya',
      headline: 'Super helpful!',
      rating: 5,
      review: 'My friends and I run a small pottery business, and honestly, Spectra feels like our unofficial team member. It\'s always coming up with cool ideas and showing us helpful tools to buy.',
      avatar: isabellaMontoyaImg,
      date: 'January 12, 2025'
    },
    {
      name: 'Chloe Chen',
      headline: 'Solid five star!',
      rating: 5,
      review: 'These days, I trust Spectra to pick and shop new outfits for me and those clothes actually fit my vibe! I like the way I look now.',
      avatar: chloeChenImg,
      date: 'April 8, 2025'
    },
    {
      name: 'Sarah Myers',
      headline: 'So thankful',
      rating: 5,
      review: 'I\'ve always wanted to start investing but didn\'t know where to start. Spectra recommended a great app to help me grow my saving. Nine months in, and I\'m actually seeing progress.',
      avatar: sarahMyersImg,
      date: 'December 3, 2024'
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        const nextIndex = currentTestimonialIndex === testimonials.length - 1 ? 0 : currentTestimonialIndex + 1;
        handleTestimonialChange(nextIndex);
      }
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [currentTestimonialIndex, isTransitioning, testimonials.length]);

  // Scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      if (reviewsRef.current && scrollPosition >= reviewsRef.current.offsetTop) {
        setActiveSection('reviews');
      } else if (specificationsRef.current && scrollPosition >= specificationsRef.current.offsetTop) {
        setActiveSection('specifications');
      } else if (descriptionRef.current && scrollPosition >= descriptionRef.current.offsetTop) {
        setActiveSection('description');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionRef, sectionName) => {
    setActiveSection(sectionName);
    sectionRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start',
      inline: 'nearest'
    });
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        color: selectedColor,
        quantity: quantity
      });

      success('Added to cart!', {
        title: '🎉 Success',
        message: `${product.name} (${selectedColor}) x${quantity} added to your cart`
      });
    } catch (err) {
      error('Failed to add to cart', {
        title: '❌ Error',
        message: 'Something went wrong. Please try again.'
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  const handleWishlistToggle = () => {
    setIsHeartAnimating(true);
    const wasAdded = toggleWishlist(product);
    
    if (wasAdded) {
      success('Added to wishlist! 💖', {
        title: '❤️ Wishlist',
        duration: 3000
      });
    } else {
      info('Removed from wishlist', {
        title: '💔 Wishlist',
        duration: 2000
      });
    }

    // Reset animation
    setTimeout(() => {
      setIsHeartAnimating(false);
    }, 600);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <CartIcon />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pt-24 md:pt-32 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-xl overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageSelect(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden transition-all ${
                    selectedImage === index ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className={`w-full h-full ${index === 1 ? 'object-cover p-0' : 'object-contain p-2'}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-lg md:text-xl text-gray-600 mb-4">{product.tagline}</p>
              

              {/* Price */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
                <span className="text-2xl md:text-3xl font-bold text-gray-900">${product.price}</span>
                <span className="text-lg md:text-xl text-gray-500 line-through">${product.originalPrice}</span>
                <span className="bg-red-100 text-red-800 text-xs md:text-sm font-medium px-2.5 py-0.5 rounded w-fit">
                  Save ${product.originalPrice - product.price}
                </span>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Color</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedColor === color 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all duration-150"
                >
                  -
                </button>
                <span className="text-lg font-semibold w-12 text-center transition-all duration-200">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all duration-150"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`flex-1 py-3 md:py-4 px-6 md:px-8 rounded-lg font-semibold transition-all duration-200 text-sm md:text-base ${
                  isAddingToCart 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95 hover:shadow-lg'
                }`}
              >
                {isAddingToCart ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 md:h-6 md:w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </span>
                ) : (
                  `Add to Cart - $${product.price * quantity}`
                )}
              </button>
              <button 
                onClick={handleWishlistToggle}
                className={`px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold transition-all text-lg md:text-xl sm:w-auto w-full group relative overflow-hidden ${
                  isInWishlist(product.id) 
                    ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                    : 'bg-gray-100 hover:bg-gray-200 hover:text-red-500'
                } ${isHeartAnimating ? 'animate-pulse scale-110' : 'hover:scale-105'}`}
              >
                <span className={`transition-all duration-300 ${isHeartAnimating ? 'animate-bounce' : ''}`}>
                  {isInWishlist(product.id) ? '❤️' : '🤍'}
                </span>
                
                {/* Ripple effect */}
                <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                  isHeartAnimating ? 'bg-red-400/20 scale-150' : 'scale-0'
                }`}></div>
              </button>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-lg text-green-600 font-medium">In Stock - Ships in 1-2 business days</span>
            </div>

            {/* Key Features */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl md:text-2xl font-semibold mb-4">Key Features</h3>
              <ul className="space-y-3">
                {product.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-1 text-lg">✓</span>
                    <span className="text-base md:text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sticky Navigation with Scroll Spy */}
        <div className="mt-16 sticky top-20 z-30 bg-white/95 backdrop-blur-sm py-6 mb-16">
          <div className="flex justify-center space-x-8">
            <button
              onClick={() => scrollToSection(descriptionRef, 'description')}
              className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
                activeSection === 'description'
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => scrollToSection(specificationsRef, 'specifications')}
              className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
                activeSection === 'specifications'
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => scrollToSection(reviewsRef, 'reviews')}
              className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
                activeSection === 'reviews'
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              Reviews
            </button>
          </div>
        </div>

        {/* Description Section */}
        <div ref={descriptionRef} className="scroll-mt-32">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Description</h2>
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8 text-gray-700 leading-loose tracking-wide">
                <p className="text-lg md:text-xl font-medium">
                  <strong>Welcome to a new dimension of personalization.</strong>
                </p>
                
                <p className="text-lg md:text-xl">
                  Spectra Vision is a next-generation wearable that brings the power of intelligent personalization into your everyday life. Designed to adapt and respond in real time, it enhances your experience across work, leisure, and everything in between. By learning from your habits, Spectra Vision offers insights and suggestions tailored to your preferences and environment. Supported by our powerful AI model, it presents what matters, exactly when you need it. Expand your universe with Spectra Vision.
                </p>
                
                {isDescriptionExpanded && (
                  <div className="space-y-8 animate-fade-in">
                    <p className="text-base md:text-lg">
                      Spectra Vision was born from a simple belief: technology should understand more than it serves. It pays attention to the rhythms of your life—what you linger on, what you skip, and turns that awareness into moment-to-moment relevance. More than just a device, it's an intelligent companion that learns from you to help make each day feel smoother and more intentional.
                    </p>
                    
                    <p className="text-base md:text-lg">
                      Built with a sleek, lightweight design, Spectra integrates effortlessly into your routine, delivering personalized recommendations directly into your view. Whether you're navigating a busy day or winding down in the evening, Spectra acts as your reliable, ever-present assistant. It processes your preferences to generate thoughtful, timely suggestions—from recommending what to watch next to guiding you toward smarter purchases.
                    </p>
                    
                    <p className="text-base md:text-lg">
                      Spectra doesn't require constant input to be effective. Drawing on ambient data and contextual insights, it learns what you love and when you need it most. This enables Spectra Vision to help you discover the right product, service, or spark of inspiration, often before you even think to ask. With intuitive controls and seamless connectivity, Spectra Vision offers a more intelligent way to engage with the world around you.
                    </p>
                    
                    <p className="text-base md:text-lg">
                      Privacy and trust are foundational to Spectra's design. With on-device AI processing and secure encryption, all data is handled locally to avoid cloud syncing or third-party access. It stores only what's necessary and learns solely for your benefit. Spectra Vision is equipped with intelligence and care to enrich your world.
                    </p>
                    
                    <p className="text-lg md:text-xl font-medium text-left pt-6">
                      <em>A world tailored to your mind.</em>
                    </p>
                  </div>
                )}
                
                <div className="flex justify-center pt-6">
                  <button
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="w-12 h-12 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full font-medium transition-all hover:scale-105 flex items-center justify-center"
                  >
                    <svg 
                      className={`w-6 h-6 transition-transform duration-300 ${isDescriptionExpanded ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        <div ref={specificationsRef} className="mt-24 scroll-mt-32">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Specifications</h2>
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <div key={key} className="flex flex-col space-y-3 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:shadow-md">
                    <span className="font-bold text-gray-900 text-base uppercase tracking-wide">{key}</span>
                    <span className="text-gray-700 text-base leading-relaxed">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div ref={reviewsRef} className="mt-24 scroll-mt-32">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Reviews</h2>
          <div className="bg-white rounded-2xl shadow-sm p-8">
            {/* Testimonial Carousel */}
            <div className="relative max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 shadow-lg hover:shadow-xl transition-all duration-500">
                <div className="min-h-[280px] flex items-center">
                  <div className={`flex space-x-10 w-full transition-all duration-500 ease-in-out transform ${
                    isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                  }`}>
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-28 h-28 rounded-full overflow-hidden mb-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <img 
                          src={testimonials[currentTestimonialIndex].avatar} 
                          alt={testimonials[currentTestimonialIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-bold text-gray-900 text-lg text-center leading-tight">{testimonials[currentTestimonialIndex].name}</p>
                    </div>
                    <div className="flex-1 min-w-0 pt-2">
                      <div className="mb-6">
                        <h5 className="font-bold text-3xl text-gray-900 mb-3 leading-tight">{testimonials[currentTestimonialIndex].headline}</h5>
                        <p className="text-base text-blue-600 font-semibold">{testimonials[currentTestimonialIndex].date}</p>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-xl font-light">{testimonials[currentTestimonialIndex].review}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={() => handleTestimonialChange(currentTestimonialIndex === 0 ? testimonials.length - 1 : currentTestimonialIndex - 1)}
                disabled={isTransitioning}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 w-14 h-14 bg-white rounded-full flex items-center justify-center hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 group"
              >
                <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => handleTestimonialChange(currentTestimonialIndex === testimonials.length - 1 ? 0 : currentTestimonialIndex + 1)}
                disabled={isTransitioning}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 w-14 h-14 bg-white rounded-full flex items-center justify-center hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 group"
              >
                <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Elegant Dots Indicator */}
              <div className="flex justify-center mt-8 space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleTestimonialChange(index)}
                    disabled={isTransitioning}
                    className={`h-2 rounded-full transition-all duration-300 disabled:opacity-50 ${
                      index === currentTestimonialIndex 
                        ? 'w-8 bg-blue-600 shadow-md' 
                        : 'w-2 bg-gray-300 hover:bg-gray-400 hover:scale-125'
                    }`}
                  />
                  ))}
              </div>
            </div>
          </div>
        </div>


        {/* Related Products */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-8">You might also like</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Link 
                key={relatedProduct.id} 
                to={`/product/${relatedProduct.id}`}
                className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square bg-gradient-radial from-blue-50 via-purple-50 to-gray-100">
                  <img
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-semibold mb-2">{relatedProduct.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">{relatedProduct.tagline}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">£{relatedProduct.price.toLocaleString()}</span>
                    <span className="text-blue-600 group-hover:text-blue-700 font-medium transition-colors">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;