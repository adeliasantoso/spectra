import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import CartIcon from "../components/CartIcon";
import ProductQuickView from "../components/ProductQuickView";
import OptimizedImage from "../components/OptimizedImage";
import { getAllProducts, getProductsByCategory, CATEGORIES } from "../data/products";

const Shop = () => {
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
          <h1 className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 sm:mb-8 transition-all duration-700 ${
            visibleSections.has('shop-header') ? 'animate-fade-up opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            Explore Our Latest Products
          </h1>
          
          {/* Category Filter */}
          <div className={`flex justify-center mb-8 transition-all duration-700 delay-200 ${
            visibleSections.has('shop-header') ? 'animate-fade-up opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            <div className="flex flex-wrap gap-2 bg-gray-100 p-1.5 sm:p-2 rounded-lg justify-center">
              {Object.entries(categoryLabels).map(([key, label], index) => (
                <button
                  key={key}
                  onClick={() => handleCategoryChange(key)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-medium transition-all duration-200 text-sm sm:text-base ${
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
      <section 
        id="products-grid"
        ref={(el) => sectionRefs.current['products-grid'] = el}
        className="pb-8 md:pb-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 transition-all duration-300 ${
            isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
          }`}>
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`text-center group transition-all duration-700 ${
                  isTransitioning 
                    ? 'opacity-0 transform translate-y-4' 
                    : visibleSections.has('products-grid')
                      ? 'opacity-100 transform translate-y-0 animate-fade-up'
                      : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isTransitioning ? '0ms' : visibleSections.has('products-grid') ? `${index * 150}ms` : '0ms'
                }}
              >
                {/* Product Image with Quick View overlay */}
                <div className="relative overflow-hidden mb-3 md:mb-4">
                  <Link to={`/product/${product.id}`}>
                    <OptimizedImage
                      src={product.images[0]}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300 rounded-2xl"
                    />
                  </Link>
                  
                  {/* Quick View Button - appears on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsQuickViewOpen(true);
                      }}
                      className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg transform translate-y-2 group-hover:translate-y-0"
                    >
                      Quick View
                    </button>
                  </div>
                </div>

                <Link to={`/product/${product.id}`} className="block">
                  {/* Product Category */}
                  <p className="text-sm text-gray-500 mb-1">{product.tagline}</p>
                  
                  {/* Product Name */}
                  <h3 className="text-base md:text-lg lg:text-xl font-medium text-black mb-1 md:mb-2">
                    {product.name}
                  </h3>

                  {/* Product Price */}
                  <p className="text-base md:text-lg lg:text-xl text-black">£{product.price.toLocaleString()}</p>
                </Link>
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
