import React, { useEffect, useRef } from 'react';

const ParallaxSection = ({ children, speed = 0.5, className = '' }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const scrolled = window.pageYOffset;
      const element = elementRef.current;
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;

      // Only apply parallax when element is in viewport
      if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
        const yPos = -(scrolled - elementTop) * speed;
        element.style.transform = `translateY(${yPos}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={elementRef} className={`parallax-layer ${className}`}>
      {children}
    </div>
  );
};

export default ParallaxSection;