import React, { MouseEvent } from "react";
import "./NotificationBell.css";
// Material-UI
import IconButton from "@material-ui/core/IconButton";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
// Snackbar
import { useSnackbar } from "notistack";

interface Props {
  applicationName: string;
  notificationEnabled: boolean;
  notificationGlobalEnabled: boolean;
}

function NotificationBell(props: Props): JSX.Element {
  const {
    applicationName,
    notificationEnabled,
    notificationGlobalEnabled,
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (event: MouseEvent) => {
    event.stopPropagation();

    let message = "";
    if (notificationGlobalEnabled) {
      message = "Está subscrito globalmente";
    } else {
      message = `${
        notificationEnabled ? "Retirou a subscrição a" : "Subscreveu a"
        } ${applicationName}`;
    }

    enqueueSnackbar(message, {
      variant: notificationGlobalEnabled
        ? "warning"
        : notificationEnabled
          ? "warning"
          : "success",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
    });
  };

  return notificationEnabled ? (
    <IconButton
      onClick={handleClick}
      aria-label="notification"
      className="notification-bell active"
    >
      <NotificationsActiveIcon fontSize="small" />
    </IconButton>
  ) : (
      <IconButton
        onClick={handleClick}
        aria-label="notification"
        className="notification-bell"
      >
        <NotificationsOffIcon fontSize="small" />
      </IconButton>
    );
}

export default NotificationBell;
