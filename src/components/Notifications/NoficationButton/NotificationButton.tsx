import React, { useState, useEffect } from "react";
import subscription from "../../../subscription";

export default function PushButton(): JSX.Element {
  const swSupported = subscription.browserSupportsPush;
  const [isSWActive, setIsSWActive] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const handleClick = () => {
    if (isSubscribed) {
      subscription.disablePushNotifications().then(() => {
        subscription.isClientSubscribed().then((result) => {
          if (result) {
            setIsSubscribed(result);
          }
        });
      });
    } else {
      subscription
        .enablePushNotifications()
        .then((subscriptionResult) => setIsSubscribed(subscriptionResult));
    }
  };

  useEffect(() => {
    subscription.isClientSubscribed().then((result) => {
      if (result) {
        setIsSubscribed(result);
      }
    });
  }, []);

  useEffect(() => {
    subscription.isSWActive().then((result) => {
      if (result) {
        setIsSWActive(result);
      }
    });
  }, []);

  return (
    <button id="push-btn" onClick={handleClick} disabled={isSubscribed}>
      {!isSWActive
        ? "Push Notifications - No Service Worker"
        : swSupported
        ? isSubscribed
          ? "Disable Push Notifications"
          : "Enable Push Notifications"
        : "Push Notifications - Not Supported"}
    </button>
  );
}
