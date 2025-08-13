import React from 'react';

const LoadingSpinner = ({ size = 'default', text = 'Loading...', overlay = true, priority = 'normal' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    default: 'w-12 h-12', 
    large: 'w-16 h-16'
  };

  const textSizeClasses = {
    small: 'text-xs',
    default: 'text-sm',
    large: 'text-base'
  };

  // Simple spinner without overlay
  if (!overlay) {
    return (
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className={`${sizeClasses[size]} relative`}>
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          {/* Spinning ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-black border-r-black rounded-full animate-spin"></div>
          {/* Inner dot */}
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        </div>
        {text && <p className={`text-gray-600 font-medium ${textSizeClasses[size]}`}>{text}</p>}
      </div>
    );
  }

  // Full page overlay spinner
  const zIndex = priority === 'high' ? 'z-[60]' : priority === 'critical' ? 'z-[70]' : 'z-50';
  
  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-white via-gray-50 to-white bg-opacity-95 backdrop-blur-sm flex items-center justify-center ${zIndex}`}>
      <div className="flex flex-col items-center space-y-8">
        {/* SPECTRA Logo with animation */}
        <div className="relative">
          <div className="text-4xl md:text-5xl font-light text-gray-900 tracking-[0.2em] mb-2">
            SPECTRA
          </div>
          <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-black via-gray-600 to-black animate-pulse"></div>
        </div>
        
        {/* Advanced Loading Animation */}
        <div className="relative w-20 h-20">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          
          {/* Primary spinning ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-black border-r-black rounded-full animate-spin"></div>
          
          {/* Secondary counter-rotating ring */}
          <div className="absolute inset-2 border-2 border-transparent border-b-gray-600 border-l-gray-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          
          {/* Inner pulsing dot */}
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          
          {/* Orbiting dots */}
          <div className="absolute inset-0">
            <div className="w-2 h-2 bg-gray-400 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 animate-spin" style={{ transformOrigin: '50% 40px', animationDuration: '2s' }}></div>
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-spin" style={{ transformOrigin: '50% -40px', animationDuration: '3s', animationDirection: 'reverse' }}></div>
          </div>
        </div>
        
        {/* Animated Loading Text */}
        <div className="text-center space-y-2">
          <div className="flex items-center space-x-1">
            <p className="text-gray-700 text-lg font-medium">Loading experience</p>
            <div className="flex space-x-1">
              <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-black via-gray-600 to-black rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Subtle animation elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-gray-100 to-blue-100 rounded-full opacity-15 animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;