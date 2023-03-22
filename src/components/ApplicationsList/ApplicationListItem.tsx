import React from "react";
import "../../styles/ApplicationListItem.css";
// Interfaces
import {
  ApplicationInterface,
  ServerInterface,
} from "../../resources/interfaces";
// Material-UI
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ApplicationGrid, StyledGrid } from "../../JsxStyles/Styles";
// Components
import ApplicationItemRow from "./ApplicationItemRow";
import { ExpandMore } from "@mui/icons-material";

import ServerList from "./ServerList";

interface Props {
  application: ApplicationInterface;
  open: boolean;
  notificationEnabled: boolean;
  handleApplicationClick: (name: string) => void;
  handleServiceClick: (app: string, service: string) => void;
}

export default function ApplicationListItem(props: Props): JSX.Element {
  const {
    application,
    notificationEnabled,
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
    <div className="container">
      <Accordion style={{ margin: "0.5rem 0" }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <ApplicationItemRow
            name={application.name}
            notificationEnabled={notificationEnabled}
            healthy={application.healthy}
          />
        </AccordionSummary>
        <AccordionDetails>
          <StyledGrid container spacing={1} alignContent="center">
            {application.servers.map((server: ServerInterface) => (
              <ApplicationGrid
                alignContent="center"
                item
                key={`${server.name}`}
                onClick={() => handleRowClick(server.name)}
              >
                <ServerList
                  name={server.name}
                  healthy={server.status.healthy}
                />
              </ApplicationGrid>
            ))}
          </StyledGrid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
