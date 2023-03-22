import React from "react";
import "../../styles/ServiceItemRow.css";
import { firstLetterToUpperCase } from "../../resources/scripts";
// Material-UI

import { Check, PriorityHigh } from "@mui/icons-material";
import { StyledGrid } from "../../JsxStyles/Styles";

interface Props {
  name: string;
  healthy: boolean;
}

export default function ApplicationItemRow(props: Props): JSX.Element {
  const { name, healthy } = props;
  return (
    <StyledGrid container direction="row" alignItems="center">
      {firstLetterToUpperCase(name)}
      {healthy ? (
        <Check style={{ color: "green", marginLeft: "auto" }} />
      ) : (
        <PriorityHigh style={{ color: "red", marginLeft: "auto" }} />
      )}
    </StyledGrid>
  );
}
