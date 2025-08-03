import React, { useEffect, useState } from 'react';
import { throttle, passiveEventOptions } from '../utils/performance';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = throttle((e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }, 16); // ~60fps

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Track mouse movement with passive listener
    window.addEventListener('mousemove', updateMousePosition, passiveEventOptions);

    // Track hover states on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .magnetic-element, .tilt-card');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter, passiveEventOptions);
      element.addEventListener('mouseleave', handleMouseLeave, passiveEventOptions);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Simple Cursor Dot - Subtle and Calm */}
      <div
        className="cursor-dot"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.3 : 1})`,
          opacity: isHovering ? 1 : 0.7,
          transition: 'all 0.3s ease',
        }}
      />
    </>
  );
};

export default CustomCursor;