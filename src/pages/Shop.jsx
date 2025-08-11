import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import CartIcon from "../components/CartIcon";
import ProductQuickView from "../components/ProductQuickView";
import OptimizedImage from "../components/OptimizedImage";
import { getAllProducts, getProductsByCategory, CATEGORIES } from "../data/products";

const Shop = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Animation state for sections
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});
  
  const allProducts = getAllProducts();
  const filteredProducts = selectedCategory === 'all' 
    ? allProducts 
    : getProductsByCategory(selectedCategory);

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

  const handleCategoryChange = (category) => {
    if (category === selectedCategory) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedCategory(category);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  };
    
  const categoryLabels = {
    'all': 'All Products',
    [CATEGORIES.WEARABLES]: 'Wearables',
    [CATEGORIES.AUDIO]: 'Audio',
    [CATEGORIES.DISPLAY]: 'Display'
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <CartIcon />

      {/* White spacing below navbar */}
      <div className="bg-white h-20 sm:h-28 md:h-36 lg:h-44"></div>

      {/* Header */}
      <section 
        id="shop-header"
        ref={(el) => sectionRefs.current['shop-header'] = el}
        className="py-6 sm:py-8 md:py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
          <h1 className="scroll-fade-up text-2xl md:text-4xl font-semibold text-black mb-6 sm:mb-8">
            Explore Our Latest Products
          </h1>
          
          {/* Category Filter */}
          <div className="scroll-fade-up flex justify-center mb-8">
            <div className="flex flex-wrap gap-2 bg-gray-100 p-1.5 sm:p-2 rounded-lg justify-center">
              {Object.entries(categoryLabels).map(([key, label], index) => (
                <button
                  key={key}
                  onClick={() => handleCategoryChange(key)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-medium transition-all duration-200 text-sm md:text-base ${
                    selectedCategory === key
                      ? 'bg-black text-white shadow-md'
                      : 'bg-transparent text-gray-600 hover:bg-gray-200'
                  } ${visibleSections.has('shop-header') ? 'animate-scale-in' : ''}`}
                  style={{
                    animationDelay: visibleSections.has('shop-header') ? `${400 + (index * 100)}ms` : '0ms'
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-8 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 transition-all duration-300 ${
            isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
          }`}>
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="text-center group interactive-hover scroll-scale-up"
              >
                {/* Product Image with Quick View icon */}
                <div 
                  className={`relative overflow-hidden mb-3 md:mb-4 ${product.id === 'spectra-1-0' ? 'cursor-pointer' : 'cursor-default'}`} 
                  onClick={() => {
                    if (product.id === 'spectra-1-0') {
                      navigate(`/product/${product.id}`);
                    }
                  }}
                >
                  <OptimizedImage
                    src={product.images[0]}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300 rounded-2xl"
                  />
                  
                  {/* Quick View Icon - small floating button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                      setIsQuickViewOpen(true);
                    }}
                    className="absolute top-3 right-3 w-10 h-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 btn-enhanced"
                    title="Quick View"
                  >
                    <svg 
                      className="w-5 h-5 text-gray-700" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 616 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>

                <div 
                  className={`block ${product.id === 'spectra-1-0' ? 'cursor-pointer' : 'cursor-default'}`} 
                  onClick={() => {
                    if (product.id === 'spectra-1-0') {
                      navigate(`/product/${product.id}`);
                    }
                  }}
                >
                  {/* Product Category */}
                  <p className="text-xs md:text-sm text-gray-500 mb-1">{product.tagline}</p>
                  
                  {/* Product Name */}
                  <h3 className="text-base md:text-lg font-medium text-black mb-1 md:mb-2">
                    {product.name}
                  </h3>

                  {/* Product Price */}
                  <p className="text-base md:text-lg font-semibold text-black">£{product.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
};

export default Shop;
