// Increment VERSION together with app-version in index.html for each release.
const VERSION='1.3.3';
const C='so-tap-hoa-mobile-'+VERSION;
self.addEventListener('install',e=>e.waitUntil((async()=>{
 const response=await fetch(new Request('./index.html',{cache:'no-store'}));
 if(!response.ok)throw new Error('New app not available');
 const html=await response.clone().text();
 if(!html.includes('name="app-version" content="'+VERSION+'"'))throw new Error('Release files not ready together');
 const cache=await caches.open(C);
 await cache.put('./index.html',response);
 // Wait for the app to finish its current task before activation.
})()));
self.addEventListener('message',e=>{if(e.data?.type==='ACTIVATE_UPDATE')e.waitUntil(self.skipWaiting());});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const url=new URL(e.request.url);
 if(url.origin!==self.location.origin)return;
 if(e.request.mode==='navigate'){
  e.respondWith((async()=>{
   try{const response=await fetch(e.request,{cache:'no-store'});if(response.ok)return response;}
   catch{}
   const cache=await caches.open(C);
   return await cache.match('./index.html')||new Response('Cần kết nối mạng để mở ứng dụng.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
  })());return;
 }
 // Never serve old application code or manifest from another release's cache.
});
