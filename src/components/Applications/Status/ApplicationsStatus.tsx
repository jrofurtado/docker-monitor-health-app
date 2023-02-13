import React from "react";
import moment from "moment";

import { ApplicationsStatusInterface } from "../../../resources/interfaces";
import { getApplicationsStatus } from "../../../resources/requests";
import FromSearchBar from "./FromSearchBar";
import "./ApplicationsStatus.css";
import { Button } from "@material-ui/core";

export default function ApplicationsStatus() {
  const rowsPerPage = 10;
  // create state for applications status
  const [applicationsStatus, setApplicationsStatus] = React.useState<
    ApplicationsStatusInterface[]
  >([]);
  // create state for block of applications status
  const [applicationsStatusBlock, setApplicationsStatusBlock] = React.useState<
    ApplicationsStatusInterface[]
  >([]);
  //create state for from initializing at present time
  const [from, setFrom] = React.useState<number>(moment().valueOf());
  // create state for selected date and hour and initialize at present date and time in 24 hour format
  const [selectedDate, setSelectedDate] = React.useState<any | null>(
    moment().format("YYYY-MM-DD")
  );
  const [selectedHour, setSelectedHour] = React.useState<any | null>(
    moment().format("HH:mm")
  );

  //Sets the date to the one selected by the user.
  const handleDateChange = (date: any) => {
    const newDate = date ? date.substr(0, 10) : date;
    setSelectedDate(newDate);
    setApplicationsStatus([]);
    combineDateAndHour(newDate, selectedHour);
  };

  //Sets the hour to the one selected by the user.
  const handleHourChange = (hour: any) => {
    const hour24 = convertTime12to24(hour);
    setSelectedHour(hour24);
    setApplicationsStatus([]);
    combineDateAndHour(selectedDate, hour24);
  };

  const combineDateAndHour = (date: any, hour: any) => {
    const from = moment(`${date} ${hour}`).valueOf();
    setFrom(from);
  };

  // format timestamp to YYYY-MM-DD HH:mm
  const formatTimestamp = (timestamp: any) => {
    return moment(timestamp).format("YYYY-MM-DD HH:mm");
  };

  //Converts 12h time to 24h time.
  const convertTime12to24 = (time12h: any | null) => {
    if (!time12h) {
      return null;
    }
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  };

  const loadMore = () => {
    let newFrom = from;
    if (applicationsStatusBlock.length === rowsPerPage) {
      newFrom =
        applicationsStatusBlock[applicationsStatusBlock.length - 1].timestamp -
        1;
    }
    setFrom(newFrom);
  };

  // iterate through json keys
  const iterateJsonKeys = (json: any) => {
    let keys = [];
    for (let key in json) {
      keys.push(key);
    }
    return keys;
  };

  const getAppsKeys = (apps: any) => {
    let keys = [];
    for (let key in apps) {
      keys.push(key);
    }
    console.log("keys", keys);
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
    const apps= Object.values(appsObject);
    apps.forEach((app: any) => {
      serversCount += getAppServers(app).length;
    });
    return serversCount;
  };

  // use effect to get applications status
  React.useEffect(() => {
    const count = rowsPerPage;
    getApplicationsStatus(from, count).then((res) => {
      if (res) {
        setApplicationsStatusBlock(res);
        setApplicationsStatus([...applicationsStatus, ...res]);
        console.log("keys", iterateJsonKeys(res[0]));
        console.log("keys apps", iterateJsonKeys(res[0].apps));
      }
    });
  }, [from]);

  return (
    <>
      {/* SEARCH BAR */}
      <FromSearchBar
        onDateChange={handleDateChange}
        onHourChange={handleHourChange}
        from={from}
      />
      {/* RESULTS ROWS */}
      {applicationsStatus.map((appStatus) => {
        return (
          <div key={appStatus.timestamp}>
            {formatTimestamp(appStatus.timestamp)}&nbsp;
            Apps:{getAppsCount(appStatus.apps)}&nbsp;
            {/* Servers:{getServersCount(appStatus.apps)} */}
          </div>
        );
      })}
      {/* PAGINATIONS */}
      {selectedDate &&
        selectedHour &&
        applicationsStatusBlock.length === rowsPerPage && (
          <div className="pagination-div">
            <Button
              className="ver-mais-btn"
              variant="contained"
              color="default"
              onClick={() => {
                loadMore();
              }}
            >
              Ver mais
            </Button>
          </div>
        )}
    </>
  );
}
