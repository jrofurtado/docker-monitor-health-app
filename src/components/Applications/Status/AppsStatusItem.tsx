import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { ApplicationsStatusInterface } from "../../../resources/interfaces";

interface Props {
  appStatus: ApplicationsStatusInterface;
}
export default function AppsStatusItem(props: Props): JSX.Element {
  const { appStatus } = props;

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
    console.log("keys", keys);
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
    console.log("apps", apps);
    apps.forEach((app: any) => {
      console.log("app", app);
      const servers = Object.values(app);
      console.log("servers", servers);
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
    <div key={appStatus.timestamp}>
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
          <Typography>detalhes</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
