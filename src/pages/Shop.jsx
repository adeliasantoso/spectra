import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import CartIcon from "../components/CartIcon";
import ProductQuickView from "../components/ProductQuickView";
import OptimizedImage from "../components/OptimizedImage";
import spectraImage from "../assets/images/landing-page/spectra1.png";

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const products = [
    {
      id: 1,
      name: "Spectra 1.0",
      price: "£2,499",
      image: spectraImage,
    },
    {
      id: 2,
      name: "Spectra Vision Elite",
      price: "£899",
      image: spectraImage,
    },
    {
      id: 3,
      name: "Spectra Vision Lite",
      price: "£649",
      image: spectraImage,
    },
    {
      id: 4,
      name: "Spectra Vision Classic",
      price: "£429",
      image: spectraImage,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <CartIcon />

      {/* White spacing below navbar */}
      <div className="bg-white h-36 md:h-44"></div>

      {/* Header */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            Explore Our Latest Products
          </h1>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-8 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {products.map((product) => (
              <div
                key={product.id}
                className="text-center group cursor-pointer"
                onClick={() => {
                  setSelectedProduct(product);
                  setIsQuickViewOpen(true);
                }}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden mb-3 md:mb-4">
                  <OptimizedImage
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300 rounded-2xl"
                  />

                  {/* Quick View Button - appears on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                        setIsQuickViewOpen(true);
                      }}
                      className="bg-white text-black px-4 md:px-6 py-1.5 md:py-2 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-100 text-sm md:text-base"
                    >
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Product Name */}
                <h3 className="text-base md:text-lg lg:text-xl font-medium text-black mb-1 md:mb-2">
                  {product.name}
                </h3>

                {/* Product Price */}
                <p className="text-base md:text-lg lg:text-xl text-black">{product.price}</p>
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
