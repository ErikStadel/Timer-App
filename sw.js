self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('timer-audio-cache-v1').then(cache => {
            return cache.addAll([
                // Ersetze mit den tatsächlichen Pfaden deiner MP3-Dateien aus loadSignals()
                '../sounds/intervalStart.mp3',
                '../sounds/restStart.mp3',
                '../sounds/halfway.mp3',
                '../sounds/fiveSecond.mp3'
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
