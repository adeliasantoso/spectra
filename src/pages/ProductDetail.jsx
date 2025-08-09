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
  const [expandAnimationKey, setExpandAnimationKey] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeSection, setActiveSection] = useState('description');
  const descriptionRef = useRef(null);
  const specificationsRef = useRef(null);
  const reviewsRef = useRef(null);

  // Animation state for sections
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

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
  
  // Reset component state when product ID changes
  useEffect(() => {
    console.log('Product ID changed to:', id);
    console.log('Product data:', product);
    
    if (product) {
      setSelectedImage(0);
      setSelectedColor(product.colors?.[0] || 'Black');
      setQuantity(1);
      setActiveTab('description');
      setIsDescriptionExpanded(false);
      setCurrentTestimonialIndex(0);
      setIsTransitioning(false);
      setActiveSection('description');
      
      // Reset animation visibility state
      setVisibleSections(new Set());
      
      // Scroll to top when product changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      console.log('Product state reset completed for:', product.name);
    }
  }, [id, product]);

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
      headline: 'Really love Spectra 1.0!',
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

  // Animation observer for scroll-triggered animations
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

    // Observe all sections
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
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

      success('Added to cart');
    } catch (err) {
      error('Failed to add');
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
      success('Wishlist saved');
    } else {
      info('Wishlist removed');
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

      <div 
        id="product-detail-main"
        ref={(el) => sectionRefs.current['product-detail-main'] = el}
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-20 sm:pt-24 md:pt-32 pb-8 sm:pb-12"
        style={{ minHeight: '60vh' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Product Images */}
          <div className={`space-y-4 transition-all duration-700 ${
            visibleSections.has('product-detail-main') ? 'animate-fade-up opacity-100' : 'opacity-100'
          }`}>
            {/* Main Image */}
            <div className="aspect-square rounded-xl overflow-hidden">
              <OptimizedImage
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                priority={true}
                lazy={false}
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageSelect(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden transition-all ${
                    selectedImage === index ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-gray-300'
                  }`}
                >
                  <OptimizedImage
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className={`w-full h-full ${index === 1 ? 'object-cover p-0' : 'object-contain p-2'}`}
                    lazy={true}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className={`space-y-8 transition-all duration-700 delay-200 ${
            visibleSections.has('product-detail-main') ? 'animate-fade-up opacity-100' : 'opacity-100'
          }`}>
            {/* Header */}
            <div>
              <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-3">{product.name}</h1>
              <p className="text-base md:text-lg text-gray-600 mb-6">{product.tagline}</p>
              

              {/* Price */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-8">
                <span className="text-xl md:text-2xl font-semibold text-gray-900">${product.price}</span>
                <span className="text-base md:text-lg text-gray-500 line-through">${product.originalPrice}</span>
                <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded w-fit">
                  Save ${product.originalPrice - product.price}
                </span>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-3">Color</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedColor === color 
                        ? 'bg-black text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all duration-150"
                >
                  -
                </button>
                <span className="text-base md:text-lg font-semibold w-12 text-center transition-all duration-200">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all duration-150"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart & Wishlist */}
            <div className="flex space-x-3">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`flex-1 py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-lg font-medium transition-all duration-200 text-base ${
                  isAddingToCart 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-black text-white hover:bg-gray-800 hover:scale-105 active:scale-95 hover:shadow-lg'
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
                className={`w-12 h-12 md:w-14 md:h-14 rounded-lg font-semibold transition-all group relative overflow-hidden flex items-center justify-center ${
                  isInWishlist(product.id) 
                    ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-red-500'
                } ${isHeartAnimating ? 'animate-pulse scale-110' : 'hover:scale-105'}`}
              >
                <span className={`text-lg transition-all duration-300 ${isHeartAnimating ? 'animate-bounce' : ''}`}>
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
              <span className="text-sm md:text-base text-green-600 font-medium">In Stock - Ships in 1-2 business days</span>
            </div>

            {/* Key Features */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-4">Key Features</h3>
              <ul className="space-y-3">
                {product.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-1 text-base">✓</span>
                    <span className="text-sm md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sticky Navigation with Scroll Spy */}
        <div className="mt-12 sm:mt-16 sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-sm py-4 sm:py-6 mb-12 sm:mb-16">
          <div className="flex justify-center space-x-2 sm:space-x-4 md:space-x-8 px-4 overflow-x-auto product-tabs-container">
            <button
              onClick={() => scrollToSection(descriptionRef, 'description')}
              className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 whitespace-nowrap ${
                activeSection === 'description'
                  ? 'bg-black text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => scrollToSection(specificationsRef, 'specifications')}
              className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 whitespace-nowrap ${
                activeSection === 'specifications'
                  ? 'bg-black text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => scrollToSection(reviewsRef, 'reviews')}
              className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 whitespace-nowrap ${
                activeSection === 'reviews'
                  ? 'bg-black text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              Reviews
            </button>
          </div>
        </div>

        {/* Description Section */}
        <div 
          id="description-section"
          ref={(el) => {
            descriptionRef.current = el;
            sectionRefs.current['description-section'] = el;
          }}
          className="scroll-mt-32"
        >
          <h2 className={`text-xl md:text-2xl font-bold text-gray-900 mb-8 transition-all duration-700 ${
            visibleSections.has('description-section') ? 'animate-fade-up opacity-100' : 'opacity-100'
          }`}>Description</h2>
          <div className={`bg-white rounded-2xl shadow-sm p-8 transition-all duration-700 delay-200 ${
            visibleSections.has('description-section') ? 'animate-fade-up opacity-100' : 'opacity-100'
          }`}>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8 text-gray-700 leading-loose tracking-wide">
                {product.id === 'spectra-1-0' ? (
                  <>
                    <p className="text-base md:text-lg font-medium">
                      <strong>Welcome to a new dimension of personalization.</strong>
                    </p>
                    
                    <p className="text-base md:text-lg">
                      Spectra 1.0 is a next-generation wearable that brings the power of intelligent personalization into your everyday life. Designed to adapt and respond in real time, it enhances your experience across work, leisure, and everything in between. By learning from your habits, Spectra 1.0 offers insights and suggestions tailored to your preferences and environment. Supported by our powerful AI model, it presents what matters, exactly when you need it. Expand your universe with Spectra 1.0.
                    </p>
                    
                    {isDescriptionExpanded && (
                      <div key={expandAnimationKey} className="space-y-8 animate-fade-in">
                        <p className="text-sm md:text-base">
                          Spectra 1.0 was born from a simple belief: technology should understand more than it serves. It pays attention to the rhythms of your life—what you linger on, what you skip, and turns that awareness into moment-to-moment relevance. More than just a device, it's an intelligent companion that learns from you to help make each day feel smoother and more intentional.
                        </p>
                        
                        <p className="text-sm md:text-base">
                          Built with a sleek, lightweight design, Spectra integrates effortlessly into your routine, delivering personalized recommendations directly into your view. Whether you're navigating a busy day or winding down in the evening, Spectra acts as your reliable, ever-present assistant. It processes your preferences to generate thoughtful, timely suggestions—from recommending what to watch next to guiding you toward smarter purchases.
                        </p>
                        
                        <p className="text-sm md:text-base">
                          Spectra doesn't require constant input to be effective. Drawing on ambient data and contextual insights, it learns what you love and when you need it most. This enables Spectra 1.0 to help you discover the right product, service, or spark of inspiration, often before you even think to ask. With intuitive controls and seamless connectivity, Spectra 1.0 offers a more intelligent way to engage with the world around you.
                        </p>
                        
                        <p className="text-sm md:text-base">
                          Privacy and trust are foundational to Spectra's design. With on-device AI processing and secure encryption, all data is handled locally to avoid cloud syncing or third-party access. It stores only what's necessary and learns solely for your benefit. Spectra 1.0 is equipped with intelligence and care to enrich your world.
                        </p>
                        
                        <p className="text-base md:text-lg font-medium text-left pt-6">
                          <em>A world tailored to your mind.</em>
                        </p>
                      </div>
                    )}
                    
                    <div className="flex justify-center pt-6">
                      <button
                        onClick={() => {
                          setIsDescriptionExpanded(!isDescriptionExpanded);
                          setExpandAnimationKey(prev => prev + 1);
                        }}
                        className="w-12 h-12 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full font-medium transition-all hover:scale-105 flex items-center justify-center"
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
                  </>
                ) : product.id === 'spectra-buds' ? (
                  <>
                    <p className="text-base md:text-lg font-medium">
                      <strong>Audio, attuned to you.</strong>
                    </p>
                    
                    <p className="text-base md:text-lg">
                      Spectra Buds redefines your relationship with sound. These next-generation wireless earbuds adapt intelligently to your environment, delivering rich, spatial audio that shifts seamlessly with your day from focus to movement, from silence to cityscape.
                    </p>
                    
                    {isDescriptionExpanded && (
                      <div key={expandAnimationKey} className="space-y-8 animate-fade-in">
                        <p className="text-sm md:text-base">
                          They don't just play what you love; they understand how you listen. By detecting ambient noise, your movement, and even your routine, Spectra Buds tailor their output in real time to suit the moment whether you're deep in work mode, on a call, or simply unwinding.
                        </p>
                        
                        <p className="text-sm md:text-base">
                          Spectra Buds were created from a vision that audio should respond, not interrupt. Rather than forcing you to adapt, they tune themselves around you letting sound become a natural extension of how you live.
                        </p>
                        
                        <p className="text-sm md:text-base">
                          The transitions feel almost invisible. As you leave a quiet café and step into the street, the earbuds automatically shift to prioritize clarity and awareness. During commutes, they balance immersive sound with the outside world. In every shift, Spectra Buds know what you need to hear and what you don't.
                        </p>
                        
                        <p className="text-sm md:text-base">
                          Designed to work in harmony with your Spectra devices, audio follows you fluidly between contexts. Take a call on your Watch, continue on your Vision glasses without ever losing clarity or connection.
                        </p>
                        
                        <p className="text-sm md:text-base">
                          With smart charging, adaptive battery modes, and intuitive gestures, Spectra Buds disappear into your flow. No friction, just fidelity.
                        </p>
                        
                        <p className="text-base md:text-lg font-medium text-left pt-6">
                          <em>A soundtrack shaped around your life.</em>
                        </p>
                      </div>
                    )}
                    
                    <div className="flex justify-center pt-6">
                      <button
                        onClick={() => {
                          setIsDescriptionExpanded(!isDescriptionExpanded);
                          setExpandAnimationKey(prev => prev + 1);
                        }}
                        className="w-12 h-12 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full font-medium transition-all hover:scale-105 flex items-center justify-center"
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
                  </>
                ) : product.id === 'spectra-display' ? (
                  <>
                    <p className="text-base md:text-lg font-medium">
                      <strong>Entertainment that adjusts to your household.</strong>
                    </p>
                    
                    <p className="text-base md:text-lg">
                      Spectra Display brings intelligent personalization to the heart of your home. More than a smart TV, it's a shared interface that learns the rhythms, tastes, and moments that make your family unique and curates an experience to reflect them.
                    </p>
                    
                    {isDescriptionExpanded && (
                      <div key={expandAnimationKey} className="space-y-8 animate-fade-in">
                        <p className="text-sm md:text-base">
                          Every member of the household is recognized instantly. Spectra adjusts content suggestions, brightness, even sound profiles based on who's watching and when. Parents catch up on the news in the morning, kids jump into animation in the afternoon, and everyone winds down together in the evening with content tuned to shared interests.
                        </p>
                        
                        <p className="text-sm md:text-base">
                          This isn't just entertainment it's attunement. Spectra Display adapts the room's lighting, balances volume dynamically based on seating patterns, and even offers subtle wellness cues for screen time awareness.
                        </p>
                        
                        <p className="text-sm md:text-base">
                          We designed Spectra Display with one question in mind: Can a screen feel more like part of the family? The answer is in how it listens, responds, and gently organizes your digital world around your home's real life.
                        </p>
                        
                        <p className="text-sm md:text-base">
                          Integrated reminders, seamless calendar sync, and ambient information make Spectra Display a central hub not just for watching, but for living.
                        </p>
                        
                        <p className="text-base md:text-lg font-medium text-left pt-6">
                          <em>A living room that listens, and responds.</em>
                        </p>
                      </div>
                    )}
                    
                    <div className="flex justify-center pt-6">
                      <button
                        onClick={() => {
                          setIsDescriptionExpanded(!isDescriptionExpanded);
                          setExpandAnimationKey(prev => prev + 1);
                        }}
                        className="w-12 h-12 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full font-medium transition-all hover:scale-105 flex items-center justify-center"
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
                  </>
                ) : product.id === 'spectra-watch' ? (
                  <>
                    <p className="text-base md:text-lg font-medium">
                      <strong>Health that learns your rhythm.</strong>
                    </p>
                    
                    <p className="text-base md:text-lg">
                      Spectra Watch transforms the way you engage with health and productivity. More than tracking steps and stats, it learns the unique patterns of your body and schedule, offering insights that are not only personalized but predictive.
                    </p>
                    
                    {isDescriptionExpanded && (
                      <div key={expandAnimationKey} className="space-y-8 animate-fade-in">
                        <p className="text-sm md:text-base">
                          Rather than giving you generic goals, Spectra Watch recognizes what balance looks like for you. It identifies subtle deviations like rising stress levels before you feel them, or changes in sleep before they impact your energy. It guides with just the right nudge, at just the right time.
                        </p>
                        
                        <p className="text-sm md:text-base">
                          Built to flow with your day, Spectra Watch adapts how it operates. On work-heavy days, it highlights focus tools and meetings. During downtime, it leans into fitness, recovery, and mindfulness. This isn't a feature list it's a companion calibrated to your intent.
                        </p>
                        
                        <p className="text-sm md:text-base">
                          Spectra Watch was born from the belief that wellness shouldn't be reactive. By sensing, interpreting, and adapting, it brings intelligence to your wrist not to overwhelm, but to support.
                        </p>
                        
                        <p className="text-sm md:text-base">
                          In sync with your other Spectra devices, Watch extends its insights across your ecosystem: visualize heart rate trends on Display, receive workout cues in Vision, or review recovery recommendations with Buds on.
                        </p>
                        
                        <p className="text-sm md:text-base">
                          Data stays where it belongs: with you. On-device learning and encrypted processing ensure privacy by default, not as an afterthought.
                        </p>
                        
                        <p className="text-base md:text-lg font-medium text-left pt-6">
                          <em>The better you know yourself, the better you move through the world.</em>
                        </p>
                      </div>
                    )}
                    
                    <div className="flex justify-center pt-6">
                      <button
                        onClick={() => {
                          setIsDescriptionExpanded(!isDescriptionExpanded);
                          setExpandAnimationKey(prev => prev + 1);
                        }}
                        className="w-12 h-12 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full font-medium transition-all hover:scale-105 flex items-center justify-center"
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
                  </>
                ) : (
                  <p className="text-base md:text-lg">
                    {product.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        <div 
          id="specifications-section"
          ref={(el) => {
            specificationsRef.current = el;
            sectionRefs.current['specifications-section'] = el;
          }}
          className="scroll-mt-32 mt-16 sm:mt-20"
        >
          <h2 className={`text-xl md:text-2xl font-bold text-gray-900 mb-8 transition-all duration-700 ${
            visibleSections.has('specifications-section') ? 'animate-fade-up opacity-100' : 'opacity-100'
          }`}>Specifications</h2>
          <div className={`bg-white rounded-2xl shadow-sm p-8 transition-all duration-700 delay-200 ${
            visibleSections.has('specifications-section') ? 'animate-fade-up opacity-100' : 'opacity-100'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.specifications).map(([key, value], index) => (
                <div key={key} className="flex flex-col space-y-3 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:shadow-md">
                  <dt className="font-semibold text-gray-800 text-base md:text-lg">{key}</dt>
                  <dd className="text-gray-600 text-sm md:text-base leading-relaxed">{value}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div 
          id="reviews-section"
          ref={(el) => {
            reviewsRef.current = el;
            sectionRefs.current['reviews-section'] = el;
          }}
          className="scroll-mt-32 mt-16 sm:mt-20"
        >
          <h2 className={`text-xl md:text-2xl font-bold text-gray-900 mb-12 text-center transition-all duration-700 ${
            visibleSections.has('reviews-section') ? 'animate-fade-up opacity-100' : 'opacity-100'
          }`}>Customer Reviews</h2>
          <div className={`transition-all duration-700 delay-200 ${
            visibleSections.has('reviews-section') ? 'animate-fade-up opacity-100' : 'opacity-100'
          }`}>
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
                      <p className="font-semibold text-gray-900 text-sm md:text-base text-center leading-tight">{testimonials[currentTestimonialIndex].name}</p>
                    </div>
                    <div className="flex-1 min-w-0 pt-2">
                      <div className="mb-6">
                        <h5 className="font-semibold text-xl md:text-2xl text-gray-900 mb-3 leading-tight">{testimonials[currentTestimonialIndex].headline}</h5>
                        <p className="text-xs text-blue-600 font-medium">{testimonials[currentTestimonialIndex].date}</p>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base font-normal">{testimonials[currentTestimonialIndex].review}</p>
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
      </div>

      {/* Related Products */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-12 text-center">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                to={`/product/${relatedProduct.id}`}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-[1.02]"
              >
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{relatedProduct.name}</h3>
                  <p className="text-gray-600 text-sm md:text-base mb-3">{relatedProduct.tagline}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-base md:text-lg font-semibold">£{relatedProduct.price.toLocaleString()}</span>
                    <span className="text-blue-600 group-hover:text-blue-700 font-medium transition-colors text-sm md:text-base">
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