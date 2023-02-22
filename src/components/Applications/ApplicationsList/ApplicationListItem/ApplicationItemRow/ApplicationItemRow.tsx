import React from "react";
import { firstLetterToUpperCase } from "../../../../../resources/scripts";
// Components
import NotificationBell from "../../../../Notifications/NotificationBell/NotificationBell";
// Material-UI
import { Grid, IconButton } from "@mui/material";
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
    <>
      <Grid item xs={6} className="name">
        {firstLetterToUpperCase(name)}
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        item
        xs={6}
      >
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
        {healthy ? (
          <IconButton aria-label="delete" className="green-color">
            <Check fontSize="small" />
          </IconButton>
        ) : (
          <IconButton aria-label="delete" className="red-color">
            <PriorityHigh fontSize="small" />
          </IconButton>
        )}
      </Grid>
    </>
  );
}
