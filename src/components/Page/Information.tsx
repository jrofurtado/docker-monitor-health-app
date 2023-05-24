import { Grid } from "@mui/material";
import ServiceInformation from "../Service/ServiceInformation";
import { useState } from "react";
import { ServInterface } from "../../resources/interfaces";
import Header from "../Header";

export default function Information() {
  const [service, setService] = useState<ServInterface | any>({
    appName: "",
    serviceName: "",
  });
  const [headerTitle, setHeaderTitle] = useState("");
  const [currentComp, setCurrentComp] = useState("Applications");
  const [view, setView] = useState(false);
  const handleHeaderTitle = (...args: string[]): void => {
    if (currentComp === "Applications") {
      setHeaderTitle("");
    }
    if (currentComp === "ServiceHistory") {
      setHeaderTitle("Service History");
    }
    if (currentComp === "ServiceInformation") {
      setHeaderTitle("Service Information");
    }
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
          <ServiceInformation
            timeStamp={service.timeStamp}
            application={service.appName}
            server={service.serviceName}
            service={service}
            handleHeaderTitle={handleHeaderTitle}
            handleCurrentComp={handleCurrentComp}
          />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </>
  );
}
