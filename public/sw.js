// Dynamic cache version based on timestamp
const CACHE_VERSION = `v${Date.now()}`;
const CACHE_NAME = `spectra-${CACHE_VERSION}`;
const STATIC_ASSETS = [
  '/spectra/',
  '/spectra/index.html'
];

// Cache for images and videos with version
const MEDIA_CACHE = `spectra-media-${CACHE_VERSION}`;
// Cache for API responses with version  
const API_CACHE = `spectra-api-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `spectra-dynamic-${CACHE_VERSION}`;

// Version check endpoint
const VERSION_ENDPOINT = '/version.json';

// Install event - cache static assets and clear old caches
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing new version', CACHE_VERSION);
  
  event.waitUntil(
    Promise.all([
      // Cache new assets
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      }),
      // Clear old caches immediately 
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName.startsWith('spectra-') && cacheName !== CACHE_NAME && 
                cacheName !== MEDIA_CACHE && cacheName !== API_CACHE && 
                cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          }).filter(Boolean)
        );
      })
    ]).then(() => {
      console.log('Service Worker: Installation complete, skipping waiting');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches and notify clients
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating new version', CACHE_VERSION);
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName.startsWith('spectra-') && 
                cacheName !== CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== MEDIA_CACHE && 
                cacheName !== API_CACHE) {
              console.log('Service Worker: Deleting old cache on activate', cacheName);
              return caches.delete(cacheName);
            }
          }).filter(Boolean)
        );
      }),
      // Take control of all pages
      self.clients.claim()
    ]).then(() => {
      console.log('Service Worker: Activation complete');
      
      // Notify all clients about the update
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'CACHE_UPDATED',
            version: CACHE_VERSION
          });
        });
      });
    })
  );
});

// Fetch event - serve from cache with network fallback 
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // For development localhost, skip service worker completely for most requests
  if (event.request.url.includes('localhost')) {
    // Skip caching for dev server files
    if (event.request.url.includes('/@') || 
        event.request.url.includes('?') ||
        event.request.url.includes('main.jsx') ||
        event.request.url.includes('env.mjs') ||
        event.request.url.includes('react-refresh')) {
      return; // Let browser handle normally
    }
    
    // Only cache static assets in development
    if (!event.request.url.includes('.png') && 
        !event.request.url.includes('.jpg') && 
        !event.request.url.includes('.mp4')) {
      return; // Let browser handle normally
    }
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          return response;
        }

        // Network request for new content
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();
            const url = event.request.url;

            // Only cache static assets
            if (url.includes('.png') || url.includes('.jpg') || url.includes('.jpeg') || 
                url.includes('.webp') || url.includes('.mp4') || url.includes('.webm')) {
              caches.open(MEDIA_CACHE)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }
            // Cache production JS/CSS only
            else if (!url.includes('localhost') && (url.includes('.js') || url.includes('.css'))) {
              caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }

            return response;
          })
          .catch(() => {
            // Offline fallback
            if (event.request.destination === 'document') {
              return caches.match('/offline.html') || caches.match('/spectra/');
            }
          });
      })
  );
});

// Background sync for failed requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Retry failed requests
      retryFailedRequests()
    );
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View',
        icon: '/check.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/close.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Spectra Update', options)
  );
});

async function retryFailedRequests() {
  // Implementation for retrying failed requests
  console.log('Retrying failed requests...');
}