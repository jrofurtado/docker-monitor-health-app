import React from "react";
import { firstLetterToUpperCase } from "../../resources/scripts";
// Components
import NotificationBell from "../Notifications/NotificationBell";
// Material-UI
import { StyledGrid } from "../../resources/Styles";
import { Check, PriorityHigh } from "@mui/icons-material";

interface Props {
  name: string;
  healthy: boolean;
  notificationEnabled?: boolean;
}
// shows the name of the application and the status of the application (healthy or not)
export default function ApplicationItemRow(props: Props): JSX.Element {
  const { name, healthy, notificationEnabled } = props;
  return (
    <StyledGrid container alignItems="center">
      {firstLetterToUpperCase(name)}
      {healthy ? (
        <Check style={{ color: "green", marginLeft: "auto" }} />
      ) : (
        <PriorityHigh style={{ color: "red", marginLeft: "auto" }} />
      )}
      {notificationEnabled ? (
        <NotificationBell applicationName={name} notificationEnabled={true} />
      ) : notificationEnabled !== undefined ? (
        <NotificationBell
          applicationName={name}
          notificationEnabled={notificationEnabled}
        />
      ) : null}
    </StyledGrid>
  );
}
