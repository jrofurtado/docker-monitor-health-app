import React, { useState, useEffect } from "react";
import "./ServiceInformation.css";
//Script
import { firstLetterToUpperCase } from "../../../../resources/scripts";
// Material-UI
import GetAppIcon from "@material-ui/icons/GetApp";
import FindInPageIcon from "@material-ui/icons/FindInPage";
//Interface
import {
  ServiceInterface,
  ContainerInterface,
} from "../../../../resources/interfaces";
//Components
import JsonHTML from "../../../JsonHTML/JsonHTML";
import ServiceContainerList from "./ServiceContainerList/ServiceContainerList";

interface Props {
  appName: string;
  serviceName: string;
  service: ServiceInterface;
  handleHeaderTitle: (...args: string[]) => void;
  handleCurrentComp: (currentComp: string) => void;
}

export default function ServiceInformation(props: Props): JSX.Element {
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
  delete serviceInfoJSON["containers"];

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
              <button className="json-button" onClick={openAllInJson}>
                {text}
                <FindInPageIcon fontSize="small" />
              </button>
              <a
                href={URL.createObjectURL(
                  new Blob([JSON.stringify(service.containers, null, 2)], {
                    type: "text/plain",
                  })
                )}
                download={service.appName + "JSON.txt"}
              >
                <button className="download-button">
                  Download All
                  <GetAppIcon fontSize="small" />
                </button>
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
