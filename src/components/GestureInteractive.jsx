import React, { useState, useRef } from 'react';
import { motion, useDrag, useMotionValue, useTransform } from 'framer-motion';

const GestureInteractive = ({ children, className = "", sensitivity = 1 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const constraintsRef = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform drag movements into 3D rotations
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);
  const scale = useTransform([x, y], (latest) => {
    const distance = Math.sqrt(latest[0] ** 2 + latest[1] ** 2);
    return 1 + (distance / 500) * sensitivity;
  });

  const dragControls = useDrag({
    onDrag: (event, info) => {
      x.set(info.offset.x);
      y.set(info.offset.y);
    },
    onDragEnd: () => {
      // Animate back to center
      x.set(0, { 
        type: "spring", 
        stiffness: 500, 
        damping: 30 
      });
      y.set(0, { 
        type: "spring", 
        stiffness: 500, 
        damping: 30 
      });
    }
  });

  return (
    <div ref={constraintsRef} className={`relative ${className}`}>
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragMomentum={false}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          x,
          y,
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        whileDrag={{
          scale: 1.05,
          transition: { duration: 0.1 }
        }}
        className="cursor-grab active:cursor-grabbing"
      >
        {/* Glow effect that appears on interaction */}
        <motion.div
          className="absolute -inset-4 bg-gradient-radial from-blue-500/20 via-purple-500/10 to-transparent rounded-3xl blur-xl"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Content wrapper */}
        <motion.div
          className="relative z-10"
          animate={{
            boxShadow: isHovered 
              ? '0 20px 60px rgba(0, 0, 0, 0.3)' 
              : '0 10px 30px rgba(0, 0, 0, 0.1)',
          }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
        
        {/* Interaction hint */}
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white/60 font-light"
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          transition={{ duration: 0.2 }}
        >
          Drag to interact
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GestureInteractive;