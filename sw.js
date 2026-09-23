const C='so-tap-hoa-mobile-1.3.0-pos-sync';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest'])))});
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('so-tap-hoa-')&&k!==C)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 if(e.request.mode==='navigate'){
  e.respondWith((async()=>{try{const r=await fetch(e.request,{cache:'no-store'});if(r.ok){const c=await caches.open(C);await c.put('./index.html',r.clone());}return r;}catch{return caches.match('./index.html');}})());return;
 }
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
