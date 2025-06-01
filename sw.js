self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('timer-audio-cache-v1').then(cache => {
            return cache.addAll([
                '/assets/sounds/bell.mp3',
                '/assets/sounds/horn.mp3',
                '/assets/sounds/beep.mp3',
                '/assets/sounds/applause.mp3',
                '/assets/sounds/chime.mp3',
                '/assets/sounds/gong.mp3',
                '/assets/sounds/whoosh.mp3',
                '/assets/sounds/longbeep.mp3'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
