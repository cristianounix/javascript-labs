const appName = "appname";
const appVersion = "1.5.0";
const STATIC_CACHE = appName + "_STATIC_" + appVersion;

// self.addEventListener("install", function(evt) {
//   console.log("Install....");
// });

self.addEventListener("install", function(evt) {
  console.log("The service worker is being installed. Version " + appVersion);
  evt.waitUntil(precache());
});

// self.addEventListener("activate", function(event) {
//   console.log("Activate....");
// });

self.addEventListener("activate", function(event) {
  console.log("Clearing old stuff for new version: " + appVersion);

  event.waitUntil(caches.keys().then(clearOldCaches));
});


// self.addEventListener('fetch', function(e) {
//   console.log('Fetch ->', e);
// });

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin === location.origin && url.pathname === '/uni/uni.png') {
    //event.respondWith(fetch('/uni/uni_elite.png'));
    event.respondWith(fetch('/uni/uni_is.png'));
  }
});

self.addEventListener('push', function(event) {
  console.log("push notification recieved", event);
  const data = event.data.json();
  let url = "";
  let icon = "favicon-194x194.png";
  if (typeof data.data !== 'undefined') {
    url = (typeof data.data.url !== 'undefined') ? data.data.url : url;
    icon = (typeof data.data.icon !== 'undefined') ? data.data.icon : icon;
  }
  console.log(icon);
  event.waitUntil(
    self.registration.showNotification(data.notification.title, {
      body: data.notification.body,
      data: {
        url: url
      },
      icon: icon
    })
  );
});



function precache() {
  return caches.open(STATIC_CACHE).then(function(cache) {
    //stuff that can be loaded later and is not especially important - we are not waiting for this to startup a page
    // cache.addAll(filesToCache);
    //important stuff, which is necessary to page loading and working - we are waiting for that
    // return cache.addAll(filesToCachePriority);
  });
}

function clearOldCaches(cacheNames) {
  return Promise.all(cacheNames.filter(filterOldCaches).map(deleteCache));
}

function filterOldCaches(cacheName) {
  return cacheName.startsWith(appName) && !cacheName.endsWith(appVersion);
}

function deleteCache(cacheName) {
  console.log("removing old cache: " + cacheName);
  return caches.delete(cacheName);
}
