import React, { useEffect, useState } from 'react';

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0
  });

  useEffect(() => {
    // Performance Observer for Web Vitals
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'navigation') {
            setMetrics(prev => ({
              ...prev,
              loadTime: Math.round(entry.loadEventEnd - entry.loadEventStart)
            }));
          }
        });
      });
      
      observer.observe({ entryTypes: ['navigation'] });
      
      return () => observer.disconnect();
    }

    // Memory usage (if available)
    if ('memory' in performance) {
      const updateMemory = () => {
        setMetrics(prev => ({
          ...prev,
          memoryUsage: Math.round(performance.memory.usedJSHeapSize / 1048576)
        }));
      };
      
      updateMemory();
      const interval = setInterval(updateMemory, 5000);
      
      return () => clearInterval(interval);
    }
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white text-xs p-2 rounded-lg backdrop-blur-sm z-50">
      <div>Load: {metrics.loadTime}ms</div>
      <div>Memory: {metrics.memoryUsage}MB</div>
    </div>
  );
};

export default PerformanceMonitor;