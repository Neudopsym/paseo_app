// Paseo service worker: the app opens even without internet.
// Speech recognition itself still needs internet (Google's recogniser in Chrome).
const CACHE = "paseo-v11";
const PREFIX = "paseo-v";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./data/es/a1.json", "./data/es/a2.json", "./data/es/b1.json", "./data/es/b2.json", "./data/es/course.json", "./data/es/grammar.json", "./data/es/verbs.json", "./data/ru/a1.json", "./data/ru/a2.json", "./data/ru/b1.json", "./data/ru/b2.json", "./data/ru/course.json", "./data/ru/grammar.json", "./data/ru/verbs.json", "./fonts/figtree-latin-ext-wght-normal.woff2", "./fonts/figtree-latin-wght-normal.woff2", "./fonts/fonts.css", "./fonts/lexend-latin-ext-wght-normal.woff2", "./fonts/lexend-latin-wght-normal.woff2", "./fonts/noto-sans-cyrillic-wght-normal.woff2", "./fonts/noto-sans-latin-ext-wght-normal.woff2", "./fonts/noto-sans-latin-wght-normal.woff2", "./fonts/noto-sans.css",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png", "./icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
const networkFirst = (req, key) => fetch(req).then(res => {
  if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(key || req, copy)); }
  return res;
}).catch(() => caches.match(key || req));
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // The page and the course data: network first, so new lessons from GitHub show up at once; saved copy offline.
  if (req.mode === "navigate") { e.respondWith(networkFirst(req, "./index.html")); return; }
  if (url.origin === location.origin && url.pathname.includes("/data/")) { e.respondWith(networkFirst(new Request(url.pathname))); return; }
  // Icons, manifest and fonts: saved copy first, refreshed in the background.
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req).then(hit => {
      const net = fetch(req).then(res => { if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; }).catch(() => hit);
      return hit || net;
    }));
  }
});
