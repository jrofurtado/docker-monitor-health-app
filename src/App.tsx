import React, { useEffect, useState } from "react";
import { SnackbarProvider } from "notistack";

import "./styles/App.css";
// Components

import { Route, Routes, BrowserRouter, Link } from "react-router-dom";

import Applications from "./pages/Applications";
import { ServiceInterface } from "./resources/interfaces";
import ApplicationsStatus from "./components/Status/ApplicationsStatus";

import { Grid } from "@mui/material";
import Header from "./components/Header";
import NotFound from "./NotFound";
import ServiceHistory from "./components/Service/ServiceHistory";
import ServiceInformation from "./components/Service/ServiceInformation";
import Home from "./components/Page/Home";
import History from "./components/Page/History";
import Information from "./components/Page/Information";

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

  const [currentComp, setCurrentComp] = useState("Applications");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    if (currentComp === "Applications") {
      return null;
    }
    if (currentComp === "ServiceInformation") {
      <Link to=".." />;
      return controllView();
    }

    if (currentComp === "ServiceHistory") {
      <Link to={`/`} />;
    }

    return handleServiceClick();
    /* if (currentComp === "ServiceHistory") {
      controllView();
      handleServiceClick();
    }
    

    if (currentComp === "ServiceInformation") {
      controllView();
    }

    if (currentComp === "Applications") {
      controllView();
      setHeaderTitle("");
    } */
  };

  // Redux
  //const keycloak = useSelector(state => state.keycloak);
  //keycloak.logout();

  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Header kc={kc} title={headerTitle} currentComp={currentComp} />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="logs/:appName/:serviceName/" element={<History />} />
          <Route
            path="logs/:appName/:serviceName/:time/info/:key/:timeStamp"
            element={<Information />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
