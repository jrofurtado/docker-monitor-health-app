import React, { useEffect, useState } from "react";
import { SnackbarProvider } from "notistack";
//import { useSelector } from "react-redux";
import "./styles/App.css";
// Components

import { Route, Routes, BrowserRouter } from "react-router-dom";

import Applications from "./pages/Applications";
import { ServiceInterface } from "./resources/interfaces";
import ApplicationsStatus from "./components/Status/ApplicationsStatus";
import Service from "./pages/Service";
import { Grid } from "@mui/material";
import Header from "./components/Header";
import NotFound from "./NotFound";

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
  const [service, setService] = useState<ServInterface | any>({
    appName: "",
    serviceName: "",
  });
  const [serv, setServ] = useState<ServiceInterface | any>();
  const [currentComp, setCurrentComp] = useState("Applications");
  const [view, setView] = useState(false);

  useEffect(() => {
    if (currentComp === "Applications") {
      setHeaderTitle("");
    }
    if (currentComp === "ServiceHistory") {
      setHeaderTitle("Service History");
    }
    if (currentComp === "ServiceInformation") {
      setHeaderTitle("Service Information");
    }
  }, [currentComp]);

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

  const handleHeaderTitle = (...args: string[]): void => {
    if (currentComp === "Applications") {
      setHeaderTitle("");
      handleBackButtonClick();
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

  const controllView = (): void => {
    setView(false);
  };

  const handleBackButtonClick = () => {
    console.log("currentComp: " + currentComp);

    if (currentComp === "ServiceHistory") {
      controllView();
      handleServiceClick();
    }

    if (currentComp === "ServiceInformation") {
      controllView();
    }

    if (currentComp === "Applications") {
      controllView();
      setHeaderTitle("");
    }
  };

  // Redux
  //const keycloak = useSelector(state => state.keycloak);
  //keycloak.logout();

  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
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
                  <Grid item xs={12}></Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={10}>
                    <Applications
                      handleServiceClick={handleServiceClick}
                      handleCurrentComp={handleCurrentComp}
                    />
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={10}>
                    <ApplicationsStatus />
                  </Grid>
                  <Grid item xs={1}></Grid>
                </Grid>
              </>
            }
          />

          <Route
            path="/:appName/:serviceName"
            element={
              <>
                {/*  <h3> Qualquer coisa aqui </h3> */}
                <Grid container spacing={2}>
                  <Grid item xs={12}></Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={10}>
                    <Service
                      appName={service.appName}
                      serviceName={service.serviceName}
                      handleHeaderTitle={handleHeaderTitle}
                      handleCurrentComp={handleCurrentComp}
                      handleMessageClick={handleMessageClick}
                      view={view}
                      service={service}
                    />
                  </Grid>
                  <Grid item xs={1}></Grid>
                </Grid>
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
