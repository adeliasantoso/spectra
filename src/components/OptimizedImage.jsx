import React, { useState, useRef, useCallback, useEffect } from 'react';

const OptimizedImage = React.memo(({ 
  src, 
  alt, 
  className = '', 
  width,
  height,
  lazy = true,
  placeholder = true,
  priority = false,
  sizes,
  srcSet,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);
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
        rootMargin: priority ? '200px' : '50px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden`}
      style={{ 
        aspectRatio: width && height && className.includes('aspect-') ? `${width}/${height}` : undefined,
        width: '100%',
        height: '100%'
      }}
    >
      {/* Placeholder while loading */}
      {placeholder && !isLoaded && isInView && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-gray-200">
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
        </div>
      )}
      
      {/* Main image - only load when in view */}
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : lazy ? "lazy" : "eager"}
          decoding="async"
          sizes={sizes}
          srcSet={srcSet}
          className={`transition-all duration-500 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } ${className}`}
          {...props}
        />
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-500 text-xs">Image unavailable</span>
          </div>
        </div>
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;