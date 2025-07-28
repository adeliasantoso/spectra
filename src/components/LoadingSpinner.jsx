import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-4">
        {/* SPECTRA Logo */}
        <div className="text-2xl font-bold text-gray-900 tracking-wider mb-4">
          SPECTRA
        </div>
        
        {/* Animated Loading Dots */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        
        {/* Loading Text*/}
        <p className="text-gray-600 text-sm font-medium">Loading experience...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;