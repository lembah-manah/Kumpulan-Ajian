const CACHE_NAME = "wirid-aji-cache-v4";

// Semua file yang perlu disimpan supaya bisa dibuka offline.
// Kalau nanti nambah halaman baru, tambahkan juga di sini.
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./malaikatan-1-2.html",
  "./malaikatan-3.html",
  "./malaikatan-4.html",
  "./arjuno-lulut.html",
  "./hijib-barqi.html",
  "./dhohir-manusia.html",
  "./manik-moyo.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png"
];

// Saat service worker pertama kali dipasang: simpan semua file di atas
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Saat versi baru aktif: hapus cache versi lama
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Setiap ada request: coba ambil dari cache dulu, kalau tidak ada baru ke internet
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request)
        .then((networkResponse) => {
          // simpan juga hasil dari internet supaya offline berikutnya makin lengkap
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // kalau offline dan file tidak ada di cache, fallback ke index.html
          return caches.match("./index.html");
        });
    })
  );
});
