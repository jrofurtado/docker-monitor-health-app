import { Grid } from "@mui/material";
import Applications from "../../pages/Applications";
import ApplicationsStatus from "../Status/ApplicationsStatus";
import { useState } from "react";
import { ServInterface } from "../../resources/interfaces";

export default function Home() {
  const [service, setService] = useState<ServInterface | any>({
    appName: "",
    serviceName: "",
  });
  const [view, setView] = useState(false);
  const [currentComp, setCurrentComp] = useState("Applications");
  const handleServiceClick = (
    app: string = "",
    serviceName: string = ""
  ): void => {
    setService({ appName: app, serviceName: serviceName });
    setView(true);

    console.log("app" + app);
    console.log("serviceName" + serviceName);
    // Redirect to Service
  };
  const handleCurrentComp = (currentComp: string) => {
    setCurrentComp(currentComp);
    console.log("now" + currentComp);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Applications
            handleServiceClick={handleServiceClick}
            handleCurrentComp={handleCurrentComp}
          />
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          <ApplicationsStatus />
        </Grid>
      </Grid>
    </>
  );
}
