const CACHE_NAME = 'deutschmeister-pro-v1';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/assets/css/style.css',
  '/assets/css/modules_extended.css',
  '/assets/css/components.css',
  '/assets/css/career.css',
  '/assets/css/quiz.css',
  '/assets/js/app.js',
  '/assets/js/audio.js',
  '/assets/js/storage.js',
  '/assets/js/pwa_installer.js',
  '/assets/js/articles_trainer.js',
  '/assets/js/time_numbers.js',
  '/assets/js/daily_quests.js',
  '/assets/js/ai_tandem.js',
  '/assets/images/triple_a_logo.jpg',
  '/assets/images/app_icon.svg'
];

// Install Event: Pre-cache core files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('⚡ [Service Worker] Pre-caching core offline assets...');
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('⚠️ [Service Worker] Non-fatal caching issue during install:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('🧹 [Service Worker] Purging old cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Network-First with Cache Fallback for navigation, Stale-While-Revalidate for assets
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Skip non-GET and chrome-extension / external cross-origin requests
  if (req.method !== 'GET' || !url.protocol.startsWith('http')) return;

  // Radio streams and external audio streams should bypass Service Worker cache
  if (url.pathname.endsWith('.mp3') && url.origin !== self.location.origin) return;
  if (url.hostname.includes('stream') || url.hostname.includes('radio') || url.hostname.includes('dradio')) return;

  // Navigation requests (HTML)
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const resClone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          }
          return networkRes;
        })
        .catch(() => caches.match('/index.html') || caches.match('/'))
    );
    return;
  }

  // Static Assets (CSS, JS, Fonts, Images, JSON)
  event.respondWith(
    caches.match(req).then((cachedRes) => {
      const fetchPromise = fetch(req).then((networkRes) => {
        if (networkRes && networkRes.status === 200) {
          const resClone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
        }
        return networkRes;
      }).catch((err) => {
        // Fallback silently if offline
        return cachedRes;
      });

      return cachedRes || fetchPromise;
    })
  );
});
