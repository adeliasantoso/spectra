import React, { useEffect, useState } from 'react';

const LoadingScreen = ({ duration = 2000, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('loading'); // loading, completing, done

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setStage('completing');
          clearInterval(interval);
          setTimeout(() => {
            setStage('done');
            if (onComplete) onComplete();
          }, 500);
          return 100;
        }
        return prev + (100 / (duration / 50));
      });
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  if (stage === 'done') return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${
      stage === 'completing' ? 'opacity-0' : 'opacity-100'
    }`}>
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider">
            SPECTRA
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto mb-4">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Text */}
        <p className="text-white text-sm opacity-60">
          {Math.round(progress)}%
        </p>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;