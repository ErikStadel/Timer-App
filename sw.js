// Timer App Service Worker - v3.1 (Offline-Ready & Auto-Updating)
const CACHE_NAME = 'timer-app-v3';

const isGitHubPages = self.location.pathname.includes('/Timer-App');
const prefix = isGitHubPages ? '/Timer-App' : '';

const PRECACHE_ASSETS = [
    `${prefix}/`,
    `${prefix}/index.html`,
    `${prefix}/manifest.json`,
    `${prefix}/home-screen/index.html`,
    `${prefix}/home-screen/timer-review/timer-review.html`,
    `${prefix}/timer-screen/timer-screen.html`,
    `${prefix}/timer-editor/timer-editor.html`,
    `${prefix}/interval-editor/interval-editor.html`,
    `${prefix}/interval-editor/interval-sounds.html`,
    `${prefix}/options-screen/options-screen.html`,
    `${prefix}/options-screen/Sound/sound-settings.html`,
    `${prefix}/options-screen/signals/signals-screen.html`,
    `${prefix}/options-screen/signals/signal-select.html`,
    `${prefix}/options-screen/data/data-screen.html`,
    `${prefix}/js/dataStorage.js`,
    `${prefix}/js/ui-config.js`,
    `${prefix}/assets/sounds/bell.mp3`,
    `${prefix}/assets/sounds/horn.mp3`,
    `${prefix}/assets/sounds/beep.mp3`,
    `${prefix}/assets/sounds/applause.mp3`,
    `${prefix}/assets/sounds/chime.mp3`,
    `${prefix}/assets/sounds/gong.mp3`,
    `${prefix}/assets/sounds/whoosh.mp3`,
    `${prefix}/assets/sounds/longbeep.mp3`
];

// Installation: Cache alle Kern-Dateien vor
self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[SW] Pre-caching aller App-Dateien...');
            return Promise.allSettled(
                PRECACHE_ASSETS.map(url =>
                    fetch(url).then(response => {
                        if (!response.ok) {
                            console.warn(`[SW] Konnte ${url} nicht cachen: Status ${response.status}`);
                            return;
                        }
                        return cache.put(url, response);
                    }).catch(err => {
                        console.warn(`[SW] Fehler beim Cachen von ${url}:`, err);
                    })
                )
            );
        })
    );
});

// Aktivierung: Alte Caches aufräumen & Clients sofort übernehmen
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => {
                    console.log('[SW] Lösche alten Cache:', key);
                    return caches.delete(key);
                })
            )
        ).then(() => self.clients.claim())
    );
});

// Fetch-Strategie:
// - Sounds und statische Assets: Cache-First
// - HTML, JS, CSS: Network-First mit automatischem Offline-Fallback
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // Audio-Dateien: Cache First
    if (url.pathname.endsWith('.mp3')) {
        event.respondWith(
            caches.match(event.request).then(cached => {
                if (cached) return cached;
                return fetch(event.request).then(response => {
                    if (response.ok) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then(c => c.put(event.request, copy));
                    }
                    return response;
                });
            })
        );
        return;
    }

    // Alle anderen Requests (HTML, JS, CSS): Network-First mit Cache-Fallback
    event.respondWith(
        fetch(event.request)
            .then(networkResponse => {
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                return caches.match(event.request).then(cachedResponse => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    // Fallback für Seitennavigation
                    if (event.request.mode === 'navigate') {
                        return caches.match(`${prefix}/home-screen/index.html`);
                    }
                });
            })
    );
});
