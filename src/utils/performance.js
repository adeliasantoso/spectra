// Performance monitoring utilities
export const measurePerformance = {
  // Measure page load time
  measurePageLoad: () => {
    if (typeof window !== 'undefined' && window.performance) {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        return {
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          totalTime: navigation.loadEventEnd - navigation.fetchStart
        };
      }
    }
    return null;
  },

  // Measure First Contentful Paint
  measureFCP: () => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
          if (fcpEntry) {
            resolve(fcpEntry.startTime);
            observer.disconnect();
          }
        });
        observer.observe({ entryTypes: ['paint'] });
      } else {
        resolve(null);
      }
    });
  },

  // Measure Largest Contentful Paint
  measureLCP: () => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Stop observing after 10 seconds
        setTimeout(() => {
          observer.disconnect();
        }, 10000);
      } else {
        resolve(null);
      }
    });
  },

  // Log performance metrics (development only)
  logMetrics: async () => {
    if (process.env.NODE_ENV === 'development') {
      const pageLoad = measurePerformance.measurePageLoad();
      const fcp = await measurePerformance.measureFCP();
      const lcp = await measurePerformance.measureLCP();

      console.group('📊 Performance Metrics');
      if (pageLoad) {
        console.log('🚀 Total Load Time:', Math.round(pageLoad.totalTime), 'ms');
        console.log('📄 DOM Content Loaded:', Math.round(pageLoad.domContentLoaded), 'ms');
      }
      if (fcp) console.log('🎨 First Contentful Paint:', Math.round(fcp), 'ms');
      if (lcp) console.log('🖼️ Largest Contentful Paint:', Math.round(lcp), 'ms');
      console.groupEnd();
    }
  }
};

// Image loading optimization
export const optimizeImageLoading = {
  // Preload critical images
  preloadImage: (src, priority = false) => {
    if (typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = priority ? 'preload' : 'prefetch';
      link.as = 'image';
      link.href = src;
      if (priority) link.fetchPriority = 'high';
      document.head.appendChild(link);
    }
  },

  // Create responsive image srcSet
  createSrcSet: (baseSrc, sizes = [480, 768, 1024, 1440]) => {
    return sizes.map(size => `${baseSrc}?w=${size} ${size}w`).join(', ');
  },

  // Get optimal image size based on viewport
  getOptimalSize: (maxWidth = 1920) => {
    if (typeof window !== 'undefined') {
      const dpr = window.devicePixelRatio || 1;
      const screenWidth = window.innerWidth;
      return Math.min(Math.ceil(screenWidth * dpr), maxWidth);
    }
    return maxWidth;
  }
};

// Video optimization
export const optimizeVideoLoading = {
  // Preload video metadata
  preloadVideoMetadata: (src) => {
    if (typeof window !== 'undefined') {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = src;
      video.load();
    }
  },

  // Check if video format is supported
  canPlayFormat: (format) => {
    if (typeof window !== 'undefined') {
      const video = document.createElement('video');
      return video.canPlayType(format) !== '';
    }
    return false;
  }
};

// Bundle size monitoring (development only)
export const monitorBundleSize = () => {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    // Monitor script tags
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    
    console.group('📦 Bundle Analysis');
    console.log(`📜 Scripts loaded: ${scripts.length}`);
    console.log(`🎨 Stylesheets loaded: ${stylesheets.length}`);
    
    // Check for large resources
    if (performance.getEntriesByType) {
      const resources = performance.getEntriesByType('resource');
      const largeResources = resources.filter(resource => resource.transferSize > 100000);
      
      if (largeResources.length > 0) {
        console.warn('⚠️ Large resources detected (>100KB):');
        largeResources.forEach(resource => {
          console.log(`   ${resource.name}: ${Math.round(resource.transferSize / 1024)}KB`);
        });
      }
    }
    console.groupEnd();
  }
};