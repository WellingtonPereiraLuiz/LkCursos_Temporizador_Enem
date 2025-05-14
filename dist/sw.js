// Service Worker for LK Cursos
const CACHE_NAME = 'lk-cursos-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/main.js',
  '/static/css/main.css'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Push event - handle notification
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/logo192.png',
      badge: '/badge.png',
      tag: data.tag,
      timestamp: data.timestamp,
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
    
    // Log the notification to console
    console.log('Push notification sent:', {
      timestamp: new Date().toISOString(),
      message: data.body
    });
  }
});

// Simulate monthly cron job (will be handled by Trae in production)
// This is just for demonstration purposes
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'monthly-notification') {
    event.waitUntil(sendMonthlyNotification());
  }
});

async function sendMonthlyNotification() {
  try {
    // Get current month and year
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Check if we already sent a notification this month
    const db = await openDatabase();
    const lastNotification = await getLastNotification(db);
    
    if (lastNotification && 
        lastNotification.month === currentMonth && 
        lastNotification.year === currentYear) {
      console.log('Notification already sent this month, skipping');
      return;
    }
    
    // Select random motivational phrase
    const frases = [
      "Foco no objetivo: só mais X dias até você brilhar!",
      "Força para lutar: bora revisar aquela matéria que você tava devendo?",
      "Fé para vencer: respira, recarrega e manda ver na redação!",
      "A dor passa, a aprovação fica — confia no seu potencial!",
      "Tá chegando a hora! Mexa nesse cronômetro e acelera o coração.",
      "Não vacila: revisão hoje é triunfo amanhã!",
      "Olhos na meta: ENEM te espera, vamos juntos!",
      "Treino de hoje: 30 min de exercícios + 1 simulado rápido.",
      "Ritmo acelerado: conte as horas e avance nos estudos.",
      "Coruja alerta: conhecimento noturno ativado — boa revisão!"
    ];
    
    const randomIndex = Math.floor(Math.random() * frases.length);
    const selectedPhrase = frases[randomIndex];
    
    // Show the notification
    await self.registration.showNotification('LK Cursos', {
      body: selectedPhrase,
      tag: 'lkcursos-enem',
      timestamp: Date.now(),
      icon: '/logo192.png'
    });
    
    // Update the last notification record
    await saveLastNotification(db, {
      month: currentMonth,
      year: currentYear,
      phrase: selectedPhrase,
      timestamp: Date.now()
    });
    
    console.log('Monthly notification sent:', {
      timestamp: new Date().toISOString(),
      phrase: selectedPhrase
    });
  } catch (error) {
    console.error('Error sending monthly notification:', error);
  }
}

// IndexedDB functions
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('LKCursosNotifications', 1);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('notifications')) {
        db.createObjectStore('notifications', { keyPath: 'id' });
      }
    };
    
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

function getLastNotification(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['notifications'], 'readonly');
    const store = transaction.objectStore('notifications');
    const request = store.get('lastNotification');
    
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

function saveLastNotification(db, data) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['notifications'], 'readwrite');
    const store = transaction.objectStore('notifications');
    data.id = 'lastNotification';
    const request = store.put(data);
    
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
}