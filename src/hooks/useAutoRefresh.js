import { useEffect, useRef } from 'react';

// Custom hook for auto-refreshing when updates are detected (simplified)
export const useAutoRefresh = () => {
  const intervalRef = useRef(null);

  useEffect(() => {
    // Only run in development mode
    if (!import.meta.env.DEV) return;

    // Simple cache clearing on visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Only clear specific caches that might cause issues
        if ('caches' in window) {
          caches.keys().then(cacheNames => {
            cacheNames.forEach(cacheName => {
              // Only clear media caches, not dev server caches
              if (cacheName.includes('spectra-media')) {
                caches.delete(cacheName);
              }
            });
          });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
};