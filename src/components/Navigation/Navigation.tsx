import React, { useState } from "react";
// Components
import Applications from "../Applications/Applications";
import Service from '../Applications/Service/Service';
// Material-UI
import Container from "@material-ui/core/Container";
import Header from "../Header/Header";
import { ServiceInterface } from "../../resources/interfaces";

interface ServInterface {
  serviceName: string;
  appName: string;
}

interface Props {
  kc: any;
}

export default function Navigation(props: Props): JSX.Element {
  const { kc } = props;
  const [headerTitle, setHeaderTitle] = useState("");
  const [service, setService] = useState<ServInterface>({ appName: "", serviceName: "" });
  const [serv, setServ] = useState<ServiceInterface | any>();
  const [currentComp, setCurrentComp] = useState("Applications");
  const [view, setView] = useState(false);

  const handleServiceClick = (app: string = "", serviceName: string = ""): void => {
    setService({ appName: app, serviceName: serviceName });
  };

  const handleHeaderTitle = (...args: string[]): void => {
    let title: string = "";
    if (args.length === 0) {
      title = "Applications"
    } else {
      title = args.join(" ");
    }
    setHeaderTitle(title);
  }

  const handleCurrentComp = (currentComp: string) => {
    setCurrentComp(currentComp);
  }


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
    }

    return handleServiceClick();
  }

  return service.serviceName !== "" ? (
    <div>
      <Header kc={kc} title={headerTitle} currentComp={currentComp} handleBackButtonClick={handleBackButtonClick} />
      <Container maxWidth="md">
        <Service appName={service.appName} serviceName={service.serviceName} handleHeaderTitle={handleHeaderTitle}
          handleCurrentComp={handleCurrentComp} handleMessageClick={handleMessageClick} view={view} service={serv} />
      </Container>
    </div>
  ) : (
      <div>
        <Header kc={kc} title={headerTitle} currentComp={currentComp} handleBackButtonClick={() => null} />
        <Container maxWidth="md">
          <Applications handleServiceClick={handleServiceClick} handleHeaderTitle={handleHeaderTitle} handleCurrentComp={handleCurrentComp} />
        </Container>
      </div>
    );
}