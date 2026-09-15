// Basic pass-through Service Worker to satisfy PWA installability requirements

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // A minimal fetch handler is often required for the browser to consider the PWA installable.
  // This just passes the request through without caching (can be enhanced later).
  event.respondWith(fetch(event.request));
});
