import React from "react";
import "./NoDataReceivedItemRow.css";
import { firstLetterToUpperCase } from "../../../../../resources/scripts";
// Material-UI
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import WarningIcon from '@material-ui/icons/Warning';

interface Props {
  name: string;
}

export default function ApplicationItemRow(props: Props): JSX.Element {
  const { name } = props;
  return (
    <>
      <Grid
        container
        direction="row"
        item
        xs={12}
        className="error-container"
      >
        <Grid item xs={6} className="error">
          <h6 className="error-message">{firstLetterToUpperCase(name)}</h6>
        </Grid>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          item
          xs={6}
          className="error"
        >
          <IconButton aria-label="health" >
            <WarningIcon fontSize="small" className="yellow-color" />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
