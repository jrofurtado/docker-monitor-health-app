import React from "react";
import { firstLetterToUpperCase } from "../../resources/scripts";
// Components
import NotificationBell from "../Notifications/NotificationBell";
// Material-UI
import { StyledGrid } from "../../JsxStyles/Styles";
import { Check, PriorityHigh } from "@mui/icons-material";

interface Props {
  name: string;
  healthy: boolean;
  notificationEnabled?: boolean;
  notificationGlobalEnabled: boolean;
}

export default function ApplicationItemRow(props: Props): JSX.Element {
  const { name, healthy, notificationEnabled, notificationGlobalEnabled } =
    props;
  return (
    <StyledGrid container>
      {notificationGlobalEnabled ? (
        <NotificationBell
          applicationName={name}
          notificationEnabled={true}
          notificationGlobalEnabled={notificationGlobalEnabled}
        />
      ) : notificationEnabled !== undefined ? (
        <NotificationBell
          applicationName={name}
          notificationEnabled={notificationEnabled}
          notificationGlobalEnabled={notificationGlobalEnabled}
        />
      ) : null}
      {firstLetterToUpperCase(name)}
      {healthy ? (
        <Check style={{ color: "green", marginLeft: "auto" }} />
      ) : (
        <PriorityHigh style={{ color: "red", marginLeft: "auto" }} />
      )}
    </StyledGrid>
  );
}
