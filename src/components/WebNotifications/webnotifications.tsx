import React, {useState} from 'react';

interface Props {
    title:    string;
    options:  NotificationOptions;
    onClose?: (event: Event) => void;
}

const WebNotifications: React.FC<Props> = ({title, options, onClose}) => {
    const [notification, setNotification] = useState<Notification | null>(null);

    const requestPermission = () => {

        if (!("Notification" in window)) {
            console.error("Este browser não suporta notificações.");
        } else if (Notification.permission === "granted") {
            setNotification(new Notification(title, options));
            if (notification != null) {
                if (onClose) notification.addEventListener("close", onClose);
            }
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
