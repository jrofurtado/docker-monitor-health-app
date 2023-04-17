import React from "react";
import "../../styles/ApplicationListItem.css";
// Interfaces
import {
  ApplicationInterface,
  ServerInterface,
} from "../../resources/interfaces";
// Material-UI
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from "@mui/material";
import { StyledGrid } from "../../JsxStyles/Styles";
// Components
import ApplicationItemRow from "./ApplicationItemRow";
import { BorderTop, ExpandMore } from "@mui/icons-material";

import ServerList from "./ServerList";
import { Link } from "react-router-dom";

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

  const handleRowClick = (name: string, server: string): void => {
    /*  if (name === application.name) {
      handleApplicationClick(application.name);
    } */

    handleApplicationClick(name);
    handleServiceClick(name, server);
    console.log("name" + name);
    /* console.log("appliocation" + application); */
    console.log("Chaves das Applications");
    console.log(Object.keys(application));
    console.log("Valores das Applications");
    console.log(Object.values(application));
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
              <Grid
                style={{
                  width: "100%",
                  textDecoration: "none",
                  borderTop: "1px 75% black solid",
                }}
                component={Link}
                to={`${application.name}/${server.name}`}
                alignContent="center"
                item
                key={`${server.name}`}
                onClick={() => {
                  handleRowClick(application.name, server.name);
                }}
              >
                <ServerList
                  name={server.name}
                  healthy={server.status.healthy}
                />
              </Grid>
            ))}
          </StyledGrid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
