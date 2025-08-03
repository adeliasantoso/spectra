import React, { useState, memo } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = memo(() => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] shadow-md ${
        isHomePage ? "bg-[rgba(115,115,115,0.6)]" : "bg-[rgba(115,115,115,255)]"
      }`}
    >
      <div className="max-w-full mx-auto px-4 md:px-12 py-2 md:py-3">
        <div className="flex justify-between items-center w-full">
          {/* Logo - Push to far left */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-white text-xl md:text-2xl font-bold tracking-wider hover:text-gray-300 transition-colors duration-200"
            >
              SPECTRA
            </Link>
          </div>

          {/* Desktop Menu Items - Push to far right */}
          <div className="hidden md:flex items-center space-x-8 ml-auto">
            <Link
              to="/shop"
              className="text-white hover:text-gray-300 transition-colors duration-200 font-medium"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-gray-300 transition-colors duration-200 font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-gray-300 transition-colors duration-200 font-medium"
            >
              Contact
            </Link>
            
            {/* CTA Button */}
            <Link 
              to="/product/spectra-vision" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1.5 rounded-full font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ml-4"
            >
              Buy Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="text-white hover:text-gray-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 pb-2">
            <div className="flex flex-col space-y-2">
              <Link
                to="/shop"
                className="text-white hover:text-gray-300 transition-colors duration-200 font-medium py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-gray-300 transition-colors duration-200 font-medium py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-gray-300 transition-colors duration-200 font-medium py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Mobile CTA Button */}
              <Link 
                to="/product/spectra-vision" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-center mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Buy Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
});

export default Navigation;
