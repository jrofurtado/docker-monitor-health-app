import React, { Fragment } from "react";
import { firstLetterToUpperCase } from "../../../../../resources/scripts";
// Interfaces
import { ApplicationInterface } from "../../../../../resources/interfaces";
// Material-UI
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

interface props {
  name: String;
  healthy: boolean;
}

export default function ApplicationItemRow(props: props) {
  return (
    <>
      <Grid item xs={6}>
        {firstLetterToUpperCase(props.name)}
      </Grid>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        item
        xs={6}
      >
        {props.healthy ? (
          <IconButton aria-label="delete" className="green-color">
            <CheckCircleIcon fontSize="small" />
          </IconButton>
        ) : (
          <IconButton aria-label="delete" className="red-color">
            <CancelIcon fontSize="small" />
          </IconButton>
        )}
      </Grid>
    </>
  );
}
