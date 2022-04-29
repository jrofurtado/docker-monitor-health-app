import React from "react";
import "./NavigationBar.css"
// Material-UI
import Grid from "@material-ui/core/Grid";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import blue from "@material-ui/core/colors/purple";

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
            <ArrowBackIcon style={style} />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}
