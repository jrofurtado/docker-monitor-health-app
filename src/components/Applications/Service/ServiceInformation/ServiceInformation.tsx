import React from "react";
import "./ServiceInformation.css";
import { ServiceInterface } from "../../../../resources/interfaces";

interface props {
  service: ServiceInterface | {};
}

export default function ServiceInformation(props: props) {
  const { service } = props;

  /*
  TODO:
  - Display the Data properly
  */

  // If Loading
  if (service === {}) {
    return <p>Service Information</p>;
  } else {
    return (
      <>
        <p>Service Information</p>
        <pre>{JSON.stringify(service, undefined, 2)}</pre>
      </>
    );
  }
}
