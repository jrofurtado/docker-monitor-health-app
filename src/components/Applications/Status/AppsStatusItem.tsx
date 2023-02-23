import React from "react";
import { ExpandMore } from "@mui/icons-material";
import "./AppsStatusItem.css";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import moment from "moment";
import { ApplicationsStatusInterface } from "../../../resources/interfaces";

interface Props {
  appStatus: ApplicationsStatusInterface;
  prevAppStatus: ApplicationsStatusInterface;
}
export default function AppsStatusItem(props: Props): JSX.Element {
  const { appStatus, prevAppStatus } = props;

  // helper functions

  // format timestamp to YYYY-MM-DD HH:mm
  const formatTimestamp = (timestamp: any) => {
    return moment(timestamp).format("YYYY-MM-DD HH:mm");
  };

  const getAppsKeys = (apps: any) => {
    let keys = [];
    for (let key in apps) {
      keys.push(key);
    }
    return keys;
  };

  const getAppServers = (app: any) => {
    let servers = [];
    for (let key in app) {
      servers.push(key);
    }
    return servers;
  };

  const getAppsCount = (apps: any) => {
    return getAppsKeys(apps).length;
  };

  const getServersCount = (appsObject: any) => {
    let serversCount = 0;
    const apps = Object.values(appsObject);
    apps.forEach((app: any) => {
      serversCount += getAppServers(app).length;
    });
    return serversCount;
  };

  const getContainersCount = (appsObject: any) => {
    let contCount = 0;
    const apps = Object.values(appsObject);
    apps.forEach((app: any) => {
      const servers = Object.values(app);
      servers.forEach((server: any) => {
        contCount += server.containers;
      });
    });
    return contCount;
  };

  return (
    <div key={appStatus.timestamp} className="container">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            {formatTimestamp(appStatus.timestamp)}&nbsp; Apps:&nbsp;
            {getAppsCount(appStatus.apps)}&nbsp; Servers:&nbsp;
            {getServersCount(appStatus.apps)}&nbsp; Containers:&nbsp;
            {getContainersCount(appStatus.apps)}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="details">
            <div className="details-column">
              <Typography>Anterior</Typography>
              <pre>{JSON.stringify(prevAppStatus.apps, null, 2)}</pre>
            </div>
            <div className="details-column">
              <Typography>Actual</Typography>
              <pre>{JSON.stringify(appStatus.apps, null, 2)}</pre>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
