// Service Worker for FlashPatrika News App
// Implements caching strategies for improved performance

const CACHE_NAME = 'flashpatrika-cache-v1';
const API_CACHE_NAME = 'flashpatrika-api-cache-v1';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/images/default-news.jpg',
  '/images/flashpatrika-logo.svg',
  '/images/flashpatrika-logo-dark.svg',
  '/images/flashpatrika-favicon.svg',
  '/fonts/inter-var.woff2',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== API_CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  // Take control of all clients immediately
  self.clients.claim();
});

// Helper function to determine if a request is for an API call
const isApiRequest = (url) => {
  return url.includes('/api/') || 
         url.includes('news-api-9x6t.onrender.com') || 
         url.includes('news-api-w60w.onrender.com');
};

// Helper function to determine if a request is for an image
const isImageRequest = (url) => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.avif'];
  return imageExtensions.some(ext => url.endsWith(ext)) || url.includes('/image/');
};

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Handle API requests with network-first strategy
  if (isApiRequest(url)) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone the response to store in cache
          const clonedResponse = response.clone();
          
          // Only cache successful responses
          if (response.status === 200) {
            caches.open(API_CACHE_NAME).then((cache) => {
              // Set a custom header to indicate when this was cached
              const responseToCache = clonedResponse.clone();
              const headers = new Headers(responseToCache.headers);
              headers.append('X-Cache-Date', new Date().toISOString());
              
              // Create a new response with the updated headers
              const responseWithHeaders = new Response(responseToCache.body, {
                status: responseToCache.status,
                statusText: responseToCache.statusText,
                headers: headers
              });
              
              cache.put(event.request, responseWithHeaders);
            });
          }
          
          return response;
        })
        .catch(() => {
          // If network fails, try to return from cache
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // Handle image requests with cache-first strategy
  if (isImageRequest(url)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request).then((response) => {
          // Clone the response to store in cache
          const clonedResponse = response.clone();
          
          // Only cache successful responses
          if (response.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clonedResponse);
            });
          }
          
          return response;
        });
      })
    );
    return;
  }
  
  // For all other requests, use stale-while-revalidate strategy
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response immediately if available
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          // Update the cache with the new response
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
          return networkResponse;
        })
        .catch((error) => {
          console.error('Fetch failed:', error);
          // If both cache and network fail, return a fallback
          if (!cachedResponse) {
            if (event.request.url.includes('.html')) {
              return caches.match('/');
            }
            return new Response('Network error happened', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          }
        });
      
      return cachedResponse || fetchPromise;
    })
  );
});

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});