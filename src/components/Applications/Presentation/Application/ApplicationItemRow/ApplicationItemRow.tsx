import React, { Fragment } from "react";
import { firstLetterToUpperCase } from "../../../../../resources/scripts";
// Material-UI
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

interface props {
  text: String;
}

export default function ApplicationItemRow(props: props) {
  return (
    <>
      <Grid item xs={6}>
        {firstLetterToUpperCase(props.text)}
        <IconButton aria-label="delete" className="warning">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Grid>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        item
        xs={6}
      >
        <IconButton aria-label="delete" className="success">
          <CheckCircleIcon fontSize="small" />
        </IconButton>
      </Grid>
    </>
  );
}
