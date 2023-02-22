import React from "react";
import moment from "moment";

import { ApplicationsStatusInterface } from "../../../resources/interfaces";
import { getApplicationsStatus } from "../../../resources/requests";
import FromSearchBar from "./FromSearchBar";
import "./ApplicationsStatus.css";
import { Button } from "@mui/material";
import AppsStatusItem from "./AppsStatusItem";

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

  // use effect to get applications status
  React.useEffect(() => {
    const count = rowsPerPage;
    getApplicationsStatus(from, count).then((res) => {
      if (res) {
        setApplicationsStatusBlock(res);
        setApplicationsStatus([...applicationsStatus, ...res]);
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
        return <AppsStatusItem appStatus={appStatus} />;
      })}
      {/* PAGINATIONS */}
      {selectedDate &&
        selectedHour &&
        applicationsStatusBlock.length === rowsPerPage && (
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
