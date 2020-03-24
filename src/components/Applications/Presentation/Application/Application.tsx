import React, { useState } from "react";
import "./Application.css";
// Scripts
import { firstLetterToUpperCase } from "../../../../resources/scripts";
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
  application: String;
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
            text={firstLetterToUpperCase(props.application)}
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
            {["server 1", "server 2", "server 3"].map((server: String) => (
              <Grid
                key={`${server}`}
                container
                direction="row"
                justify="center"
                alignItems="center"
                className="server-item max-width"
              >
                <ApplicationItemRow text={firstLetterToUpperCase(server)} />
              </Grid>
            ))}
          </Grid>
        </Collapse>
      </Paper>
    </>
  );
}
