// Cache version management (simplified)
export const CACHE_VERSION = `v1.0.0`;
export const APP_VERSION = '1.0.0';

// Generate unique cache key for this deployment
export const getCacheKey = (cacheName) => `${cacheName}-${CACHE_VERSION}`;

// Check if app version has changed (production only)
export const hasVersionChanged = () => {
  if (import.meta.env.DEV) return false; // Skip in development
  
  const storedVersion = localStorage.getItem('app-version');
  const currentVersion = `${APP_VERSION}-${CACHE_VERSION}`;
  
  if (storedVersion !== currentVersion) {
    localStorage.setItem('app-version', currentVersion);
    return true;
  }
  
  return false;
};

// Force reload if version changed (production only)
export const checkForUpdates = () => {
  if (import.meta.env.DEV) return false; // Skip in development
  
  if (hasVersionChanged()) {
    console.log('New version detected, clearing caches...');
    
    // Clear service worker caches
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          if (!cacheName.includes(CACHE_VERSION)) {
            caches.delete(cacheName);
          }
        });
      });
    }
    
    return true;
  }
  
  return false;
};