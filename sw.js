self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('timer-audio-cache-v1').then(cache => {
            return cache.addAll([
                '/Timer-App/assets/sounds/bell.mp3',
                '/Timer-App/assets/sounds/horn.mp3',
                '/Timer-App/assets/sounds/beep.mp3',
                '/Timer-App/assets/sounds/applause.mp3',
                '/Timer-App/assets/sounds/chime.mp3',
                '/Timer-App/assets/sounds/gong.mp3',
                '/Timer-App/assets/sounds/whoosh.mp3',
                '/Timer-App/assets/sounds/longbeep.mp3'
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
