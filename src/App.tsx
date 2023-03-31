import React, { useState } from "react";
import { SnackbarProvider } from "notistack";
//import { useSelector } from "react-redux";
import "./styles/App.css";
// Components

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Applications from "./pages/Applications";
import { ServiceInterface } from "./resources/interfaces";
import ApplicationsStatus from "./components/Status/ApplicationsStatus";
import Service from "./pages/Service";
import { Grid } from "@mui/material";
import Header from "./components/Header";

interface Props {
  kc: any;
}
interface ServInterface {
  serviceName: string;
  appName: string;
}
function App(props: Props): JSX.Element {
  const { kc } = props;

  const [headerTitle, setHeaderTitle] = useState("");
  const [service, setService] = useState<ServInterface>({
    appName: "",
    serviceName: "",
  });
  const [serv, setServ] = useState<ServiceInterface | any>();
  const [currentComp, setCurrentComp] = useState("Applications");
  const [view, setView] = useState(false);

  const handleServiceClick = (
    app: string = "",
    serviceName: string = ""
  ): void => {
    setService({ appName: app, serviceName: serviceName });
    setView(true);

    const newUrl = "/" + app + "/" + serviceName;

    window.location.href = newUrl;
  };

  const handleHeaderTitle = (...args: string[]): void => {
    let title: string = "";
    if (args.length === 0) {
      title = "Applications";
    } else {
      title = args.join(" ");
    }
    setHeaderTitle(title);
  };

  const handleCurrentComp = (currentComp: string) => {
    setCurrentComp(currentComp);
  };

  const handleMessageClick = (service: ServiceInterface): void => {
    setServ(service);
    setView(true);
  };

  const controllView = (): void => {
    setView(false);
  };

  const handleBackButtonClick = () => {
    if (currentComp !== "ServiceHistory") {
      return controllView();
    } else {
      window.location.href = "/";
    }
  };

  // Redux
  //const keycloak = useSelector(state => state.keycloak);
  //keycloak.logout();

  return (
    <Router>
      <SnackbarProvider maxSnack={3}>
        <Header
          kc={kc}
          title={headerTitle}
          currentComp={currentComp}
          handleBackButtonClick={handleBackButtonClick}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Applications
                      handleServiceClick={handleServiceClick}
                      handleHeaderTitle={handleHeaderTitle}
                      handleCurrentComp={handleCurrentComp}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ApplicationsStatus />
                  </Grid>
                </Grid>
              </>
            }
          />
        </Routes>
        <Routes>
          <Route
            path="/:appName/:serviceName"
            element={
              <Service
                appName={service.appName}
                serviceName={service.serviceName}
                handleHeaderTitle={handleHeaderTitle}
                handleCurrentComp={handleCurrentComp}
                handleMessageClick={handleMessageClick}
                view={view}
                service={serv}
              />
            }
          />
        </Routes>
      </SnackbarProvider>
    </Router>
  );
}

export default App;
