import React, { useState, useEffect } from "react";
// Scripts
import { firstLetterToUpperCase } from "../../../resources/scripts";
// Requests
import { getServiceInfo } from "../../../resources/requests";
// Components
import ServiceInformation from "./ServiceInformation/ServiceInformation";
import ServiceHistory from "./ServiceHistory/ServiceHistory";

interface props {
  appName: string;
  serviceName: string;
}

export default function Service(props: props) {
  // State
  const [service, setService] = useState({});

  useEffect(() => {
    getServiceInfo(props.appName, props.serviceName).then(res => {
      console.log("Fetched Service: ", res);
      if (res) {
        setService(res);
      }
    });
  }, []);

  /*
  TODO:
  - Display two switchable Tabs (Information & Service)
  - Display only one Tab's Component at a time
  */

  return (
    <div>
      <h2>
        {firstLetterToUpperCase(props.appName)} -{" "}
        <span>{firstLetterToUpperCase(props.serviceName)}</span>
      </h2>
      <ServiceInformation service={service} />
      <ServiceHistory />
    </div>
  );
}
