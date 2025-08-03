import React, { useRef, useState } from 'react';

const TiltCard = ({ children, className = '', tiltScale = 1, maxTilt = 15 }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = (mouseY / (rect.height / 2)) * maxTilt;
    const rotateY = (mouseX / (rect.width / 2)) * maxTilt;

    setTilt({ x: -rotateX * tiltScale, y: rotateY * tiltScale });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card transform-gpu transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        {/* Shine overlay */}
        <div 
          className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(
              ${45 + tilt.y}deg, 
              transparent 30%, 
              rgba(255, 255, 255, 0.2) 50%, 
              transparent 70%
            )`,
          }}
        />
        {children}
      </div>
    </div>
  );
};

export default TiltCard;