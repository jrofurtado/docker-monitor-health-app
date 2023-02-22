import React from "react";
import "./NavigationBar.css";
// Material-UI
import { Grid, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

interface Props {
  handleBackButtonClick: () => void;
}

const style = {
  color: blue[50],
};

export default function NavigationBar(props: Props): JSX.Element {
  const { handleBackButtonClick } = props;

  return (
    <div>
      <Grid container>
        <Grid item xs={1}>
          <IconButton onClick={() => handleBackButtonClick()}>
            <ArrowBack style={style} />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}
