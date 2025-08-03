import React, { useRef, useState } from 'react';
import { throttle } from '../utils/performance';

const MagneticElement = ({ 
  children, 
  className = '', 
  strength = 0.3, 
  ease = 0.15,
  ...props 
}) => {
  const elementRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = throttle((e) => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    setPosition({ x: deltaX, y: deltaY });
  }, 16); // ~60fps

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={elementRef}
      className={`magnetic-element transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
};

export default MagneticElement;