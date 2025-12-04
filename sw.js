// Service Worker for waqar.eu
const CACHE_NAME = 'waqar-portfolio-v7';
const DEBUG = false; // Set to true for development debugging

const urlsToCache = [
  '/',
  '/index.html',
  '/404.html',
  '/assets/css/style.min.css',
  '/assets/js/script.min.js',
  '/assets/images/my-avatar.webp',
  '/assets/images/my-avatar-3.webp',
  '/assets/images/logo.ico',
  // Critical WebP images
  '/assets/images/avatar-1.webp',
  '/assets/images/avatar-2.webp',
  '/assets/images/avatar-3.webp',
  '/assets/images/avatar-4.webp',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        if (DEBUG) console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        if (DEBUG) console.error('Cache install failed:', err);
      })
  );
  self.skipWaiting();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          response => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
      .catch(err => {
        if (DEBUG) console.error('Fetch failed:', err);
        // You could return a custom offline page here
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  return self.clients.claim();
});
