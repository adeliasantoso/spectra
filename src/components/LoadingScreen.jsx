import React, { useEffect, useState } from 'react';

const LoadingScreen = ({ 
  duration = 3000, 
  onComplete,
  messages = [
    "Initializing Spectra...",
    "Loading your personalized experience...",
    "Almost ready..."
  ]
}) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('loading'); // loading, completing, done
  const [currentMessage, setCurrentMessage] = useState(0);

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

    // Change messages
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, duration / messages.length);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, [duration, onComplete, messages]);

  if (stage === 'done') return null;

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-500 ${
      stage === 'completing' ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Background with subtle animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-32 right-32 w-48 h-48 bg-gradient-to-br from-gray-100/40 to-blue-100/40 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-10 w-32 h-32 bg-gradient-to-br from-purple-100/20 to-gray-100/20 rounded-full blur-xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="text-center space-y-12 max-w-md mx-auto">
          
          {/* Spectra Logo */}
          <div className="space-y-4">
            <div className="relative inline-block">
              <h1 className="text-5xl md:text-6xl font-light text-black tracking-[0.2em]">
                SPECTRA
              </h1>
              {/* Animated underline */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-black to-transparent animate-pulse"></div>
            </div>
            <p className="text-sm text-gray-600 font-medium tracking-wider">
              A world tailored to your mind
            </p>
          </div>

          {/* Advanced Loading Animation */}
          <div className="relative w-32 h-32 mx-auto">
            {/* Outer static ring */}
            <div className="absolute inset-0 border-2 border-gray-200 rounded-full"></div>
            
            {/* Primary spinning ring */}
            <div className="absolute inset-0 border-2 border-transparent border-t-black border-r-black rounded-full animate-spin"></div>
            
            {/* Secondary counter-rotating ring */}
            <div className="absolute inset-4 border-2 border-transparent border-b-gray-500 border-l-gray-500 rounded-full animate-spin" 
                 style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
            
            {/* Center elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-4 h-4 bg-black rounded-full animate-pulse mb-2"></div>
                <div className="text-xs font-semibold text-gray-700">
                  {Math.round(progress)}%
                </div>
              </div>
            </div>
            
            {/* Orbiting elements */}
            <div className="absolute inset-0">
              <div className="w-2 h-2 bg-blue-400 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 animate-spin opacity-60" 
                   style={{ transformOrigin: '50% 64px', animationDuration: '3s' }}></div>
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-spin opacity-40" 
                   style={{ transformOrigin: '50% -64px', animationDuration: '4s', animationDirection: 'reverse' }}></div>
            </div>
          </div>

          {/* Loading messages */}
          <div className="space-y-4">
            <div className="h-6 flex items-center justify-center">
              <p className="text-base font-medium text-gray-700 transition-all duration-500">
                {messages[currentMessage]}
              </p>
            </div>
            
            {/* Progress bar */}
            <div className="w-full max-w-xs mx-auto">
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-black via-gray-600 to-black rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-gray-400 rounded-full opacity-20 animate-bounce"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + i}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;