import React from "react";
import "../../styles/NoDataReceivedItemRow.css";
import { firstLetterToUpperCase } from "../../resources/scripts";
// Material-UI
import { Grid, IconButton } from "@mui/material";
import { Warning } from "@mui/icons-material";

interface Props {
  name: string;
}

export default function ApplicationItemRow(props: Props): JSX.Element {
  const { name } = props;
  return (
    <>
      <Grid container direction="row" item xs={12} className="error-container">
        <Grid item xs={6} className="error">
          <h6 className="error-message">{firstLetterToUpperCase(name)}</h6>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          item
          xs={6}
          className="error"
        >
          <IconButton aria-label="health">
            <Warning fontSize="small" className="yellow-color" />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
