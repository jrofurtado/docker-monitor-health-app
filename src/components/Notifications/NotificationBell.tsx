import React, { MouseEvent, useState, useEffect } from "react";
import { NotificationProps } from "../../resources/interfaces";
import "../../styles/NotificationBell.css";
// Material-UI
import { NotificationsActive, NotificationsOff } from "@mui/icons-material";
// Snackbar
import { useSnackbar } from "notistack";

function NotificationBell(props: NotificationProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { applicationName, notificationEnabled } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [isActive, setISActive] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

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
