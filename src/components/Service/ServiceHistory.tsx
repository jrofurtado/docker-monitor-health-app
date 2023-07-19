import React, { useState, useEffect } from "react";
import "./ServiceHistory.css";

// Request
import { getServiceHistory } from "../../resources/requests";

// Components
import ServiceItemRow from "./ServiceItemRow";
import DateSearchBar from "../DatePickers/DatePickFilter";
import NoDataReceivedItemRow from "./NoDataReceivedItemRow";

// Material-UI
import { Grid, Button } from "@mui/material";
import {
  ServiceInterface,
  ContainerInterface,
} from "../../resources/interfaces";

import moment from "moment";
import { Link, useLocation, useSearchParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import {
  setAppName,
  setServiceName,
} from "../../redux-store/props-redux/reducers/propsReducers";

interface Props {
  handleMessageClick: (service: ServiceInterface) => void;
}

export default function ServiceHistory(props: Props): JSX.Element {
  const { handleMessageClick } = props;
  let location = useLocation();
  const appParam = location.pathname.split("/")[2];
  const servParam = location.pathname.split("/")[3];

  const [service, setService] = useState<Array<ServiceInterface> | any>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [selectedHour, setSelectedHour] = useState<any | null>();
  const [selectedDate, setSelectedDate] = useState<any | null>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [server, setServer] = useState<string>(appParam);
  const [application, setApplication] = useState<string>(servParam);

  let [searchParams, setSearchParams] = useSearchParams({});

  const dispatch = useDispatch();

  //sets the application name and server name
  useEffect(() => {
    setApplication(appParam);
    setServer(servParam);
    dispatch(setServiceName(servParam));
    dispatch(setAppName(appParam));

    let from = moment()
      .subtract(15 + 10 * currentPage, "minutes")
      .valueOf();
    let to = moment()
      .subtract(10 * currentPage, "minutes")
      .valueOf();

    if (selectedDate && selectedHour) {
      const testTime = moment(
        selectedDate + " " + selectedHour,
        "YYYY-MM-DD HH:mm"
      );
      from = testTime.subtract(10, "minutes").valueOf();
      to = testTime.valueOf();
      console.log("testTime", testTime);
    } else if (parseInt(location.search.split("=")[1])) {
      const newTime = moment(parseInt(location.search.split("=")[1]));
      from = newTime.subtract(10, "minutes").valueOf();
      to = newTime.valueOf();
      /* console.log("newTime", newTime); */
    }
    searchParams.set("from", from.toString());
    setSearchParams(searchParams);
    //gets the service history
    getServiceHistory(appParam, servParam, from, to).then((res) => {
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
              key: res[0].key,
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
              key: res[index].key,
            };
            res.splice(index2, 0, noDataReceived);
          }
        }
        setService(res.reverse());
        setLoading(false);
      }
    });
  }, [selectedDate, selectedHour, appParam, servParam, , currentPage]);

  //takes the json response and converts it to a string
  const response = JSON.stringify(service, undefined, 2);

  //Parses the string to JSON.
  let messages = JSON.parse(response);

  //Sets the status to the one chosen by the user.

  //Sets the date to the one selected by the user.
  const handleDateChange = (date: any) => {
    setSelectedDate(date ? date.substr(0, 10) : date);
    return date;
  };

  //Sets the hour to the one selected by the user.
  const handleHourChange = (hour: any) => {
    setSelectedHour(convertTime12to24(hour));
    return hour;
  };

  const handleSelect = (event: any) => {
    setStatus(event.target.value);
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
  //checks the service status
  const checkServiceStatus = (containers: Array<ContainerInterface>) => {
    for (let i = 0; i < containers.length; i++) {
      if (!JSON.parse(JSON.stringify(containers[i])).healthy) {
        return false;
      }
    }
    return true;
  };
  //loads more messages
  const loadMore = () => {
    setCurrentPage(currentPage + 1);
  };
  //links to the logs info page
  const handleMessages = (message: ServiceInterface) => {
    handleMessageClick(service);
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
            to={`/logs/${application}/${server}/${searchParams.get(
              "from"
            )}/info/${service.key}/${Date.parse(service.created)}`}
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
