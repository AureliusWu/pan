const CACHE = 'panzhongbao-v1.1.0';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/app.js',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  if (url.hostname.includes('1234567.com.cn')) return;
  if (url.hostname.includes('eastmoney.com')) return;
  if (url.hostname.includes('gtimg.cn')) return;

  if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css')) {
    e.respondWith(networkFirst(e.request));
    return;
  }

  e.respondWith(staleWhileRevalidate(e.request));
});

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response && response.ok && request.method === 'GET') {
      const cache = await caches.open(CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await caches.match(request);
    return cached || caches.match('./index.html');
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then(response => {
    if (response && response.ok && request.method === 'GET') {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => cached);
  return cached || fetchPromise;
}