import React, { useState, useEffect } from "react";
import "../../styles/ServiceInformation.css";
//Script
import { firstLetterToUpperCase } from "../../resources/scripts";
// Material-UI

import { GetApp, FindInPage, Close, ExpandMore } from "@mui/icons-material";

// import GetAppIcon from '@mui/icons-material/GetApp';
// import FindInPageIcon from "@mui/icons-material/FindInPage";
//Interface
import {
  ContainerInterface,
  ServiceInformationProps,
  ServiceInterface,
} from "../../resources/interfaces";
//Components
import JsonHTML from "../../pages/JsonHTML";
import ServiceContainerList from "./ServiceContainerList";
import { StyledButton } from "../../JsxStyles/Styles";
import { useLocation } from "react-router-dom";
import { getServiceHistory, getServiceInfo } from "../../resources/requests";
import moment from "moment";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from "@mui/material";
import { da } from "date-fns/locale";
import { json } from "stream/consumers";

export default function ServiceInformation(
  props: ServiceInformationProps
): JSX.Element {
  const {
    application,
    server,
    service,
    handleHeaderTitle,
    handleCurrentComp,
    timeStamp,
  } = props;
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
  const [timestamp, setTimestamp] = useState<string>(
    timeStamp ?? location.pathname.split("/")[5]
  );
  const [response, setResponse] = useState<ServiceInterface | any>({});
  const [containers, setContainers] = useState<Array<ContainerInterface>>([]);

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
    handleHeaderTitle("Service Information");
    handleCurrentComp("Service Information");

    const path = location.pathname;
    const appParam = path.split("/")[2];
    const servParam = path.split("/")[3];
    const timeStampParam = path.split("/")[5];

    if (!application || !server || !timeStamp) {
      setApp(appParam);
      setServ(servParam);
      setTimestamp(timeStampParam);
      console.log(`path ${path}`);
    }

    getServiceInfo(appParam, servParam)
      .then((res) => {
        const { created, expires, key, containers } = JSON.parse(
          JSON.stringify(res)
        );

        console.log("containers");
        console.log(containers);

        const serviceInfo: ServiceInterface = {
          appName: appParam,
          serverName: servParam,
          created,
          expires,
          key,
          containers: containers.length,
        };
        setResponse(serviceInfo);
        setContainers(containers);
        console.log("containers");
        console.log(containers);
      })
      .catch((error) => {
        console.error("Error occurred while fetching service info:", error);
      });
  }, [
    app,
    application,
    handleCurrentComp,
    handleHeaderTitle,
    location.pathname,
    serv,
    server,
    timeStamp,
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
      <div className="service-information">
        <Grid container spacing={2} style={{ backgroundColor: "white" }}>
          <Grid item xs={12} sm={6} style={{ color: "black" }}>
            <div className="service-information__container">
              <div className="service-information__container__body">
                <div className="service-information__container__body__item">
                  <h4>Service Name: {response.appName}</h4>
                </div>
                <div className="service-information__container__body__item">
                  <h4>Server : {response.serverName} </h4>
                </div>
                <div className="service-information__container__body__item">
                  <h4>Service Created : {response.created}</h4>
                </div>
                <div className="service-information__container__body__item">
                  <h4>Service Expires : {response.expires}</h4>
                </div>
                <div className="service-information__container__body__item">
                  <h4>Key : {response.key} </h4>
                </div>
                <div className="service-information__container__body__item">
                  <h4>Containers: {response.containers}</h4>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>

        <div className="service-information__container">
          <div className="service-information__container__header">
            <h3>Containers</h3>
            <div className="service-information__container__header__buttons">
              <StyledButton
                variant="contained"
                color="primary"
                startIcon={<GetApp />}
                onClick={openAllInJson}
              >
                Download
              </StyledButton>
              <StyledButton
                variant="contained"
                color="primary"
                startIcon={<FindInPage />}
                onClick={() => handleContainerClick(response, "Containers")}
              >
                View All in JSON
              </StyledButton>

              <StyledButton
                variant="contained"
                color="primary"
                startIcon={<FindInPage />}
                onClick={() => handleContainerClick(response, "Containers")}
              >
                DownLoad in CSV
              </StyledButton>
            </div>
          </div>
          <Grid container spacing={2} style={{ backgroundColor: "white" }}>
            <Grid item xs={12} sm={6} style={{ color: "black" }}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ backgroundColor: "#3f51b5", color: "white" }}
                >
                  {containers?.map((container: ContainerInterface) => (
                    <div className="service-information__container__body">
                      <div className="service-information__container__body__item">
                        <h4>Container Name: {container.name}</h4>
                      </div>
                    </div>
                  ))}
                </AccordionSummary>
                <AccordionDetails></AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
