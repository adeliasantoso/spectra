const CACHE_NAME = 'spectra-vision-v2';
const STATIC_ASSETS = [
  '/spectra/',
  '/spectra/index.html'
];

// Cache for images and videos
const MEDIA_CACHE = 'spectra-media-v1';
// Cache for API responses
const API_CACHE = 'spectra-api-v1';

const DYNAMIC_CACHE = 'spectra-dynamic-v2';

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== MEDIA_CACHE && 
                cacheName !== API_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
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

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          return response;
        }

        // Network request for dynamic content
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();
            const url = event.request.url;

            // Cache images and videos in media cache
            if (url.includes('.png') || url.includes('.jpg') || url.includes('.jpeg') || 
                url.includes('.webp') || url.includes('.mp4') || url.includes('.webm')) {
              caches.open(MEDIA_CACHE)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }
            // Cache JS/CSS in dynamic cache
            else if (url.includes('.js') || url.includes('.css')) {
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
              return caches.match('/offline.html');
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