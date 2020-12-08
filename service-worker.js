const filesToCache = [
    '/',
    '/app/css/main.css',
    '/app/js/main.js',
    '/assets/images/favicon.png',
    '/assets/images/bg/dark-sunset-cloud-by-tom-barrett.webp',
    '/assets/images/pwa/icon.png'
];

const staticCacheName = 'pages-cache-v1';

self.addEventListener('install', event => {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
    );
});


// The activate event
// -> Using the activate event to get rid of unused caches in the service worker
// -> These unused caches can be outdated resources that need to be removed to conserve
// space on users' devices. activate event ensure we aren't deleting caches before the 
// new service has taken over the page
self.addEventListener('activate', event => {
    console.log('Activating new service worker...');

    const cacheWhitelist = [staticCacheName];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.log('Found ', event.request.url, ' in cache');
                    return response;
                }
                console.log('Network request for ', event.request.url);
                return fetch(event.request)
                    .then(response => {
                        // TODO 5 - Respond with custom 404 page
                        return caches.open(staticCacheName)
                            .then(cache => {
                                cache.put(event.request.url, response.clone());
                                return response;
                            });
                    });

            }).catch(error => {

                // TODO 6 - Respond with custom offline page

            })
    );
});