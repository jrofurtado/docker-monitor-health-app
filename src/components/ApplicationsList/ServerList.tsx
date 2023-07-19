import React from "react";
import { StyledGrid } from "../../resources/Styles";

import { Check, PriorityHigh } from "@mui/icons-material";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { firstLetterToUpperCase } from "../../resources/scripts";
import { Link, Navigate } from "react-router-dom";
interface ServerProps {
  name: string;
  healthy: boolean;
}

export default function ServerList(props: ServerProps): JSX.Element {
  const { name, healthy } = props;

  return (
    <StyledGrid container alignItems="center">
      {healthy ? (
        <Check
          style={{
            color: "green",
          }}
        />
      ) : (
        <PriorityHigh style={{ color: "red" }} />
      )}

      {firstLetterToUpperCase(name)}
      <ArrowForwardIcon style={{ marginLeft: "auto" }} />
    </StyledGrid>
  );
}
