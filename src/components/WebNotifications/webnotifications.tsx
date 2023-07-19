//makes use of the Notification API to display a notification to the user
import React, { useState, useEffect } from "react";

interface Props {
  title: string;
  options: NotificationOptions;
  onClose?: (event: Event) => void;
}

const WebNotifications = (props: Props): JSX.Element => {
  const { title, options, onClose } = props;
  const [notification, setNotification] = useState<Notification | null>(null);

  const handleNotification = (event: Event) => {
    console.log("Web Notification Closed");
    if (onClose) {
      onClose(event);
    }
  };

  /* useEffect(() => {
    getNotificationInfo()
      .then((data) => console.log("subscribed: "))
      .catch((error) => console.log(error));
  }, []); */

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (Notification.permission === "granted") {
      const notification = new Notification(title, options);
      notification.addEventListener("close", handleNotification);
      setNotification(notification);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Notify me</button>
    </div>
  );
};

export default WebNotifications;
