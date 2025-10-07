const CACHE_NAME = "locali-firenze-v1";
const ASSETS = [
  "./",
  "./Locali_Firenze_04.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// installa e salva in cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// attiva e cancella cache vecchie
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
});

// serve file dalla cache o li scarica
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
