// service-worker.js

const CACHE_NAME = 'uts-NAUVAL';
const urlsToCache = [
    
    '/index.html',
    '/style.css',
    '/main.js',
    '/manifest.json',
    '/Foto Diri.jpg',  
];

self.addEventListener('install', (event) => {
    // Install service worker dan cache file yang diperlukan
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    // Menangani permintaan dari cache atau jaringan
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Menggunakan cache jika ada, jika tidak mengambil dari jaringan
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    // Menghapus cache lama saat service worker diaktifkan
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cacheName) => {
                    return cacheName !== CACHE_NAME;
                }).map((cacheName) => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});
