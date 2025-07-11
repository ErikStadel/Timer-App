// v2: Timer-Screen überarbeitet

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('timer-audio-cache-v2').then(cache => {
            const filesToCache = [
                '/Timer-App/assets/sounds/bell.mp3',
                '/Timer-App/assets/sounds/horn.mp3',
                '/Timer-App/assets/sounds/beep.mp3',
                '/Timer-App/assets/sounds/applause.mp3',
                '/Timer-App/assets/sounds/chime.mp3',
                '/Timer-App/assets/sounds/gong.mp3',
                '/Timer-App/assets/sounds/whoosh.mp3',
                '/Timer-App/assets/sounds/longbeep.mp3',
                '/Timer-App/timer-screen/timer-screen.html'
            ];
            return Promise.all(
                filesToCache.map(file => 
                    fetch(file).then(response => {
                        if (!response.ok) {
                            console.error(`Failed to cache ${file}: Status ${response.status}`);
                            throw new Error(`Failed to cache ${file}`);
                        }
                        return cache.put(file, response);
                    }).catch(error => {
                        console.error(`Error fetching ${file}:`, error);
                        throw error;
                    })
                )
            ).catch(error => {
                console.error('Cache addAll failed:', error);
                throw error;
            });
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

// Cleanup alter Caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => 
            Promise.all(
                keys.filter(key => key !== 'timer-audio-cache-v2')
                    .map(key => caches.delete(key))
            )
        )
    );
});
