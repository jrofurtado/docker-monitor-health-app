import React from "react";
import "./ApplicationListItem.css";
// Interfaces
import {
  ApplicationInterface,
  ServerInterface,
} from "../../../../resources/interfaces";
// Material-UI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";
// Components
import ApplicationItemRow from "./ApplicationItemRow/ApplicationItemRow";

interface Props {
  application: ApplicationInterface;
  open: boolean;
  notificationEnabled: boolean;
  notificationGlobalEnabled: boolean;
  handleApplicationClick: (name: string) => void;
  handleServiceClick: (app: string, service: string) => void;
}

export default function ApplicationListItem(props: Props): JSX.Element {
  const {
    application,
    open,
    notificationEnabled,
    notificationGlobalEnabled,
    handleApplicationClick,
    handleServiceClick,
  } = props;

  const handleRowClick = (name: string): void => {
    if (name === application.name) {
      handleApplicationClick(application.name);
    } else {
      handleServiceClick(application.name, name);
    }
  };

  return (
    <>
      <Paper className="application-item">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={`server-item max-width ${open ? "active" : ""}`}
          onClick={(): void => handleRowClick(application.name)}
        >
          <ApplicationItemRow
            name={application.name}
            healthy={application.healthy}
            notificationEnabled={notificationEnabled}
            notificationGlobalEnabled={notificationGlobalEnabled}
          />
        </Grid>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
            item
            xs={12}
          >
            {application.servers.map((server: ServerInterface) => (
              <Grid
                key={`${server.name}`}
                container
                direction="row"
                justify="center"
                alignItems="center"
                className="server-item"
                onClick={(): void => handleRowClick(server.name)}
              >
                <ApplicationItemRow
                  name={server.name}
                  healthy={server.status.healthy}
                  notificationGlobalEnabled={notificationGlobalEnabled}
                />
              </Grid>
            ))}
          </Grid>
        </Collapse>
      </Paper>
    </>
  );
}
