import { ExpandMore } from "@mui/icons-material";
import "../../styles/AppsStatusItem.css";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer-continued";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import moment from "moment";
import { ApplicationsStatusInterface } from "../../resources/interfaces";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { StyledGrid } from "../../JsxStyles/Styles";

interface Props {
  appStatus: ApplicationsStatusInterface;
  prevAppStatus: ApplicationsStatusInterface;
}
interface TabPanelsProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

function TabPanel(props: TabPanelsProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: string) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function AppsStatusItem(props: Props): JSX.Element {
  const { appStatus, prevAppStatus } = props;

  // helper functions
  const [value, setValue] = React.useState("0");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  // format timestamp to YYYY-MM-DD HH:mm
  const formatTimestamp = (timestamp: any) => {
    return moment(timestamp).format("YYYY-MM-DD HH:mm");
  };

  const getAppsKeys = (apps: any) => {
    let keys = [];
    for (let key in apps) {
      keys.push(key);
    }
    return keys;
  };

  const getAppServers = (app: any) => {
    let servers = [];
    for (let key in app) {
      servers.push(key);
    }
    return servers;
  };

  const getAppsCount = (apps: any) => {
    return getAppsKeys(apps).length;
  };

  const getServersCount = (appsObject: any) => {
    let serversCount = 0;
    const apps = Object.values(appsObject);
    apps.forEach((app: any) => {
      serversCount += getAppServers(app).length;
    });
    return serversCount;
  };

  const getContainersCount = (appsObject: any) => {
    let contCount = 0;
    const apps = Object.values(appsObject);
    apps.forEach((app: any) => {
      const servers = Object.values(app);
      servers.forEach((server: any) => {
        contCount += server.containers;
      });
    });
    return contCount;
  };

  return (
    /* <div className="container" key={appStatus.timestamp}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <StyledGrid>
            {formatTimestamp(appStatus.timestamp)}&nbsp; Apps:&nbsp;
            {getAppsCount(appStatus.apps)}&nbsp; Servers:&nbsp;
            {getServersCount(appStatus.apps)}&nbsp; Containers:&nbsp;
            {getContainersCount(appStatus.apps)}
          </StyledGrid>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                scrollButtons
                allowScrollButtonsMobile
                onChange={handleChange}
                aria-label="status"
              >
                <Tab label="Delta" value="0" {...a11yProps("0")} />
                <Tab label="Previous" value="1" {...a11yProps("1")} />
                <Tab label="Actual" value="2" {...a11yProps("2")} />
              </Tabs>
            </Box>
            <TabPanel value={value} index="0">
              <Box sx={{ overflowX: "auto" }}>
                <ReactDiffViewer
                  oldValue={JSON.stringify(prevAppStatus.apps, null, 2)}
                  newValue={JSON.stringify(appStatus.apps, null, 2)}
                  splitView={false}
                  hideLineNumbers={true}
                  compareMethod={DiffMethod.WORDS}
                />
              </Box>
            </TabPanel>
            <TabPanel value={value} index="1">
              <Box sx={{ overflowX: "auto" }}>
                <pre>{JSON.stringify(prevAppStatus.apps, null, 2)}</pre>
              </Box>
            </TabPanel>
            <TabPanel value={value} index="2">
              <Box sx={{ overflowX: "auto" }}>
                <pre>{JSON.stringify(appStatus.apps, null, 2)}</pre>
              </Box>
            </TabPanel>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div> */

    <></>
  );
}
