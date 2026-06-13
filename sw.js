var CACHE='wg-v2';
self.addEventListener('install',function(e){
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function(c){
      return c.addAll(['/worldgate-ai/index.html','/worldgate-ai/manifest.json','/worldgate-ai/icon.svg']);
    })
  );
});
self.addEventListener('activate',function(e){
  e.waitUntil(clients.claim());
});
self.addEventListener('fetch',function(e){
  e.respondWith(
    fetch(e.request).catch(function(){
      return caches.match(e.request).then(function(r){
        return r||caches.match('/worldgate-ai/index.html');
      });
    })
  );
});
