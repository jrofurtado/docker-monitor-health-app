import "./NoDataReceivedItemRow.css";
import { firstLetterToUpperCase } from "../../resources/scripts";
// Material-UI
import { Grid } from "@mui/material";
import { Warning } from "@mui/icons-material";
import { StyledGrid } from "../../resources/Styles";

interface Props {
  name: string;
}

export default function ApplicationItemRow(props: Props): JSX.Element {
  const { name } = props;

  //populates the table with the name of the application and a warning icon

  return (
    <>
      <StyledGrid container direction="row" alignItems="center">
        <Warning style={{ color: "orange", margin: "0.5rem" }} />
        {firstLetterToUpperCase(name)}
      </StyledGrid>
    </>
  );
}
