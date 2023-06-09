import React, { useState } from "react";

interface Props {
  title: string;
  options: NotificationOptions;
  onClose?: (event: Event) => void;
}

const WebNotifications: React.FC<Props> = ({ title, options, onClose }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const requestPermission = () => {
    // Verifica se o browser suporta notificações
    if (!("Notification" in window)) {
      console.error("Este browser não suporta notificações.");
    } else if (Notification.permission === "granted") {
      setNotification(new Notification(title, options));
      if (notification != null) {
        if (onClose) notification.addEventListener("close", onClose);
      }
      // No caso do utilizador tenha negado permissão para notificações
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setNotification(new Notification(title, options));
          if (notification != null) {
            if (onClose) notification.addEventListener("close", onClose);
          }
        }
      });
    }
  };

  return <button onClick={requestPermission}> Show Notification </button>;
};

export default WebNotifications;
