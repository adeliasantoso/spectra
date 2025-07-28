import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingElements = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingShapes = [
    {
      id: 1,
      size: 120,
      initialX: 10,
      initialY: 20,
      color: 'from-blue-400/10 to-cyan-400/5',
      duration: 20,
    },
    {
      id: 2,
      size: 80,
      initialX: 80,
      initialY: 10,
      color: 'from-purple-400/10 to-pink-400/5',
      duration: 25,
    },
    {
      id: 3,
      size: 100,
      initialX: 70,
      initialY: 70,
      color: 'from-indigo-400/10 to-blue-400/5',
      duration: 30,
    },
    {
      id: 4,
      size: 60,
      initialX: 20,
      initialY: 80,
      color: 'from-cyan-400/10 to-teal-400/5',
      duration: 22,
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Ambient gradient orbs */}
      {floatingShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute rounded-full bg-gradient-radial ${shape.color} blur-xl`}
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.initialX}%`,
            top: `${shape.initialY}%`,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Parallax responsive orbs */}
      {floatingShapes.slice(0, 2).map((shape) => (
        <motion.div
          key={`parallax-${shape.id}`}
          className={`absolute rounded-full bg-gradient-radial ${shape.color} blur-2xl opacity-40`}
          style={{
            width: shape.size * 0.6,
            height: shape.size * 0.6,
            left: `${shape.initialX + 10}%`,
            top: `${shape.initialY + 10}%`,
          }}
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
          }}
        />
      ))}

      {/* XR-style geometric shapes */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-32 border border-white/5 rounded-lg"
        animate={{
          rotateX: [0, 20, 0],
          rotateY: [0, -20, 0],
          rotateZ: [0, 10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.05))',
          backdropFilter: 'blur(10px)',
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/5 w-24 h-24 border border-cyan-400/10 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.1), transparent)',
          filter: 'blur(1px)',
        }}
      />

      {/* Particle-like dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;