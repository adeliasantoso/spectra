import React, { useState } from 'react';

const InteractiveButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  ...props 
}) => {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const newRipple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    if (onClick) onClick(e);
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700';
      case 'secondary':
        return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
      case 'outline':
        return 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white';
      case 'ghost':
        return 'text-gray-600 hover:bg-gray-100';
      default:
        return 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-4 py-2 text-sm';
      case 'medium':
        return 'px-6 py-3 text-base';
      case 'large':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  return (
    <button
      className={`
        relative overflow-hidden rounded-lg font-semibold
        transform transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-lg active:scale-95
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${className}
      `}
      onClick={handleClick}
      {...props}
    >
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white bg-opacity-30 rounded-full animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            animationDuration: '0.6s',
          }}
        />
      ))}
      
      {/* Shine effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 transition-opacity duration-500 transform -skew-x-12 -translate-x-full hover:translate-x-full" />
      
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default InteractiveButton;