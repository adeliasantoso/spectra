// Force cache clear - updated version
const CACHE_VERSION = 'v1.0.1';
const CACHE_NAME = `spectra-${CACHE_VERSION}`;
const STATIC_ASSETS = [
  '/spectra/',
  '/spectra/index.html'
];

// Updated cache names to force refresh
const MEDIA_CACHE = `spectra-media-v2`;
const API_CACHE = `spectra-api-v2`;
const DYNAMIC_CACHE = `spectra-dynamic-v2`;

// Version check endpoint
const VERSION_ENDPOINT = '/version.json';

// Install event - cache static assets (no aggressive cache clearing)
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing version', CACHE_VERSION);
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      console.log('Service Worker: Installation complete');
      // Don't skip waiting - let user refresh naturally
    })
  );
});

// Activate event - aggressive cache cleanup
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating version', CACHE_VERSION);
  
  event.waitUntil(
    // Clean up ALL old caches, keep only current version
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete any spectra cache that's not the current version
          if (cacheName.startsWith('spectra-') && cacheName !== CACHE_NAME && 
              cacheName !== MEDIA_CACHE && cacheName !== API_CACHE && 
              cacheName !== DYNAMIC_CACHE) {
            console.log('Service Worker: Cleaning up old cache', cacheName);
            return caches.delete(cacheName);
          }
        }).filter(Boolean)
      );
    }).then(() => {
      console.log('Service Worker: Activation complete');
      // Force claim to ensure new SW takes control immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache with network fallback 
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // For development localhost, completely skip service worker
  if (event.request.url.includes('localhost') || event.request.url.includes('127.0.0.1')) {
    return; // Let browser handle all requests normally in development
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

            // Skip caching for video files to avoid cache errors
            if (event.request.url.includes('.mp4') || 
                event.request.url.includes('.webm') || 
                event.request.url.includes('.mov')) {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();
            const url = event.request.url;

            // Only cache images, NOT videos (videos are too large and cause cache errors)
            if (url.includes('.png') || url.includes('.jpg') || url.includes('.jpeg') || 
                url.includes('.webp') || url.includes('.gif') || url.includes('.svg')) {
              // Skip very large images
              const contentLength = response.headers.get('content-length');
              if (!contentLength || parseInt(contentLength) < 5 * 1024 * 1024) { // Skip if > 5MB
                caches.open(MEDIA_CACHE)
                  .then((cache) => {
                    cache.put(event.request, responseToCache);
                  })
                  .catch(e => console.warn('Cache put failed:', e));
              }
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
          .catch((error) => {
            console.warn('Service Worker: Network request failed', event.request.url, error);
            
            // Offline fallback
            if (event.request.destination === 'document') {
              return caches.match('/offline.html') || caches.match('/spectra/');
            }
            
            // For failed video requests, don't show error
            if (event.request.url.includes('.mp4') || 
                event.request.url.includes('.webm') || 
                event.request.url.includes('.mov')) {
              return new Response('', { status: 404, statusText: 'Video not available' });
            }
            
            return caches.match(event.request);
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