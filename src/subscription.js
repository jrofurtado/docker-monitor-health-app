import { FaSellcast } from "react-icons/fa";

const applicationServerPublicKey =
  "BPf8gkZ051TIP3AiT0R3OyFUNcCwCDwHWOdlmgc6AHR96XPlbAnLwS5J3ZkTeTxxH384B5OCpcpLUfk1ykPWi30";

function urlB64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function enablePushNotifications() {
  if (browserSupportsPush()) {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    const swRegistration = await getServiceWorker();
    return await swRegistration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey,
      })
      .then(function (subscription) {
        console.log("User is subscribed: ", subscription);
        return true;
      })
      .catch(function (err) {
        console.log("Failed to subscribe the user: ", err);
        return false;
      });
  } else {
    return false;
  }
}

async function disablePushNotifications() {
  if (browserSupportsPush()) {
    const swRegistration = await getServiceWorker();
    swRegistration
      .unsubscribe()
      .then(() => {
        console.log("Push Notificaitons - Disabled");
      })
      .catch(function (e) {
        console.log("Push Notificaitons - Enabled");
      });
  }
}

async function getServiceWorker() {
  if (browserSupportsPush()) {
    return await navigator.serviceWorker.ready;
  }
}

function getUserSubscription() {
  if (browserSupportsPush()) {
    //wait for service worker installation to be ready, and then
    return navigator.serviceWorker.ready
      .then(function (serviceWorker) {
        return serviceWorker.pushManager.getSubscription();
      })
      .then(function (pushSubscription) {
        return pushSubscription;
      });
  }
}

async function isClientSubscribed() {
  if (browserSupportsPush()) {
    const subscription = await getUserSubscription();
    const isSubscribed = subscription ? true : false;
    return isSubscribed;
  } else {
    return false;
  }
}

async function executeFetch(fetchCallback) {
  if (browserSupportsPush()) {
    const pushSubscription = await getUserSubscription();
    fetchCallback(pushSubscription);
  }
}

function browserSupportsPush() {
  return "serviceWorker" in navigator && "PushManager" in window;
}

async function isSWActive() {
  if (browserSupportsPush()) {
    return navigator.serviceWorker.ready.then((serviceWorker) => {
      return serviceWorker.active ? true : false;
    });
  } else {
    return false;
  }
}

const subscription = {
  isClientSubscribed,
  enablePushNotifications,
  disablePushNotifications,
  executeFetch,
  browserSupportsPush,
  isSWActive,
};

export default subscription;
