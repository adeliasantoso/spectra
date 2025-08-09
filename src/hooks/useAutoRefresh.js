import { useEffect, useRef } from 'react';

// Custom hook for auto-refreshing when updates are detected
export const useAutoRefresh = () => {
  const lastUpdateCheck = useRef(Date.now());
  const intervalRef = useRef(null);

  useEffect(() => {
    // Only run in development mode
    if (!import.meta.env.DEV) return;

    const checkForUpdates = async () => {
      try {
        // Add cache busting parameter
        const response = await fetch(window.location.href + '?_check=' + Date.now(), {
          method: 'HEAD',
          cache: 'no-cache'
        });
        
        // If response is different from last check, refresh
        const lastModified = response.headers.get('last-modified');
        const etag = response.headers.get('etag');
        
        const currentSignature = `${lastModified}-${etag}`;
        const storedSignature = sessionStorage.getItem('page-signature');
        
        if (storedSignature && storedSignature !== currentSignature) {
          console.log('Page updated detected, refreshing...');
          window.location.reload();
        }
        
        sessionStorage.setItem('page-signature', currentSignature);
      } catch (error) {
        console.log('Update check failed:', error);
      }
    };

    // Check immediately
    checkForUpdates();

    // Set up interval to check for updates
    intervalRef.current = setInterval(checkForUpdates, 5000); // Check every 5 seconds

    // Clear cache when page becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Clear all development caches
        if ('caches' in window) {
          caches.keys().then(cacheNames => {
            cacheNames.forEach(cacheName => {
              if (cacheName.includes('localhost') || cacheName.includes('dev')) {
                caches.delete(cacheName);
              }
            });
          });
        }
        
        // Check for updates when tab becomes active
        setTimeout(checkForUpdates, 1000);
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