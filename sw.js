/**
 * sw.js - ركيزة التنبيهات لتطبيق المنارة
 */

// 1. استقبال التنبيهات من السيرفر (Push)
self.addEventListener('push', function(event) {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { title: 'تنبيه من المنارة', body: event.data.text() };
  }

  const options = {
    body: data.body || 'حان وقت الصلاة بتوقيت جواب',
    icon: '/icon-192.png', // تأكد من وجود الأيقونة بهذا المسار
    badge: '/badge-72.png',
    vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40], // رنة اهتزازية تشبه الأذان
    tag: 'prayer-time', // باش ما يتراكموش التنبيهات فوق بعضهم
    renotify: true,
    requireInteraction: true,
    data: {
      url: self.location.origin
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'حان وقت الصلاة', options)
  );
});

// 2. معالجة الضغط على التنبيه
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      // إذا كان التطبيق مفتوح ديجا، نركزو عليه (Focus)
      for (let client of windowClients) {
        if (client.url === event.notification.data.url && 'focus' in client) {
          return client.focus();
        }
      }
      // إذا كان مغلوق، نفتحوه
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url || '/');
      }
    })
  );
});

// 3. تحديث الـ Service Worker فوراً
self.addEventListener('install', () => {
  self.skipWaiting();
});
