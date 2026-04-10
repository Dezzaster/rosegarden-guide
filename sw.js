var CACHE='rg-v4';
var ASSETS=['/','index.html','icon-192.png','icon-512.png','favicon.png','apple-touch-icon.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS)}));self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}))}));self.clients.claim()});
self.addEventListener('fetch',function(e){
if(e.request.url.indexOf('api.open-meteo.com')!==-1){e.respondWith(fetch(e.request));return}
e.respondWith(fetch(e.request).then(function(r){return r}).catch(function(){return caches.match(e.request)}))
});
