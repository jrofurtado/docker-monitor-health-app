import React from "react";
import "./ServiceItemRow.css";
import { firstLetterToUpperCase } from "../../../../../resources/scripts";
// Material-UI
import { Grid, IconButton } from "@mui/material";
import { Check, PriorityHigh } from "@mui/icons-material";

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
      <Grid container direction="row" alignItems="center" item xs={6}>
        {healthy ? (
          <IconButton aria-label="health" className="green-color">
            <Check fontSize="small" />
          </IconButton>
        ) : (
          <IconButton aria-label="health" className="red-color">
            <PriorityHigh fontSize="small" />
          </IconButton>
        )}
      </Grid>
    </>
  );
}
