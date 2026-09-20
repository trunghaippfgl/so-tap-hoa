const C='so-tap-hoa-v1.2.3-customer-master';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest'])))});
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==C)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('fetch',e=>{if(e.request.mode==='navigate'){e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match('./index.html')));return;}e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});