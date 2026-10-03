const CACHE_NAME = 'deutschmeister-pro-v13';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/sw.js',
  '/manifest.webmanifest',
  '/assets/css/style.css',
  '/assets/css/components.css',
  '/assets/css/quiz.css',
  '/assets/css/career.css',
  '/assets/css/modules_extended.css',
  '/assets/js/ai_tandem.js',
  '/assets/js/app.js',
  '/assets/js/assessment_utils.js',
  '/assets/js/articles_trainer.js',
  '/assets/js/audio.js',
  '/assets/js/career.js',
  '/assets/js/cloud_progress_sync.js',
  '/assets/js/compound_words.js',
  '/assets/js/curriculum_manager.js',
  '/assets/js/daily_quests.js',
  '/assets/js/dialogues.js',
  '/assets/js/emails.js',
  '/assets/js/exam_simulator.js',
  '/assets/js/flashcards.js',
  '/assets/js/gamification.js',
  '/assets/js/grammar_vault.js',
  '/assets/js/living_guide.js',
  '/assets/js/prep_verbs.js',
  '/assets/js/profile_manager.js',
  '/assets/js/pwa_installer.js',
  '/assets/js/quiz.js',
  '/assets/js/radio_player.js',
  '/assets/js/sentence_builder.js',
  '/assets/js/speech_trainer.js',
  '/assets/js/storage.js',
  '/assets/js/supabase_config.js',
  '/assets/js/stories.js',
  '/assets/js/time_numbers.js',
  '/assets/js/verbs.js',
  '/data/articles_trainer.js',
  '/data/career_vocab.js',
  '/data/compound_words.js',
  '/data/curriculum.js',
  '/data/curriculum_content.js',
  '/data/dialogues.js',
  '/data/email_templates.js',
  '/data/exam_simulator.js',
  '/data/grammar_rules.js',
  '/data/living_guide.js',
  '/data/level_assessments.js',
  '/data/preposition_verbs.js',
  '/data/radio_stations.js',
  '/data/sentence_builder.js',
  '/data/stories.js',
  '/data/time_numbers.js',
  '/data/verbs.js',
  '/data/vocab.js',
  '/data/vocab_a1.js',
  '/data/vocab_a2.js',
  '/data/vocab_b1.js',
  '/assets/images/triple_a_logo.jpg',
  '/assets/images/app_icon.svg',
  '/assets/images/app_icon_192.png',
  '/assets/images/app_icon_512.png',
  '/assets/vendor/supabase.js'
];

// Install Event: Pre-cache core files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('⚡ [Service Worker] Pre-caching core offline assets...');
      return cache.addAll(CORE_ASSETS);
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

  if (req.method !== 'GET' || !url.protocol.startsWith('http') || url.origin !== self.location.origin) return;

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
            event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone)));
          }
          return networkRes;
        })
        .catch(async () => {
          const offlinePage = await caches.match('/index.html');
          if (!offlinePage) throw new Error('Offline app shell is missing from the cache.');
          return offlinePage;
        })
    );
    return;
  }

  // Static Assets (CSS, JS, Fonts, Images, JSON)
  event.respondWith(
    (async () => {
      const cachedRes = await caches.match(req, { ignoreSearch: true });
      const fetchPromise = fetch(req).then((networkRes) => {
        if (networkRes && networkRes.status === 200) {
          const resClone = networkRes.clone();
          event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone)));
        }
        return networkRes;
      }).catch((err) => {
        if (cachedRes) return cachedRes;
        throw err;
      });

      if (cachedRes) {
        event.waitUntil(fetchPromise.then(() => undefined, () => undefined));
        return cachedRes;
      }
      return fetchPromise;
    })()
  );
});
