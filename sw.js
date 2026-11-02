// Service worker: guarda la app para usarla sin conexión.
// Al cambiar index.html, sube el número de versión para que los teléfonos descarguen la nueva.
var VERSION = "2.5";
var CACHE = "hpextras-v" + VERSION;
var ARCHIVOS = ["./", "./index.html", "./manifest.webmanifest", "./favicon-64.png", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png"];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ARCHIVOS); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") { return; }
  if (e.request.mode === "navigate") {   // la página: primero la red (última versión) y, sin conexión, la copia guardada
    e.respondWith(fetch(e.request).then(function (r) {
      if (r.ok) { var copia = r.clone(); caches.open(CACHE).then(function (c) { c.put("./index.html", copia); }); }
      return r;
    }).catch(function () { return caches.match("./index.html").then(function (x) { return x || new Response("Sin conexión", {status: 503}); }); }));
    return;
  }
  e.respondWith(caches.match(e.request).then(function (r) { return r || fetch(e.request); }));
});
