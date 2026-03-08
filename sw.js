self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'حان وقت الصلاة';
  const options = {
    body: data.body || 'الله أكبر، الله أكبر...',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [500, 200, 500, 200, 500],
    requireInteraction: true,
    data: {
      url: self.location.origin
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SCHEDULE_NOTIFICATION') {
    const { title, body, delay } = event.data;
    setTimeout(() => {
      self.registration.showNotification(title, {
        body,
        icon: '/favicon.ico',
        vibrate: [500, 200, 500, 200, 500],
        requireInteraction: true
      });
    }, delay);
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});
