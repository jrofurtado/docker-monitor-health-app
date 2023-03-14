import React from "react";
import "../../styles/ApplicationListItem.css";
// Interfaces
import {
  ApplicationInterface,
  ServerInterface,
} from "../../resources/interfaces";
// Material-UI
import { Collapse, Grid } from "@mui/material";
import { ApplicationGrid, StyledGrid } from "../../JsxStyles/Styles";
// Components
import ApplicationItemRow from "./ApplicationItemRow";

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
      <StyledGrid
        container
        direction="row"
        justifyContent="center"
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
      </StyledGrid>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <ApplicationGrid
          container
          direction="column"
          justifyContent="start"
          alignItems="center"
          item
          xs={12}
        >
          {application.servers.map((server: ServerInterface) => (
            <Grid
              key={`${server.name}`}
              container
              direction="column"
              justifyContent="start"
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
        </ApplicationGrid>
      </Collapse>
    </>
  );
}
