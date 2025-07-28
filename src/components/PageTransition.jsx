import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children, className = "" }) => {
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.98,
      y: 20,
      rotateX: 5,
    },
    in: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
    },
    out: {
      opacity: 0,
      scale: 1.02,
      y: -20,
      rotateX: -5,
    }
  };

  const pageTransition = {
    type: "tween",
    ease: [0.4, 0, 0.2, 1],
    duration: 0.6
  };

  const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    in: { 
      opacity: [0, 0.1, 0],
      scale: [0.8, 1.2, 1],
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* XR-style ambient glow effect */}
      <motion.div
        variants={glowVariants}
        className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-purple-500/3 to-transparent pointer-events-none"
        style={{
          borderRadius: '50%',
          filter: 'blur(40px)',
          transform: 'translate3d(0, 0, 0)'
        }}
      />
      
      {/* Content wrapper with subtle 3D effect */}
      <motion.div
        className="relative z-10"
        initial={{ rotateY: 2 }}
        animate={{ rotateY: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default PageTransition;