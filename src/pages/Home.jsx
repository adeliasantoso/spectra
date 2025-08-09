import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import CartIcon from "../components/CartIcon";
import ProductQuickView from "../components/ProductQuickView";
import FAQ from "../components/FAQ";
import OptimizedImage from "../components/OptimizedImage";
import OptimizedVideo from "../components/OptimizedVideo";
import { measurePerformance, monitorBundleSize } from "../utils/performance";
import { useAutoRefresh } from "../hooks/useAutoRefresh";
import { setupCacheManagement } from "../utils/simpleCache";
import spectraGlassesImage from "../assets/images/landing-page/spectra1.png";
import aboutImage from "../assets/images/about-page/hero-about.png";
import expandUniverseImage from "../assets/images/landing-page/expandtheuniverseandcanceltheunwanted.png";
import unlockLifeImage from "../assets/images/landing-page/unlocklifeandlookthrough.png";
import cancelNoiseImage from "../assets/images/landing-page/expandtheuniverseandcanceltheunwanted.png";
import experienceDudeImage from "../assets/images/landing-page/experience-dude.png";
import social1Image from "../assets/images/landing-page/social1.png";
import social2Image from "../assets/images/landing-page/social2.png";
import social3Image from "../assets/images/landing-page/social3.png";

const Home = React.memo(() => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Auto-refresh for development
  useAutoRefresh();

  // Performance monitoring
  useEffect(() => {
    measurePerformance.logMetrics();
    monitorBundleSize();
    
    // Setup simple cache management
    setupCacheManagement();
  }, []);
  
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Video play/pause states for USP sections
  const [videoPaused, setVideoPaused] = useState({
    'expand-universe': false,
    'unlock-barriers': false,
    'smart-recognition': false,
    'cancel-noise': false,
    'look-through': false,
    'intuitive-insights': false
  });
  const uspVideoRefs = useRef({});
  
  // Animation state for sections
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});
  
  // Parallax scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
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
  


  // Spectra 1.0 product data for quick view
  const spectraProduct = {
    id: 'spectra-1-0',
    name: "Spectra 1.0",
    price: 2499,
    image: spectraGlassesImage,
    description: "Revolutionary AR smart glasses that seamlessly blend into your routine and deliver helpful, personalized suggestions. Experience the future of wearable technology with advanced AI integration and stunning visual clarity."
  };

  const handleQuickView = () => {
    setSelectedProduct(spectraProduct);
    setIsQuickViewOpen(true);
  };


  // Toggle play/pause for USP videos
  const toggleVideoPlayPause = (videoId) => {
    const video = uspVideoRefs.current[videoId];
    if (video) {
      if (video.paused) {
        video.play();
        setVideoPaused(prev => ({ ...prev, [videoId]: false }));
      } else {
        video.pause();
        setVideoPaused(prev => ({ ...prev, [videoId]: true }));
      }
    }
  };



  return (
    <div className="min-h-screen">
      <Navigation />
      <CartIcon />

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800" style={{ minHeight: '100vh' }}>
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <OptimizedVideo
            src="https://ik.imagekit.io/ohyemuffin/asset/video/Futuristic_Smart_Glasses_Video_Generation.mp4?updatedAt=1754214351100"
            className="w-full h-full object-cover"
            autoplay={true}
            muted={true}
            loop={true}
            playsInline={true}
            priority={true}
            lazy={false}
            fallbackImage="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100' height='100' fill='%23111827'/%3E%3C/svg%3E"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

        {/* Content */}
        <div className="relative z-30 flex items-end justify-center h-full pb-12 sm:pb-16 md:pb-16">
          <div className="text-center text-white px-4 sm:px-6 md:px-6 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-light mb-4 md:mb-6 leading-tight relative z-40">
              <div className="mb-2">
                <span className="animate-word-1 inline-block opacity-0">A</span>{' '}
                <span className="animate-word-2 inline-block opacity-0">world</span>{' '}
                <span className="animate-word-3 inline-block opacity-0">tailored</span>{' '}
                <span className="animate-word-4 inline-block opacity-0">to</span>
              </div>
              <div className="font-bold text-6xl md:text-8xl -mt-2 md:-mt-4 animate-word-5 opacity-0">your mind</div>
            </h1>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="text-white/80 hover:text-white transition-colors duration-300 cursor-pointer group">
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center group-hover:border-white transition-colors duration-300">
              <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-bounce group-hover:bg-white transition-colors duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Introducing Spectra 1.0 */}
      <section className="pt-0 pb-0 bg-white relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
          <div className="mb-0 max-w-3xl mx-auto relative">
            <OptimizedImage
              src={spectraGlassesImage}
              alt="Spectra 1.0"
              className="w-full h-auto rounded-xl sm:rounded-2xl"
              priority={true}
            />
            <div className="absolute top-0 left-0 right-0 flex items-start justify-center pt-8 sm:pt-12 md:pt-16 px-4">
              <h2 className="text-3xl md:text-5xl font-bold text-black drop-shadow-2xl text-center max-w-full whitespace-nowrap">
                Introducing the new Spectra 1.0
              </h2>
            </div>
          </div>
        </div>
      </section>


      {/* Expand Your Universe */}
      <section 
        id="expand-universe"
        ref={(el) => sectionRefs.current['expand-universe'] = el}
        className="py-16 md:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-20 items-center">
            <div className={`lg:col-span-3 lg:pr-8 order-2 lg:order-1 relative ${
              visibleSections.has('expand-universe') ? 'scroll-animate-video visible' : 'scroll-animate-video'
            }`}>
              <video
                ref={(el) => (uspVideoRefs.current['expand-universe'] = el)}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto aspect-video object-contain rounded-2xl bg-black"
              >
                <source src="https://ik.imagekit.io/ohyemuffin/asset/video/AI_TV_Tailors_Content_for_Family.mp4?updatedAt=1754214349805" type="video/mp4" />
                <div className="w-full h-full bg-gray-900 rounded-2xl"></div>
              </video>
              
              {/* Play/Pause Button */}
              <button
                onClick={() => toggleVideoPlayPause('expand-universe')}
                className="absolute bottom-2 right-8 w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                {videoPaused['expand-universe'] ? (
                  <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                )}
              </button>
            </div>
            <div className={`lg:col-span-2 space-y-6 md:space-y-8 order-1 lg:order-2 ${
              visibleSections.has('expand-universe') ? 'scroll-animate visible' : 'scroll-animate'
            }`}>
              <h2 className="text-3xl md:text-5xl font-light text-gray-900 leading-tight">
                Expand your universe
              </h2>
              <div className="space-y-4 md:space-y-6">
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Seamlessly integrated across all your platforms, Spectra builds tailored recommendations that reflect your unique preferences, even those you haven't yet put into words.
                </p>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Whether you're searching for places to go, meals to try, videos to watch, or ways to stay productive, every suggestion is carefully customized to your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unlock a Life Without Barriers */}
      <section 
        id="unlock-barriers"
        ref={(el) => sectionRefs.current['unlock-barriers'] = el}
        className="py-16 md:py-32 bg-gradient-to-bl from-gray-50 via-white to-gray-100 relative"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-20 items-center">
            <div className={`lg:col-span-2 space-y-6 md:space-y-8 ${
              visibleSections.has('unlock-barriers') ? 'scroll-animate visible' : 'scroll-animate'
            }`}>
              <h2 className="text-3xl md:text-5xl font-light text-gray-900 leading-tight">
                Unlock a life without barriers
              </h2>
              <div className="space-y-4 md:space-y-6">
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Powered by our latest AI model, Spectra uses ambient insights to help you move beyond everyday limitations.
                </p>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  From navigating locations to assisting in everyday conversations, Spectra provides intuitive insights that keep you connected and in control.
                </p>
              </div>
            </div>
            <div className={`lg:col-span-3 lg:pl-8 relative ${
              visibleSections.has('unlock-barriers') ? 'scroll-animate-video visible' : 'scroll-animate-video'
            }`}>
              <video
                ref={(el) => (uspVideoRefs.current['unlock-barriers'] = el)}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto aspect-video object-cover object-bottom rounded-2xl bg-black"
              >
                <source src="https://ik.imagekit.io/ohyemuffin/asset/video/Watch_Tracks_Active_Lifestyle.mp4?updatedAt=1754214349971" type="video/mp4" />
                <div className="w-full h-full bg-gray-900 rounded-2xl"></div>
              </video>
              
              {/* Play/Pause Button */}
              <button
                onClick={() => toggleVideoPlayPause('unlock-barriers')}
                className="absolute bottom-2 right-2 w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                {videoPaused['unlock-barriers'] ? (
                  <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Video USP Section 1 - Smart Recognition */}
      <section 
        id="smart-recognition"
        ref={(el) => sectionRefs.current['smart-recognition'] = el}
        className="py-16 md:py-24 bg-gray-50"
      >
        <div className="w-full">
          <div className={`relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden ${
            visibleSections.has('smart-recognition') ? 'animate-video-load-in' : ''
          }`}>
            <video
              ref={(el) => {
                if (el) {
                  uspVideoRefs.current['smart-recognition'] = el;
                }
              }}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="https://ik.imagekit.io/ohyemuffin/asset/video/smart-recognition.mp4?updatedAt=1753676355632"
                type="video/mp4"
              />
              <div className="w-full h-full bg-gray-800"></div>
            </video>
            
            {/* Play/Pause Button */}
            <button
              onClick={() => toggleVideoPlayPause('smart-recognition')}
              className="absolute bottom-4 right-4 w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group z-20 cursor-pointer"
            >
              {videoPaused['smart-recognition'] ? (
                <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              ) : (
                <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              )}
            </button>
          </div>
          
          {/* Caption moved below video */}
          <div className="text-center px-4 py-8 md:py-12">
            <h3 className={`text-2xl md:text-4xl font-bold text-gray-900 mb-4 ${
              visibleSections.has('smart-recognition') ? 'animate-caption-reveal stagger-1' : ''
            }`}>
              Smart Recognition
            </h3>
            <p className={`text-base md:text-lg text-gray-600 max-w-2xl mx-auto ${
              visibleSections.has('smart-recognition') ? 'animate-caption-reveal stagger-2' : ''
            }`}>
              See how Spectra identifies and adapts to your environment in real-time
            </p>
          </div>
        </div>
      </section>

      {/* Cancel the Unwanted Noise */}
      <section 
        id="cancel-noise"
        ref={(el) => sectionRefs.current['cancel-noise'] = el}
        className="py-16 md:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-20 items-center">
            <div className={`lg:col-span-3 lg:pr-8 order-2 lg:order-1 relative ${
              visibleSections.has('cancel-noise') ? 'scroll-animate-video visible' : 'scroll-animate-video'
            }`}>
              <video
                ref={(el) => (uspVideoRefs.current['cancel-noise'] = el)}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto aspect-video object-contain rounded-2xl bg-black"
              >
                <source src="https://ik.imagekit.io/ohyemuffin/asset/video/Immersive_Audio_on_a_Busy_Street.mp4?updatedAt=1754214349985" type="video/mp4" />
                <div className="w-full h-full bg-gray-900 rounded-2xl"></div>
              </video>
              
              {/* Play/Pause Button */}
              <button
                onClick={() => toggleVideoPlayPause('cancel-noise')}
                className="absolute bottom-2 right-8 w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                {videoPaused['cancel-noise'] ? (
                  <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                )}
              </button>
            </div>
            <div className={`lg:col-span-2 space-y-6 md:space-y-8 order-1 lg:order-2 ${
              visibleSections.has('cancel-noise') ? 'scroll-animate visible' : 'scroll-animate'
            }`}>
              <h2 className="text-3xl md:text-5xl font-light text-gray-900 leading-tight">
                Cancel the unwanted noise
              </h2>
              <div className="space-y-4 md:space-y-6">
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Spectra cuts through the noise and shows you only what matters to you, even when it comes to ads and product suggestions.
                </p>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  While using Spectra, you'll only hear from the brands you care about and see products that serve your needs. No intrusive content. Just relevance, always.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Look Through Your Head */}
      <section className="py-16 md:py-32 bg-gradient-to-bl from-gray-50 via-white to-gray-100 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-20 items-center">
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              <h2 className="text-3xl md:text-5xl font-light text-gray-900 leading-tight">
                See through your thoughts
              </h2>
              <div className="space-y-4 md:space-y-6">
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Spectra anticipates your needs by spotting patterns in your real-time activity.
                </p>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  As your trusted assistant, it creates hyper-personalized suggestions made just for you. Whatever you need—an app, product, or service—it's always just one tap away.
                </p>
              </div>
            </div>
            <div className="lg:col-span-3 lg:pl-8 relative">
              <video
                ref={(el) => (uspVideoRefs.current['look-through'] = el)}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto aspect-video object-contain rounded-2xl bg-black"
              >
                <source src="https://ik.imagekit.io/ohyemuffin/asset/video/look-through-your-head.mp4?updatedAt=1753676357987" type="video/mp4" />
                <div className="w-full h-full bg-gray-900 rounded-2xl"></div>
              </video>
              
              {/* Play/Pause Button */}
              <button
                onClick={() => toggleVideoPlayPause('look-through')}
                className="absolute bottom-2 right-2 w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                {videoPaused['look-through'] ? (
                  <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Video USP Section 2 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="w-full">
          <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
            <video
              ref={(el) => (uspVideoRefs.current['intuitive-insights'] = el)}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="https://ik.imagekit.io/ohyemuffin/asset/video/terakhir-sebelum-product.mp4?updatedAt=1753676358212"
                type="video/mp4"
              />
              <div className="w-full h-full bg-purple-800"></div>
            </video>
            
            {/* Play/Pause Button */}
            <button
              onClick={() => toggleVideoPlayPause('intuitive-insights')}
              className="absolute bottom-4 right-4 w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group z-10"
            >
              {videoPaused['intuitive-insights'] ? (
                <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              ) : (
                <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              )}
            </button>
          </div>
          
          {/* Caption moved below video */}
          <div className="text-center px-4 py-8 md:py-12">
            <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Intuitive Insights
            </h3>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Experience personalized recommendations that understand your lifestyle
            </p>
          </div>
        </div>
      </section>

      {/* Experience the Future, Today */}
      <section className="pt-16 md:pt-24 pb-16 md:pb-32 bg-white relative">
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-center">
            <div className="order-2 lg:order-1 lg:col-span-3 relative group flex justify-center">
              <div className="relative max-w-md lg:max-w-lg xl:max-w-xl">
                <img
                  src={experienceDudeImage}
                  alt="Experience Dude"
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105 rounded-2xl"
                />
                
                {/* Hover overlay with Quick View button */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={handleQuickView}
                    className="bg-white text-black px-4 md:px-6 py-1.5 md:py-2 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-100 text-sm md:text-base"
                  >
                    Quick View
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-8 md:space-y-12 order-1 lg:order-2 text-center lg:text-left">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Experience
                <br />
                the future,
                <br />
                today
              </h2>
              <div className="flex justify-center lg:justify-start">
                <Link
                  to="/shop"
                  className="inline-block bg-black text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-bold hover:bg-gray-800 transition-colors duration-200"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-16 md:py-32 bg-gradient-to-b from-gray-200 via-gray-100 to-gray-75 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-300/20 via-transparent to-gray-200/30"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-200/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-75/80 to-transparent"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-8 lg:px-12 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 md:p-16 lg:p-20 shadow-xl">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-12 md:mb-16">
              About us
            </h2>
            <div className="space-y-4 md:space-y-6 mb-12 md:mb-20 max-w-4xl mx-auto">
              <p className="text-base md:text-lg text-gray-600 leading-loose">
                At the forefront of modern innovation, we design technology that puts people first.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-loose">
                Combining intelligence with intention, we believe technology should adapt to your needs, not the other way around.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-loose">
                Our vision is grounded in building a more intuitive future, one device at a time.
              </p>
            </div>
            <Link
              to="/about"
              className="inline-block bg-black text-white px-8 py-4 md:px-12 md:py-6 rounded-full text-lg md:text-xl font-bold hover:bg-gray-800 transition-colors duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Follow Us on Social */}
      <section className="py-16 md:py-32 bg-gradient-to-b from-gray-75 via-gray-50 to-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/25 via-transparent to-white/50"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-75/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/90 to-transparent"></div>
        <div className="relative z-10 max-w-full mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 text-center mb-12 md:mb-20">
            Follow us on social
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <div>
              <img
                src={social1Image}
                alt="Social 1"
                className="w-full h-80 sm:h-96 md:h-[500px] object-cover rounded-2xl"
              />
            </div>
            <div>
              <img
                src={social2Image}
                alt="Social 2"
                className="w-full h-80 sm:h-96 md:h-[500px] object-cover rounded-2xl"
              />
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <img
                src={social3Image}
                alt="Social 3"
                className="w-full h-80 sm:h-96 md:h-[500px] object-cover rounded-2xl"
              />
            </div>
          </div>
          
          {/* Social Media Buttons */}
          <div className="flex justify-center items-center space-x-4 md:space-x-8 mt-8 md:mt-16">
            {/* Instagram */}
            <a href="#" className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* Twitter */}
            <a href="#" className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            {/* Meta */}
            <a href="#" className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      <Footer />

      {/* Quick View Modal */}
      {isQuickViewOpen && selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          onClose={() => {
            setIsQuickViewOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
