import React from 'react';

// Minimalist spinner for buttons and small components
export const ButtonSpinner = ({ size = 'sm', color = 'white' }) => {
  const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8';
  const colorClass = color === 'white' ? 'border-white' : color === 'black' ? 'border-black' : 'border-gray-600';
  
  return (
    <div className={`${sizeClass} border-2 border-transparent ${colorClass} border-t-transparent rounded-full animate-spin`}></div>
  );
};

// Card loading skeleton
export const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
      <div className="space-y-3">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );
};

// Pulse loading for images
export const ImageSkeleton = ({ className = "w-full h-64" }) => {
  return (
    <div className={`bg-gray-200 rounded-lg animate-pulse ${className}`}>
      <div className="flex items-center justify-center h-full">
        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

// Dots loading animation
export const DotsSpinner = ({ color = 'black', size = 'md' }) => {
  const dotSize = size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4';
  const bgColor = color === 'white' ? 'bg-white' : color === 'black' ? 'bg-black' : 'bg-gray-600';
  
  return (
    <div className="flex space-x-1">
      <div className={`${dotSize} ${bgColor} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
      <div className={`${dotSize} ${bgColor} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
      <div className={`${dotSize} ${bgColor} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
    </div>
  );
};

// Bars loading animation
export const BarsSpinner = ({ color = 'black' }) => {
  const bgColor = color === 'white' ? 'bg-white' : color === 'black' ? 'bg-black' : 'bg-gray-600';
  
  return (
    <div className="flex space-x-1 items-end">
      <div className={`w-2 h-8 ${bgColor} rounded animate-pulse`} style={{ animationDelay: '0ms', animationDuration: '1s' }}></div>
      <div className={`w-2 h-6 ${bgColor} rounded animate-pulse`} style={{ animationDelay: '200ms', animationDuration: '1s' }}></div>
      <div className={`w-2 h-10 ${bgColor} rounded animate-pulse`} style={{ animationDelay: '400ms', animationDuration: '1s' }}></div>
      <div className={`w-2 h-4 ${bgColor} rounded animate-pulse`} style={{ animationDelay: '600ms', animationDuration: '1s' }}></div>
      <div className={`w-2 h-8 ${bgColor} rounded animate-pulse`} style={{ animationDelay: '800ms', animationDuration: '1s' }}></div>
    </div>
  );
};

// Ripple effect loading
export const RippleSpinner = ({ size = 'md', color = 'black' }) => {
  const sizeClass = size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-12 h-12' : 'w-16 h-16';
  const borderColor = color === 'white' ? 'border-white' : color === 'black' ? 'border-black' : 'border-gray-600';
  
  return (
    <div className={`${sizeClass} relative`}>
      <div className={`absolute inset-0 border-2 ${borderColor} rounded-full animate-ping`}></div>
      <div className={`absolute inset-2 border-2 ${borderColor} rounded-full animate-ping`} style={{ animationDelay: '0.5s' }}></div>
    </div>
  );
};

// Progress circle
export const ProgressCircle = ({ progress = 0, size = 'md', color = 'black' }) => {
  const sizeClass = size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-12 h-12' : 'w-16 h-16';
  const strokeWidth = size === 'sm' ? 2 : size === 'md' ? 3 : 4;
  const radius = size === 'sm' ? 14 : size === 'md' ? 21 : 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(progress / 100) * circumference} ${circumference}`;
  
  return (
    <div className={`${sizeClass} relative`}>
      <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          className={color === 'white' ? 'text-white' : color === 'black' ? 'text-black' : 'text-gray-600'}
          style={{ transition: 'stroke-dasharray 0.3s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-xs font-medium ${color === 'white' ? 'text-white' : color === 'black' ? 'text-black' : 'text-gray-600'}`}>
          {progress}%
        </span>
      </div>
    </div>
  );
};

// Spectra-themed loading screen
export const SpectraLoader = ({ message = "Loading experience..." }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Animated Spectra logo */}
        <div className="relative">
          <h1 className="text-6xl font-light text-black tracking-[0.3em] mb-4">
            SPECTRA
          </h1>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black to-transparent animate-pulse"></div>
        </div>
        
        {/* Futuristic spinner */}
        <div className="relative w-24 h-24 mx-auto">
          {/* Outer ring */}
          <div className="absolute inset-0 border-2 border-gray-300 rounded-full"></div>
          
          {/* Rotating segments */}
          <div className="absolute inset-1 border-2 border-transparent border-t-black border-r-black rounded-full animate-spin"></div>
          <div className="absolute inset-3 border-2 border-transparent border-b-gray-600 border-l-gray-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
          
          {/* Center pulse */}
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        </div>
        
        {/* Loading text with dots */}
        <div className="flex items-center justify-center space-x-2">
          <span className="text-lg font-medium text-gray-700">{message}</span>
          <DotsSpinner size="sm" color="black" />
        </div>
        
        {/* Ambient decorations */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-32 right-32 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-1/2 left-10 w-1 h-1 bg-gray-400 rounded-full animate-bounce opacity-50"></div>
      </div>
    </div>
  );
};

export default {
  ButtonSpinner,
  CardSkeleton,
  ImageSkeleton,
  DotsSpinner,
  BarsSpinner,
  RippleSpinner,
  ProgressCircle,
  SpectraLoader
};