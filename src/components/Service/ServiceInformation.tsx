import React, { useState, useEffect } from "react";
import "../../styles/ServiceInformation.css";
//Script
import { firstLetterToUpperCase } from "../../resources/scripts";
// Material-UI

import { GetApp, FindInPage } from "@mui/icons-material";

// import GetAppIcon from "@mui/icons-material/GetApp";
// import FindInPageIcon from "@mui/icons-material/FindInPage";
//Interface
import {
  ContainerInterface,
  ServiceInformationProps,
} from "../../resources/interfaces";
//Components
import JsonHTML from "../../pages/JsonHTML";
import ServiceContainerList from "./ServiceContainerList";
import { StyledButton } from "../../JsxStyles/Styles";

export default function ServiceInformation(
  props: ServiceInformationProps
): JSX.Element {
  const {
    appName,
    serviceName,
    service,
    handleHeaderTitle,
    handleCurrentComp,
  } = props;
  const [containerView, setOpenContainerView] = useState(false);
  const [title, setTitle] = useState("Containers");
  const [text, setText] = useState("View all in JSON");
  const [isJson, setIsJson] = useState(false);

  let date: string =
    service.created.substr(0, 10) + " " + service.created.substr(11, 8);
  let serviceCreatedDate = new Date(date).toLocaleString();

  const openAllInJson = () => {
    setIsJson(!isJson);
    setText(
      text === "View all in JSON" ? "View Individually" : "View all in JSON"
    );
  };

  const viewAllInJson = () => {
    let jsonObject = JSON.stringify(service.containers);
    let formattedJson = jsonObject.split(",").join("\n").split("}").join("\n");
    return (
      <div className="container-div">
        <ul className="json-container">
          <li>{formattedJson}</li>
        </ul>
      </div>
    );
  };

  useEffect(() => {
    handleCurrentComp("ServiceInformation");
    handleHeaderTitle(
      firstLetterToUpperCase(appName),
      firstLetterToUpperCase(serviceName),
      serviceCreatedDate
    );
  }, [
    appName,
    serviceName,
    serviceCreatedDate,
    handleHeaderTitle,
    handleCurrentComp,
  ]);

  // Container State
  const [openContainer, setOpenContainer] = useState<ContainerInterface | null>(
    null
  );

  const handleContainerClick = (
    container: ContainerInterface,
    title: string
  ): void => {
    setOpenContainer(container);
    setOpenContainerView(true);
    setTitle(title);
  };

  const setContainerView = () => {
    setOpenContainerView(false);
    setTitle("Containers");
  };

  const serviceInfoJSON = { ...service };
  serviceInfoJSON.containers = [];
  // delete serviceInfoJSON["containers"];

  return (
    <>
      <JsonHTML
        json={serviceInfoJSON}
        title="Service Information"
        showButtons={false}
      />

      {openContainer && containerView ? (
        <JsonHTML
          title={title}
          json={openContainer}
          closeView={setContainerView}
          showButtons={true}
        />
      ) : (
        <>
          <div className="flex-container">
            <h5>Containers</h5>
            <div>
              <StyledButton
                className="json-button"
                onClick={openAllInJson}
                style={{ backgroundColor: "green", color: "white" }}
              >
                {text}
                <FindInPage fontSize="small" />
              </StyledButton>
              <a
                href={URL.createObjectURL(
                  new Blob([JSON.stringify(service.containers, null, 2)], {
                    type: "text/plain",
                  })
                )}
                download={service.appName + "JSON.txt"}
              >
                <StyledButton
                  className="download-button"
                  style={{ backgroundColor: "grey", color: "white" }}
                >
                  Download All
                  <GetApp fontSize="small" />
                </StyledButton>
              </a>
            </div>
          </div>
          {isJson ? (
            viewAllInJson()
          ) : (
            <ServiceContainerList
              service={service}
              handleContainerClick={handleContainerClick}
            />
          )}
        </>
      )}
    </>
  );
}
