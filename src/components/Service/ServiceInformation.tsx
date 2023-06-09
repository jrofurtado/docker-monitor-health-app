import React, { useState, useEffect } from "react";
import "./ServiceInformation.css";
//Script

// Material-UI

import { ExpandMore, Check, PriorityHigh } from "@mui/icons-material";

// import GetAppIcon from '@mui/icons-material/GetApp';
// import FindInPageIcon from "@mui/icons-material/FindInPage";
//Interface
import {
  ContainerInterface,
  ServiceInterface,
} from "../../resources/interfaces";
//Components

import { useLocation } from "react-router-dom";
import { getServiceInfo } from "../../resources/requests";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";

import { setTimeStamp } from "../../redux-store/props-redux/reducers/propsReducers";

import { useDispatch } from "react-redux";

export default function ServiceInformation(): JSX.Element {
  let location = useLocation();

  //const st = useSelector((state: RootState) => state.application);
  const path = location.pathname;
  const appParam = path.split("/")[2];
  const servParam = path.split("/")[3];
  const timeStampParam = path.split("/")[5];

  const [serv, setServ] = useState<string>(servParam);
  const [app, setApp] = useState<string>(appParam);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [time, setTime] = useState<string>(timeStampParam);
  const [response, setResponse] = useState<ServiceInterface | any>({});
  const [info, setInfo] = useState<Array<ContainerInterface>>([]);
  const dispatach = useDispatch();
  useEffect(() => {
    dispatach(setTimeStamp(timeStampParam));

    /*   setApp(appParam);
    setServ(servParam);
    setTime(timeStampParam); */
    console.log(`path ${path}`);

    getServiceInfo(appParam, servParam)
      .then((res) => {
        const { created, expires, key, containers } = JSON.parse(
          JSON.stringify(res)
        );

        const serviceInfo: ServiceInterface = {
          appName: appParam,
          serverName: servParam,
          created,
          expires,
          key,
          containers: containers.length,
        };

        const containersInfo: Array<ContainerInterface> = containers.map(
          (container: {
            id: any;
            names: any;
            image: any;
            ImageID: any;
            createdTimestamp: any;
            healthy: any;
          }) => ({
            id: container.id,
            names: container.names,
            image: container.image,
            ImageID: container.ImageID,
            createdTimestamp: container.createdTimestamp,
            healthy: container.healthy,
          })
        );
        setResponse(serviceInfo);
        setInfo(containersInfo);
      })
      .catch((error) => {
        console.error("Error occurred while fetching service info:", error);
      });
  }, [app, appParam, location.pathname, path, serv, servParam, timeStampParam]);
  console.log("info");
  console.log(info);
  // Container State

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={1}></Grid>
        <Grid
          item
          xs={12}
          sm={12}
          xl={12}
          style={{
            color: "black",
            backgroundColor: "white",
            padding: "auto",
            marginLeft: "1rem",
            paddingBottom: "2rem",
            borderRadius: "4px",
          }}
        >
          <h4>Service Name:</h4>
          <span>{response.appName}</span>
          <h4>Server:</h4>
          <span>{response.serverName}</span>
          <h4>Service Created:</h4>
          <span>{response.created}</span>
          <h4>Service Expires:</h4>
          <span>{response.expires}</span>
          <h4>Key:</h4>
          <span>{response.key}</span>
          <h4>Containers:</h4>
          <span>{response.containers}</span>
        </Grid>
        <Grid item xs={12}></Grid>

        <Grid item xs={12} sm={12} xl={12}>
          <h2>Containers</h2>
        </Grid>
        <Grid item xs={12}></Grid>

        <Grid
          item
          xs={12}
          sm={12}
          xl={12}
          style={{ width: "100%" }}
          alignItems="center"
          justifyContent="center"
        >
          {info.map((container) => (
            <Accordion style={{ backgroundColor: "white" }} key={container.id}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {container.healthy ? (
                    <Check style={{ color: "green" }} />
                  ) : (
                    <PriorityHigh style={{ color: "red" }} />
                  )}
                  <Typography style={{ marginLeft: "1rem" }}>
                    {container.names}
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} xl={12}>
                    <div
                      style={{
                        overflow: "hidden",
                        wordWrap: "break-word",
                      }}
                    >
                      <h4>Container ID</h4>
                      <p>{container.id}</p>
                    </div>
                    <div
                      style={{
                        overflow: "hidden",
                        wordWrap: "break-word",
                      }}
                    >
                      <h4>Image</h4>
                      <p>{container.image}</p>
                    </div>
                    <div
                      style={{
                        overflow: "hidden",
                        wordWrap: "break-word",
                      }}
                    >
                      <h4>Image ID</h4>
                      <p>{container.ImageID}</p>
                    </div>
                    <div
                      style={{
                        overflow: "hidden",
                        wordWrap: "break-word",
                      }}
                    >
                      <h4>Created</h4>
                      <p>{container.createdTimestamp}</p>
                    </div>
                    <div
                      style={{
                        overflow: "hidden",
                        wordWrap: "break-word",
                      }}
                    >
                      <h4>Healthy</h4>
                      <p>{container.healthy.toString()}</p>
                    </div>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
