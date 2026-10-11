'use strict';
const CACHE='rlminimap-v3.0.0';
const ROOT=new URL('./',self.location.href);
const FILES=['index.html','manifest.webmanifest','icon.svg'].map(p=>new URL(p,ROOT).href);
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);
 await cache.addAll(FILES);
 await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 const keys=await caches.keys();
 await Promise.all(keys.filter(k=>k.startsWith('rlminimap-')&&k!==CACHE).map(k=>caches.delete(k)));
 await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==ROOT.origin||!url.pathname.startsWith(ROOT.pathname))return;
 const key=event.request.mode==='navigate'?FILES[0]:url.origin+url.pathname;
 if(!FILES.includes(key))return;
 // Only the local app shell is cached, never GPS data or external map tiles.
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  try{
   const response=await fetch(event.request);
   if(response.ok){try{await cache.put(key,response.clone());}catch{}}
   return response;
  }catch{
   return await cache.match(key)||new Response('Offline. Bitte Internetverbindung prüfen.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
  }
 })());
});
