import React from 'react';
import { motion } from 'framer-motion';

const XRCard = ({ 
  children, 
  className = "", 
  depth = 1, 
  hoverScale = 1.02,
  glowColor = "blue",
  ...props 
}) => {
  const glowColors = {
    blue: 'rgba(59, 130, 246, 0.3)',
    purple: 'rgba(147, 51, 234, 0.3)',
    cyan: 'rgba(34, 211, 238, 0.3)',
    pink: 'rgba(236, 72, 153, 0.3)',
    green: 'rgba(34, 197, 94, 0.3)',
  };

  return (
    <motion.div
      className={`relative group ${className}`}
      initial={{ 
        opacity: 0, 
        y: 50,
        rotateX: 10,
        scale: 0.95
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        rotateX: 0,
        scale: 1
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{
        scale: hoverScale,
        rotateX: -2,
        rotateY: 2,
        z: depth * 20,
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      {...props}
    >
      {/* Card glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg"
        style={{
          background: `linear-gradient(135deg, ${glowColors[glowColor]}, transparent, ${glowColors[glowColor]})`
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Card background with gradient border */}
      <motion.div
        className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
        }}
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
          }}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-30">
          <div 
            className="absolute top-0 right-0 w-full h-full rounded-bl-2xl"
            style={{
              background: `linear-gradient(225deg, ${glowColors[glowColor]}, transparent)`
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default XRCard;