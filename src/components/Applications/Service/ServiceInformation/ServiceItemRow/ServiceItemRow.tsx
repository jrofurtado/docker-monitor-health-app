import React from "react";
import "./ServiceItemRow.css";
import { firstLetterToUpperCase } from "../../../../../resources/scripts";
// Material-UI
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from '@material-ui/icons/Check';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

interface Props {
  name: string;
  healthy: boolean;
}

export default function ApplicationItemRow(props: Props): JSX.Element {
  const { name, healthy } = props;
  return (
    <>
      <Grid item xs={6} className="name">
        {firstLetterToUpperCase(name)}
      </Grid>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        item
        xs={6}
      >
        {healthy ? (
          <IconButton aria-label="health" className="green-color">
            <CheckIcon fontSize="small" />
          </IconButton>
        ) : (
          <IconButton aria-label="health" className="red-color">
            <PriorityHighIcon fontSize="small" />
          </IconButton>
        )}
      </Grid>
    </>
  );
}
