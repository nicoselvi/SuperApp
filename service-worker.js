self.addEventListener('install', e => {
    console.log('Service Worker installato');
});
self.addEventListener('fetch', e => {
    // potresti aggiungere cache qui
});