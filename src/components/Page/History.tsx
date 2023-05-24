import { Grid } from "@mui/material";
import ServiceHistory from "../Service/ServiceHistory";
import { useState } from "react";
import {
  ServInterface,
  ServiceInterface,
  KcProps,
} from "../../resources/interfaces";

export default function History() {
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
  /* const homeNavigate = () => {
    setCurrentComp("Applications");
  }; */
  const handleMessageClick = (service: ServiceInterface): void => {
    setService(service);
    setView(true);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={1}></Grid>

        <Grid item xs={10}>
          <ServiceHistory
            appName={service.appName}
            serviceName={service.serviceName}
            handleHeaderTitle={handleHeaderTitle}
            handleCurrentComp={handleCurrentComp}
            handleMessageClick={handleMessageClick}
          />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </>
  );
}
