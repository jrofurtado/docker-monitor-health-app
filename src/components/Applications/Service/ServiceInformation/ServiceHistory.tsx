import React, { useState, useEffect } from "react";
import "./ServiceHistory.css";

// Request
import { getServiceHistory } from "../../../../resources/requests";

// Components
import ServiceItemRow from "./ServiceItemRow/ServiceItemRow";
import DateSearchBar from "../../../Search/DateSearchBar";
import NoDataReceivedItemRow from "./ServiceItemRow/NoDataReceivedItemRow";

// Material-UI
import Grid from "@material-ui/core/Grid";
import {
  ServiceInterface,
  ContainerInterface,
} from "../../../../resources/interfaces";
import { firstLetterToUpperCase } from "../../../../resources/scripts";

interface Props {
  appName: string;
  serviceName: string;
  handleMessageClick: (service: ServiceInterface) => void;
  handleHeaderTitle: (...args: string[]) => void;
  handleCurrentComp: (currentComp: string) => void;
}

export default function ServiceHistory(props: Props): JSX.Element {
  // State
  const { handleMessageClick, appName, serviceName, handleHeaderTitle, handleCurrentComp } = props;
  const [service, setService] = useState<Array<ServiceInterface> | any>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [selectedHour, setSelectedHour] = useState<any | null>();
  const [selectedDate, setSelectedDate] = useState<any | null>();

  useEffect(() => {
    handleCurrentComp("ServiceHistory");
    getServiceHistory(appName, serviceName).then((res) => {
      if (res) {
        for (let key in res) {
          let localDate = new Date().toISOString();
          let index = Object.keys(res).indexOf(key);
          let index2 = (index < res.length) ? index + 1 : index;

          if (Date.parse(res[0].expires) < Date.parse(localDate) &&
            res[0].containers.length !== 0) {
            let noDataReceived: ServiceInterface = {
              serverName: res[0].serverName,
              appName: res[0].appName,
              created: res[0].created,
              expires: res[0].expires,
              containers: []
            };
            res.splice(0, 0, noDataReceived);
          }

          if (Date.parse(res[index].expires) < Date.parse(res[index2].created) &&
            res[index].containers.length !== 0) {
            let noDataReceived: ServiceInterface = {
              serverName: res[index].serverName,
              appName: res[index].appName,
              created: res[index].created,
              expires: res[index].expires,
              containers: []
            };
            res.splice(index2, 0, noDataReceived);
          }
        }
        setService(res);
        setLoading(false);
      }
    });
    handleHeaderTitle(firstLetterToUpperCase(appName), firstLetterToUpperCase(serviceName), "Messages");
  }, [handleHeaderTitle, appName, serviceName, handleCurrentComp]);


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
      }
    }
  };

  //Filters the messages according to the status and date choosen by the user.
  let filteredMessages = messages.filter(function (message: ServiceInterface) {
    let messageCreatedDate = message.created.substr(0, 10);
    let messageCreatedHour = message.created.substr(11, 5);
    switch (status) {
      case "unhealthy":
        if (selectedDate && selectedHour) {
          return (
            messageCreatedDate === selectedDate &&
            messageCreatedHour === selectedHour &&
            message.created === checkMessageStatus(message)
          );
        } else if (selectedDate || selectedHour) {
          return (
            (messageCreatedDate === selectedDate &&
              message.created === checkMessageStatus(message)) ||
            (messageCreatedHour === selectedHour &&
              message.created === checkMessageStatus(message))
          );
        } else {
          return message.created === checkMessageStatus(message) || message.containers.length === 0
        }
      case "healthy":
        if (selectedDate && selectedHour) {
          return (
            messageCreatedDate === selectedDate &&
            messageCreatedHour === selectedHour &&
            message.created !== checkMessageStatus(message)
          );
        } else if (selectedDate || selectedHour) {
          return (
            (messageCreatedDate === selectedDate &&
              message.created !== checkMessageStatus(message)) ||
            (messageCreatedHour === selectedHour &&
              message.created !== checkMessageStatus(message))
          );
        } else {
          return message.created !== checkMessageStatus(message) && message.containers.length !== 0;
        }
      default:
        if (selectedDate && selectedHour) {
          return (
            messageCreatedDate === selectedDate &&
            messageCreatedHour === selectedHour
          );
        } else if (selectedDate || selectedHour) {
          return (
            messageCreatedDate === selectedDate ||
            messageCreatedHour === selectedHour
          );
        } else {
          return message;
        }
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

  return loading ? (
    <p>Not loaded</p>
  ) : (
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
          return (
            service.containers.length === 0 ? (
              <Grid
                container
                key={index}
                className="message"
              >
                <NoDataReceivedItemRow name={`${expiresDate.toLocaleString()} | No data received`} />
              </Grid>

            ) :

              <Grid
                container
                key={index}
                className="message"
                onClick={() => handleMessageClick(service)}
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
          )
        })}
      </>
    );
}
