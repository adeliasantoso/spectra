import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import CartIcon from "../components/CartIcon";
import OptimizedImage from "../components/OptimizedImage";
import { getAllProducts, getProductsByCategory, CATEGORIES } from "../data/products";

const Shop = () => {
  const navigate = useNavigate();
  
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
      <div className="bg-white h-16 sm:h-20 md:h-24"></div>

      {/* Header */}
      <section 
        id="shop-header"
        ref={(el) => sectionRefs.current['shop-header'] = el}
        className="py-4 sm:py-6 md:py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
          <h1 className={`text-3xl md:text-5xl font-semibold text-black mb-6 sm:mb-8 transform transition-all duration-1000 ease-out ${
            visibleSections.has('shop-header') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '200ms' }}>
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
                {/* Product Image - clickable for Spectra 1.0 */}
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
                    className={`w-full aspect-square transition-transform duration-300 rounded-2xl ${
                      product.id === 'spectra-buds' ? 'object-contain p-20 group-hover:scale-105' : 
                      product.id === 'spectra-watch' ? 'object-contain p-20 group-hover:scale-105' :
                      product.id === 'spectra-display' ? 'object-cover scale-110 group-hover:scale-115' :
                      product.id === 'spectra-1-0' ? 'object-cover scale-110 group-hover:scale-115' : 'object-cover group-hover:scale-105'
                    }`}
                  />
                  
                  {/* View Details button - appears on hover for Spectra 1.0 */}
                  {product.id === 'spectra-1-0' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl">
                      <span className="bg-white text-black px-6 py-3 rounded-full font-medium text-sm md:text-base shadow-lg hover:bg-gray-100 transition-all duration-200">
                        View Details →
                      </span>
                    </div>
                  )}
                </div>

                <div 
                  className={`block pb-4 md:pb-6 ${product.id === 'spectra-1-0' ? 'cursor-pointer' : 'cursor-default'}`} 
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
    </div>
  );
};

export default Shop;
