import React, { useState, useRef, useCallback, useEffect } from 'react';

const OptimizedVideo = React.memo(({ 
  src, 
  poster,
  className = '', 
  width,
  height,
  lazy = true,
  autoplay = true,
  muted = true,
  loop = true,
  playsInline = true,
  preload = "metadata",
  priority = false,
  fallbackImage,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: priority ? '400px' : '100px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority]);

  // Handle video play when in view and loaded
  useEffect(() => {
    if (videoRef.current && canPlay && isInView && autoplay) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented, which is fine
        });
      }
    }
  }, [canPlay, isInView, autoplay]);

  const handleLoadedData = useCallback(() => {
    setIsLoaded(true);
    setCanPlay(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  const handleCanPlay = useCallback(() => {
    setCanPlay(true);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden`}
      style={{ 
        aspectRatio: width && height ? `${width}/${height}` : undefined,
        width: '100%',
        height: '100%'
      }}
    >
      {/* Loading placeholder */}
      {!isLoaded && isInView && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white/80 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Video element - only load when in view */}
      {isInView && !hasError && (
        <video
          ref={videoRef}
          width={width}
          height={height}
          autoPlay={autoplay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          preload={priority ? "auto" : preload}
          poster={poster}
          onLoadedData={handleLoadedData}
          onCanPlay={handleCanPlay}
          onError={handleError}
          className={`transition-all duration-700 ease-out object-cover ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } ${className}`}
          {...props}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      {/* Error state with fallback image */}
      {hasError && (
        <div className="absolute inset-0">
          {fallbackImage ? (
            <img 
              src={fallbackImage} 
              alt="Video fallback" 
              className={`w-full h-full object-cover ${className}`}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
              <div className="text-center text-white/60">
                <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="text-xs">Video unavailable</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

OptimizedVideo.displayName = 'OptimizedVideo';

export default OptimizedVideo;