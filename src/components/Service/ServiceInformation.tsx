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
import { useLocation } from "react-router-dom";
import { getServiceHistory } from "../../resources/requests";

export default function ServiceInformation(
  props: ServiceInformationProps
): JSX.Element {
  const { application, server, service, handleHeaderTitle, handleCurrentComp } =
    props;
  let location = useLocation();
  const [containerView, setOpenContainerView] = useState(false);
  const [title, setTitle] = useState("Containers");
  const [text, setText] = useState("View all in JSON");
  const [isJson, setIsJson] = useState(false);
  const [serv, setServ] = useState<string>(
    server ?? location.pathname.split("/")[3]
  );
  const [app, setApp] = useState<string>(
    application ?? location.pathname.split("/")[2]
  );

  useEffect(() => {
    if (!application || !server) {
      setApp(location.pathname.split("/")[2]);
      setServ(location.pathname.split("/")[3]);
      console.log(`path ${location.pathname}`);
    }
  }, []);

  let date: string =
    service.created === undefined ? "" : service.created.toString();

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
    handleHeaderTitle(app, serv, serviceCreatedDate);
  }, [app, serv, serviceCreatedDate, handleHeaderTitle, handleCurrentComp]);

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
      <div className="service-info-container">
        <div className="service-info">
          <div className="service-info-header">
            <h3>{serv}</h3>
            <div className="service-info-header-buttons">
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
                  new Blob([JSON.stringify(service, null, 2)], {
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
          <div className="service-info-body">
            {isJson ? (
              viewAllInJson()
            ) : (
              <ServiceContainerList
                service={service}
                handleContainerClick={handleContainerClick}
              />
            )}
          </div>
        </div>
        <div className="service-info-json">
          <JsonHTML
            json={serviceInfoJSON}
            title="Service Information"
            showButtons={false}
          />
        </div>
      </div>

      {openContainer && containerView ? (
        <JsonHTML
          title={title}
          json={openContainer}
          closeView={setContainerView}
          showButtons={true}
        />
      ) : null}
    </>
  );
}
