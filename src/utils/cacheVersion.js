// Cache version management
export const CACHE_VERSION = `v${Date.now()}`;
export const APP_VERSION = '1.0.0';

// Generate unique cache key for this deployment
export const getCacheKey = (cacheName) => `${cacheName}-${CACHE_VERSION}`;

// Check if app version has changed
export const hasVersionChanged = () => {
  const storedVersion = localStorage.getItem('app-version');
  const currentVersion = `${APP_VERSION}-${CACHE_VERSION}`;
  
  if (storedVersion !== currentVersion) {
    localStorage.setItem('app-version', currentVersion);
    return true;
  }
  
  return false;
};

// Force reload if version changed
export const checkForUpdates = () => {
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
    
    // Clear localStorage cache items
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('cache-') || key.startsWith('spectra-cache-')) {
        localStorage.removeItem(key);
      }
    });
    
    return true;
  }
  
  return false;
};

// Development mode cache clearing
export const clearDevCache = () => {
  if (import.meta.env.DEV) {
    console.log('Development mode: clearing all caches');
    
    // Clear browser cache
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => caches.delete(cacheName));
      });
    }
    
    // Clear localStorage
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('cache-') || key.startsWith('spectra-')) {
        localStorage.removeItem(key);
      }
    });
    
    // Force reload without cache
    if (window.location.href.includes('localhost')) {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }
};