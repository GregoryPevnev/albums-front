const STATIC_CACHE = "static-v-1";
const DYNAMIC_CACHE = "dynamic-v-1";

const parseURL = requestURL => {
    const url = String(requestURL || "/");
    if (url.startsWith("/")) return url;

    const match = url.match(/^https?\:\/\/[^\/]+(\/[^\?]+)(\?.+)?$/);
    if (!match || match.length < 2) return null;
    return match[1];
};

const resources = ["/", "/manifest.json", "/index.html", "/index.css", "/index.js"];

self.addEventListener("install", e => {
    e.waitUntil(caches.open(STATIC_CACHE).then(cache => cache.addAll(resources)));
});

self.addEventListener("activate", e => {
    e.waitUntil(
        caches
            .keys()
            .then(keys =>
                Promise.all(
                    keys.map(cache => (cache === STATIC_CACHE || cache === DYNAMIC_CACHE ? null : caches.delete(cache)))
                )
            )
    );
});

self.addEventListener("fetch", e => {
    const url = parseURL(e.request.url);

    if (resources.includes(url)) return e.respondWith(caches.match(e.request).catch(() => fetch(e.request)));

    return e.respondWith(
        fetch(e.request)
            .then(response => {
                const cloned = response.clone();
                caches.open(DYNAMIC_CACHE).then(cache => cache.put(e.request, response));
                return cloned;
            })
            .catch(() => caches.match(e.request))
    );
});
