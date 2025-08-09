import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import introNewSpectraAndExperienceTheFutureToday from '../assets/images/landing-page/intronewspectraandexperiencethefuturetoday.png';
import ProductQuickView from '../components/ProductQuickView';

const CallToAction = () => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const featuredProduct = {
    id: 'featured-1',
    name: 'Spectra 1.0',
    price: '£1,099',
    image: introNewSpectraAndExperienceTheFutureToday,
    description: 'Advanced neural integration smart glasses with cutting-edge AI technology.'
  };

  const handleImageClick = () => {
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Product Image */}
            <div className="flex justify-center group cursor-pointer" onClick={handleImageClick}>
              <div className="relative">
                <img
                  src={introNewSpectraAndExperienceTheFutureToday}
                  alt="Spectra Smart Glasses"
                  className="w-full max-w-lg h-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Quick View Button - appears on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={handleImageClick}
                    className="bg-white text-black px-6 py-2 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-100"
                  >
                    Quick View
                  </button>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-8">
                Experience the future, today.
              </h3>
              
              <Link 
                to="/shop"
                className="inline-block bg-black text-white px-8 py-4 text-lg font-medium hover:bg-gray-800 transition-colors duration-200"
              >
                Shop
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <ProductQuickView
          product={featuredProduct}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
};

export default CallToAction;