import React, { useEffect, useState } from "react";
import moment from "moment";

import "./ApplicationsStatus.css";

import { ApplicationsStatusInterface } from "../../resources/requests";
import { getApplicationsStatus } from "../../resources/requests";
import DatePick from "../DatePickers/DatePicker";
import "./ApplicationsStatus.css";
import { Grid, Button } from "@mui/material";
import AppsStatusItem from "./AppsStatusItem";

export default function ApplicationsStatus() {
  const rowsPerPage = 10;
  const [applicationsStatus, setApplicationsStatus] = useState<
    ApplicationsStatusInterface[]
  >([]);
  const [applicationsStatusBlock, setApplicationsStatusBlock] = React.useState<
    ApplicationsStatusInterface[]
  >([]);
  const [from, setFrom] = React.useState<number>(moment().valueOf());
  // set state for updatedFrom
  const [updatedFrom, setUpdatedFrom] = useState<number>(moment().valueOf());
  const [selectedDate, setSelectedDate] = useState<any | null>(
    moment().format("YYYY-MM-DD")
  );
  const [selectedHour, setSelectedHour] = useState<any | null>(
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
  //Combines the date and hour selected by the user.
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
  //Loads more applications status.
  const loadMore = () => {
    let newFrom = updatedFrom;
    if (applicationsStatusBlock.length === rowsPerPage) {
      newFrom =
        applicationsStatusBlock[applicationsStatusBlock.length - 1].timestamp;
    }
    getApplicationsStatus(newFrom, rowsPerPage).then((res) => {
      if (res) {
        setApplicationsStatusBlock(res);
        setApplicationsStatus([...applicationsStatus, ...res]);
        setUpdatedFrom(newFrom);
      }
    });
  };

  // use effect to refresh applications status

  // use effect to get applications status
  useEffect(() => {
    getApplicationsStatus(from, rowsPerPage).then((res) => {
      if (res) {
        setApplicationsStatusBlock(res);
        setApplicationsStatus([...applicationsStatus, ...res]);
      }
    });
    setUpdatedFrom(from);
  }, [from]);

  useEffect(() => {
    // Scroll to the bottom of the page
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [from, updatedFrom]);

  return (
    <>
      {/* SEARCH BAR */}
      <Grid item xs={1}></Grid>
      <Grid item xs={1}></Grid>
      <DatePick
        onDateChange={handleDateChange}
        onHourChange={handleHourChange}
        from={from}
      />
      {/* RESULTS ROWS */}
      {applicationsStatus.map((appStatus, index) => {
        if (index === applicationsStatus.length - 1) {
          return null;
        }
        return (
          <Grid container key={index} className="message">
            <AppsStatusItem
              appStatus={appStatus}
              prevAppStatus={applicationsStatus[index + 1]}
            />
          </Grid>
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
