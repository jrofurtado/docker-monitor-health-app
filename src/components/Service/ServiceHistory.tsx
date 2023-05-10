import React, { useState, useEffect } from "react";
import "../../styles/ServiceHistory.css";

// Request
import { getServiceHistory } from "../../resources/requests";

// Components
import ServiceItemRow from "./ServiceItemRow";
import DateSearchBar from "../Search/DatePickFilter";
import NoDataReceivedItemRow from "./NoDataReceivedItemRow";

// Material-UI
import { Grid, Button } from "@mui/material";
import {
  ServiceInterface,
  ContainerInterface,
} from "../../resources/interfaces";
import { firstLetterToUpperCase } from "../../resources/scripts";
import moment from "moment";
import {
  Link,
  useLocation,
  useNavigate,
  Navigate,
  redirect,
} from "react-router-dom";
import ServiceInformation from "./ServiceInformation";
import { useQuery } from "@tanstack/react-query";

interface Props {
  appName: string;
  serviceName: string;
  handleMessageClick: (service: ServiceInterface) => void;
  handleHeaderTitle: (...args: string[]) => void;
  handleCurrentComp: (currentComp: string) => void;
}

export default function ServiceHistory(props: Props): JSX.Element {
  const {
    handleMessageClick,
    appName,

    serviceName,
    handleHeaderTitle,
    handleCurrentComp,
  } = props;
  const [service, setService] = useState<Array<ServiceInterface> | any>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [selectedHour, setSelectedHour] = useState<any | null>();
  const [selectedDate, setSelectedDate] = useState<any | null>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  let location = useLocation();
  const [server, setServer] = useState<string>(
    serviceName ?? location.pathname.split("/")[3]
  );
  const [application, setApplication] = useState<string>(
    appName ?? location.pathname.split("/")[2]
  );

  useEffect(() => {
    if (!appName || !serviceName) {
      setApplication(location.pathname.split("/")[2]);
      setServer(location.pathname.split("/")[3]);
      console.log(`path ${location.pathname}`);
    }
    handleCurrentComp("ServiceHistory");

    let from = moment()
      .subtract(15 + 10 * currentPage, "minutes")
      .valueOf();
    let to = moment()
      .subtract(10 * currentPage, "minutes")
      .valueOf();

    if (selectedDate && selectedHour) {
      const queriedTime = moment(
        selectedDate + " " + selectedHour,
        "YYYY-MM-DD HH:mm"
      );
      from = queriedTime.subtract(10, "minutes").valueOf();
      to = queriedTime.valueOf();
    }

    getServiceHistory(application, server, from, to).then((res) => {
      console.log("res");
      console.log(res);
      if (res) {
        for (let key in res) {
          let localDate = new Date().toISOString();
          let index = Object.keys(res).indexOf(key);
          let index2 = index < res.length ? index + 1 : index;

          if (
            Date.parse(res[0].expires) < Date.parse(localDate) &&
            res[0].containers.length !== 0
          ) {
            let noDataReceived: ServiceInterface = {
              serverName: res[0].serverName,
              appName: res[0].appName,
              created: res[0].created,
              expires: res[0].expires,
              containers: [],
            };
            res.splice(0, 0, noDataReceived);
          }

          if (
            Date.parse(res[index].expires) < Date.parse(res[index2].created) &&
            res[index].containers.length !== 0
          ) {
            let noDataReceived: ServiceInterface = {
              serverName: res[index].serverName,
              appName: res[index].appName,
              created: res[index].created,
              expires: res[index].expires,
              containers: [],
            };
            res.splice(index2, 0, noDataReceived);
          }
          console.log("res2");
          console.log(res);
        }
        setService(res.reverse());
        setLoading(false);
      }
    });
  }, [
    appName,
    application,
    currentPage,
    handleCurrentComp,
    location.pathname,
    selectedDate,
    selectedHour,
    server,
    serviceName,
  ]);

  const response = JSON.stringify(service, undefined, 2);

  let messages = JSON.parse(response);

  //Sets the status to the one chosen by the user.
  const handleSelect = (event: any) => {
    setStatus(event.target.value);
  };

  //Sets the date to the one selected by the user.
  const handleDateChange = (date: any) => {
    setSelectedDate(date ? date.substr(0, 10) : date);
  };

  //Sets the hour to the one selected by the user.
  const handleHourChange = (hour: any) => {
    setSelectedHour(convertTime12to24(hour));
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

  //Checks if the message is healthy or unhealthy and returns the message created date.
  const checkMessageStatus = (message: any) => {
    for (var i = 0; i < message.containers.length; i++) {
      if (!message.containers[i].healthy) {
        return message.created;
      } else {
        return "unhealthy";
      }
    }
  };

  //Filters the messages according to the status and date choosen by the user.
  let filteredMessages = messages.filter(function (message: ServiceInterface) {
    if (status === "healthy") {
      return checkMessageStatus(message) === "unhealthy";
    } else if (status === "unhealthy") {
      return checkMessageStatus(message) !== "unhealthy";
    } else {
      return message;
    }
  });

  const checkServiceStatus = (containers: Array<ContainerInterface>) => {
    for (let i = 0; i < containers.length; i++) {
      if (!JSON.parse(JSON.stringify(containers[i])).healthy) {
        return false;
      }
    }
    return true;
  };
  const loadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleMessages = (message: ServiceInterface) => {
    handleMessageClick(service);
  };

  const handleContainerId = (container: ContainerInterface) => {
    return container.Id;
  };

  return (
    <>
      <DateSearchBar
        onChange={handleSelect}
        onDateChange={handleDateChange}
        onHourChange={handleHourChange}
      />

      {filteredMessages.map((service: ServiceInterface, index: number) => {
        let date: string =
          service.created.substr(0, 10) + " " + service.created.substr(11, 8);
        let date1: string =
          service.expires.substr(0, 10) + " " + service.expires.substr(11, 8);
        let createdDate = new Date(date);
        let expiresDate = new Date(date1);
        return service.containers.length === 0 ? (
          <Grid container key={index} className="message">
            <NoDataReceivedItemRow
              name={`${expiresDate.toLocaleString()} | No data received`}
            />
          </Grid>
        ) : (
          <Grid
            component={Link}
            to={`/logs/${application}/${server}/info/${handleContainerId(
              service.containers[0]
            )}`}
            container
            style={{ textDecoration: "none" }}
            key={index}
            className="message"
            onClick={() => handleMessages(service)}
          >
            <ServiceItemRow
              name={
                createdDate.toLocaleString() +
                " | Containers: " +
                service.containers.length
              }
              healthy={checkServiceStatus(service.containers)}
            />
          </Grid>
        );
      })}

      {!selectedDate && !selectedHour && (
        <div className="pagination-div">
          <Button
            className="ver-mais-btn"
            variant="contained"
            color="primary"
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
