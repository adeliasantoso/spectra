// Simple cache management that doesn't interfere with Vite dev server
export const setupCacheManagement = () => {
  // Only run in development mode
  if (!import.meta.env.DEV) return;

  let lastReloadTime = Date.now();

  // Simple solution: Clear localStorage cache periodically
  const clearOldCache = () => {
    try {
      // Clear old cache entries
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('vite') || key.startsWith('cache-')) {
          localStorage.removeItem(key);
        }
      });
      
      // Clear service worker caches if they exist
      if ('caches' in window) {
        caches.keys().then(cacheNames => {
          cacheNames.forEach(cacheName => {
            if (cacheName.includes('localhost') || cacheName.includes('dev')) {
              caches.delete(cacheName);
            }
          });
        });
      }
    } catch (error) {
      console.log('Cache clearing failed:', error);
    }
  };

  // Clear cache when page is loaded
  clearOldCache();

  // Add a simple meta refresh for development
  if (document.location.hostname === 'localhost') {
    // Add timestamp to force browser cache refresh
    const timestamp = Date.now();
    const metaRefresh = document.createElement('meta');
    metaRefresh.httpEquiv = 'cache-control';
    metaRefresh.content = 'no-cache';
    document.head.appendChild(metaRefresh);
  }

  // Simple visibility change handler
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      const now = Date.now();
      // If page has been hidden for more than 30 seconds, clear cache
      if (now - lastReloadTime > 30000) {
        clearOldCache();
        lastReloadTime = now;
      }
    }
  });
};