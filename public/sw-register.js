// Service Worker Registration Script

// Register the service worker only in production and if supported by the browser
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
        
        // Check for updates every hour
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);
      })
      .catch(function(error) {
        console.error('Service Worker registration failed:', error);
      });
  });

  // Handle service worker updates
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', function() {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  // Add event listener for offline/online status changes
  window.addEventListener('online', function() {
    console.log('Application is online. Syncing latest data...');
    // You could trigger a refresh of critical data here
  });

  window.addEventListener('offline', function() {
    console.log('Application is offline. Using cached data...');
    // You could show an offline notification here
  });
}