const convetedVapidKey = urlBase64ToUint8Array(
  "BClE8PGSB-1tCRfeEzwEDxUYOLiGnTNTyENMWVHtqUWx26apiC4suVMKVsRJn-B6H7E5J1b1UTLhy_CvimdNljk"
);

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function sendSubscriptionToBackEnd(subscription: PushSubscription) {
  return fetch(`${process.env.WEB_PUSH_ENDPOINT}/notifications/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
}

export function subscribeUser() {
  navigator.serviceWorker?.ready.then(function (registration) {
    if (!registration.pushManager) {
      alert("Push Unsupported");
      return;
    }
    registration.pushManager
      .getSubscription()
      .then(function (existedSubscription) {
        if (existedSubscription === null) {
          console.log("No subscription detected, make a request.");
          registration.pushManager
            .subscribe({
              applicationServerKey: convetedVapidKey,
              userVisibleOnly: true,
            })
            .then(function (newSubscription) {
              console.log("New subscription added.");
              sendSubscriptionToBackEnd(newSubscription);
              return;
            })
            .catch(function (e) {
              if (Notification.permission !== "granted") {
                alert("Permission was not granted.");
              } else {
                console.error(
                  "An error ocurred during the subscription process.",
                  e
                );
              }
            });
        } else {
          console.log("Existed subscription detected.");
          sendSubscriptionToBackEnd(existedSubscription);
        }
      })
      .catch(function (e) {
        console.error(
          "An error ocurred during Service Worker registration.",
          e
        );
      });
  });
}
