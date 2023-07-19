import React from "react";
import "./ServiceItemRow.css";
import { firstLetterToUpperCase } from "../../resources/scripts";
// Material-UI

import { Check, PriorityHigh } from "@mui/icons-material";
import { StyledGrid } from "../../resources/Styles";

interface Props {
  name: string;
  healthy: boolean;
}
// shows the name of the application and the status of the application (healthy or not)
export default function ApplicationItemRow(props: Props): JSX.Element {
  const { name, healthy } = props;
  return (
    <StyledGrid container direction="row" alignItems="center">
      {healthy ? (
        <Check style={{ color: "green", margin: "0.5rem" }} />
      ) : (
        <PriorityHigh style={{ color: "red", margin: "0.5rem" }} />
      )}

      {firstLetterToUpperCase(name)}
    </StyledGrid>
  );
}
