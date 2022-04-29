import React, { useState } from "react";
import "./ApplicationsList.css";
// Material-UI
import Grid from "@material-ui/core/Grid";
// Components
import ApplicationListItem from "./ApplicationListItem/ApplicationListItem";
// Interfaces
import {
  ApplicationInterface,
  NotificationStatusInterface,
} from "../../../resources/interfaces";

interface Props {
  applications: Array<ApplicationInterface>;
  notificationState: NotificationStatusInterface;
  handleServiceClick: (app: string, service: string) => void;
}

export default function ApplicationsList(props: Props): JSX.Element {
  const { applications, notificationState, handleServiceClick } = props;
  // State
  const [openAppName, setOpenAppName] = useState("");

  const handleApplicationClick = (clickedAppName: string): void => {
    setOpenAppName(openAppName !== clickedAppName ? clickedAppName : "");
  };

  // Get Notification State
  const getNotificationState = (application: ApplicationInterface): boolean => {
    const app = notificationState.apps.find(
      (app) => app.appName === application.name
    );
    return app ? app.isSubscribed : false;
  };

  return (
    <>
      <Grid container spacing={1} className="applications-container">
        {applications.map((application: ApplicationInterface, index: number) => {
          const shouldOpen = openAppName === application.name ? true : false;
          return (
            <Grid key={index} item xs={12}>
              <ApplicationListItem
                application={application}
                open={shouldOpen}
                notificationEnabled={getNotificationState(application)}
                notificationGlobalEnabled={notificationState.global}
                handleApplicationClick={handleApplicationClick}
                handleServiceClick={handleServiceClick}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
