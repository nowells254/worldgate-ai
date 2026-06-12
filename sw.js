var CACHE = 'worldgate-ai-v1';
var FILES = [
  '/worldgate-ai/',
  '/worldgate-ai/index.html',
  '/worldgate-ai/manifest.json'
];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES);}));
});

self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.match(e.request).then(function(r){
      return r || fetch(e.request).catch(function(){
        return caches.match('/worldgate-ai/');
      });
    })
  );
});
