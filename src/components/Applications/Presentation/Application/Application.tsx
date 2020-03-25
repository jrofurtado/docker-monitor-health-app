import React, { useState } from "react";
import "./Application.css";
// Scripts
import { firstLetterToUpperCase } from "../../../../resources/scripts";
// Interfaces
import {
  ApplicationInterface,
  ServerInterface
} from "../../../../resources/interfaces";
// Material-UI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
// Components
import ApplicationItemRow from "./ApplicationItemRow/ApplicationItemRow";

interface props {
  application: ApplicationInterface;
}

export default function Application(props: props) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Paper className="application" onClick={() => handleClick()}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={`server-item max-width ${open ? "active" : ""}`}
        >
          <ApplicationItemRow
            name={props.application.name}
            healthy={props.application.healthy}
          />
        </Grid>

        <Collapse in={open} timeout="auto" unmountOnExit className="max-width">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
            item
            xs={12}
            className={"applications-services max-width"}
          >
            {props.application.servers.map((server: ServerInterface) => (
              <Grid
                key={`${server.name}`}
                container
                direction="row"
                justify="center"
                alignItems="center"
                className="server-item max-width"
              >
                <ApplicationItemRow
                  name={server.name}
                  healthy={server.status.healthy}
                />
              </Grid>
            ))}
          </Grid>
        </Collapse>
      </Paper>
    </>
  );
}
