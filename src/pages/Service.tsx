import React from "react";
// Components
import ServiceHistory from "../components/Service/ServiceHistory";
import ServiceInformation from "../components/Service/ServiceInformation";

// Interface
import { ServiceInterface } from "../resources/interfaces";

interface Props {
  appName: string;
  serviceName: string;
  handleHeaderTitle: (...args: string[]) => void;
  handleCurrentComp: (currentComp: string) => void;
  view: boolean;
  service: ServiceInterface | any;
  handleMessageClick: (service: ServiceInterface) => void;
}

// POSSIVEL ERRO NA PASSAGFEM DE PROPS

export default function Service(props: Props): JSX.Element {
  const {
    appName,
    serviceName,
    handleHeaderTitle,
    handleCurrentComp,
    view,
    service,
    handleMessageClick,
  } = props;

  console.log("service-be", serviceName);
  console.log("app-be", appName);
  //console.log("props");
  //console.log(props);

  return (
    <>
      {/*  <ServiceInformation
        appName={appName}
        serviceName={serviceName}
        service={service}
        handleHeaderTitle={handleHeaderTitle}
        handleCurrentComp={handleCurrentComp}
      />
      {console.log("service-info", serviceName)}
      {console.log("app-info", appName)} */}

      {console.log("service-historicoo", serviceName)}
      {console.log("app-historico", appName)}
      <ServiceHistory
        appName={appName}
        serviceName={serviceName}
        handleHeaderTitle={handleHeaderTitle}
        handleMessageClick={handleMessageClick}
        handleCurrentComp={handleCurrentComp}
      />
    </>
  );
}
