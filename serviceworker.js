var BASE_PATH = '/Mobile-Devices/';
var CACHE_NAME = 'gih-cache-v1';
var CACHED_URLS = [
    // Our HTML
    BASE_PATH + 'index.html',
    
    // Images for favicons
    BASE_PATH + 'icons/android-icon-36x36.png',
    BASE_PATH + 'icons/android-icon-48x48.png',
    BASE_PATH + 'icons/android-icon-72x72.png',
    BASE_PATH + 'icons/android-icon-96x96.png',
    BASE_PATH + 'icons/android-icon-144x144.png',
    BASE_PATH + 'icons/android-icon-192x192.png',
    BASE_PATH + 'icons/favicon-32x32.png',

    //Images for page
   // BASE_PATH + 'icons/offlinemap.jpg',
    BASE_PATH + 'icons/favicon-16x16.png',
    BASE_PATH + 'icons/favicon-32x32.png',
    BASE_PATH + 'icons/favicon-96x96.png',
    BASE_PATH + 'icons/ms-icon-70x70.png',
    BASE_PATH + 'icons/ms-icon-144x144.png',
    BASE_PATH + 'icons/ms-icon-150x150.png',
    BASE_PATH + 'icons/ms-icon-310x310.png',

    // JavaScript
    BASE_PATH + 'script.js',
    BASE_PATH + 'data.json',
    // Manifest
    BASE_PATH + 'manifest.json',
  // CSS and fonts
    BASE_PATH + 'style.css'
];

var googleMapsAPIJS = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAYtiJpXh3CHsaOAncAEh8AXp6C9BoO6wY&callback=initMap';

self.addEventListener('install', function(event) {
  // Cache everything in CACHED_URLS. Installation fails if anything fails to cache
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});

self.addEventListener('fetch', function(event) {
  var requestURL = new URL(event.request.url);
  // Handle requests for index.html
  if (requestURL.pathname === BASE_PATH + 'index.html') {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match('index.html').then(function(cachedResponse) {
          var fetchPromise = fetch('index.html').then(function(networkResponse) {
            cache.put('first.html', networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
 // Handle requests for Google Maps JavaScript API file
  } else if (requestURL.href === googleMapsAPIJS) {
    event.respondWith(
      fetch(
        googleMapsAPIJS+'&'+Date.now(),
        { mode: 'no-cors', cache: 'no-store' }
      ).catch(function() {
        return caches.match('offline-map.js');
      })
    );
  } else if (
    CACHED_URLS.includes(requestURL.href) ||
    CACHED_URLS.includes(requestURL.pathname)
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(response) {
          return response || fetch(event.request);
        });
      })
    );
  }
});


self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.startsWith('gih-cache') && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});





