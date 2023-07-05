import React, { MouseEvent, useState, useEffect } from "react";
import { NotificationProps } from "../../resources/interfaces";
import "./NotificationBell.css";
// Material-UI
import { NotificationsActive, NotificationsOff } from "@mui/icons-material";
// Snackbar
import { useSnackbar } from "notistack";
import { getNotificationInfo } from "../../resources/requests";
import WebNotifications from "../WebNotifications/webnotifications";

function NotificationBell(props: NotificationProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { applicationName, notificationEnabled } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [isActive, setISActive] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    let message = isActive
      ? `You have subscribed from ${applicationName} notifications`
      : `You have unsubscribed to ${applicationName} notifications`;

    if (!isFirstRender) {
      enqueueSnackbar(message, {
        variant: "info",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        autoHideDuration: 3000,
      });
    }
    setTitle(applicationName);

    if (isActive) {
      /* 
      <WebNotifications
        title={"Notification"}
        options={{
          body: "You have subscribed to notifications",
          icon: "/favicon.ico",
        }}
        onClose={handleWebNotification}
      />; */

      getNotificationInfo()
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }
    /* else {

      if (Notification.permission === "granted") {
        const notification = new Notification("Notification", {
          body: "You have unsubscribed to notifications",
          icon: "/favicon.ico",
        });
        notification.addEventListener("close", handleWebNotification);
      } */

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  const handleWebNotification = (event: Event) => {
    console.log("Web Notification Closed");
    setTitle(applicationName);
  };

  return (
    <div className="notification-bell">
      {isActive ? (
        <NotificationsActive
          onClick={(e: MouseEvent) => {
            e.stopPropagation();
            setISActive(!isActive);
            setIsFirstRender(false);
          }}
        />
      ) : (
        <NotificationsOff
          onClick={(e: MouseEvent) => {
            e.stopPropagation();
            setISActive(!isActive);
            setIsFirstRender(false);
          }}
        />
      )}
    </div>
  );
}

export default NotificationBell;
