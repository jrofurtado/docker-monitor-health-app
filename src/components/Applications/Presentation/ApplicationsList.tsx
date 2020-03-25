import React from "react";
import "./ApplicationsList.css";
// Material-UI
import Grid from "@material-ui/core/Grid";
// Components
import Application from "./Application/Application";
// Interfaces
import { ApplicationInterface } from "../../../resources/interfaces";

interface props {
  applications: Array<ApplicationInterface>;
}

export default function ApplicationsList(props: props) {
  const apps = [];

  return (
    <>
      <h2>Applications</h2>
      <Grid container spacing={1}>
        {props.applications.map((application: ApplicationInterface) => (
          <Grid key={`${application.name}`} item xs={12}>
            <Application application={application} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
