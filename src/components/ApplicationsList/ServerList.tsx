import { StyledGrid } from "../../JsxStyles/Styles";

import { Check, PriorityHigh } from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { firstLetterToUpperCase } from "../../resources/scripts";

interface ServerProps {
  name: string;
  healthy: boolean;
}

export default function ServerList(props: ServerProps): JSX.Element {
  const { name, healthy } = props;

  return (
    <StyledGrid container alignItems="center">
      {firstLetterToUpperCase(name)}

      {healthy ? (
        <Check
          style={{
            color: "green",
            marginLeft: "auto",
          }}
        />
      ) : (
        <PriorityHigh style={{ color: "red", marginLeft: "auto" }} />
      )}
      <ArrowForwardIcon />
    </StyledGrid>
  );
}
