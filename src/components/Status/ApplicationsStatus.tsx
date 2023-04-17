import React, { useEffect, useState } from "react";
import moment from "moment";

import "../../styles/ApplicationsStatus.css";

import { ApplicationsStatusInterface } from "../../resources/requests";
import { getApplicationsStatus } from "../../resources/requests";
import DatePick from "../Search/DatePicker";
import "../../styles/ApplicationsStatus.css";
import { Grid, Button } from "@mui/material";
import AppsStatusItem from "./AppsStatusItem";

export default function ApplicationsStatus() {
  const rowsPerPage = 5;
  const [applicationsStatus, setApplicationsStatus] = useState<
    ApplicationsStatusInterface[]
  >([]);
  const [applicationsStatusBlock, setApplicationsStatusBlock] = useState<
    ApplicationsStatusInterface[]
  >([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [from, setFrom] = useState<number>(moment().valueOf());
  // set state for updatedFrom
  const [updatedFrom, setUpdatedFrom] = useState<number>(moment().valueOf());
  const [selectedDate, setSelectedDate] = useState<any | null>(null);
  const [selectedHour, setSelectedHour] = useState<any | null>(null);

  //Sets the date to the one selected by the user.

  //Converts 12h time to 24h time.

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from]);

  const handleDateChange = (date: any) => {
    setSelectedDate(date ? date.substr(0, 10) : date);
  };

  const handleHourChange = (hour: any) => {
    setSelectedHour(hour ? hour.substr(0, 5) : hour);
  };

  useEffect(() => {
    // Scroll to the bottom of the page
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [from, updatedFrom]);

  return (
    <>
      {<h3 style={{ marginTop: "3rem" }}>Status Changes</h3>}
      <DatePick
        onDateChange={handleDateChange}
        onHourChange={handleHourChange}
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
