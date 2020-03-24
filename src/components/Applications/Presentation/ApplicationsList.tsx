import React from "react";
import "./ApplicationsList.css";
// Material-UI
import Grid from "@material-ui/core/Grid";
// Components
import Application from "./Application/Application";

interface props {
  applications: Array<String>;
}

export default function ApplicationsList(props: props) {
  return (
    <>
      <h2>Applications</h2>
      <Grid container spacing={1}>
        {[...props.applications, "globaleda"].map((application: String) => (
          <Grid key={`${application}`} item xs={12}>
            <Application application={application} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
