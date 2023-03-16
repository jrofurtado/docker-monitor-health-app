import { Grid } from "@mui/material";
import { styled } from "@mui/system";

export const StyledGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "0.2rem",
  padding: "0.5rem",
  color: "black",
  width: "100%",
  height: "100%",
  display: "flex",
  cursor: "pointer",
}));

export const ApplicationGrid = styled(Grid)(({ theme }) => ({
  borderTop: "1px solid black",
  backgroundColor: "white",
  color: "black",
  width: "100%",
  height: "100%",
  dispaly: "flex",
}));
