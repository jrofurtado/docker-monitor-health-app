import { useEffect, useState } from "react";
import moment from "moment";

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
  const [from, setFrom] = useState<number>(moment().valueOf());
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

  const combineDateAndHour = (date: any, hour: any) => {
    const from = moment(`${date} ${hour}`).valueOf();
    setFrom(from);
  };

  //Converts 12h time to 24h time.
  const convertTime12to24 = (time12h: any) => {
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
  const handleFromChange = (date: any) => {
    const newDate = date ? date.substr(0, 10) : date;
    setSelectedDate(newDate);
    setApplicationsStatus([]);
    combineDateAndHour(newDate, selectedHour);
  };
  const handleUpdatedFromChange = (date: any) => {
    const newDate = date ? date.substr(0, 10) : date;
    setSelectedDate(newDate);
    setApplicationsStatus([]);
    combineDateAndHour(newDate, selectedHour);
  };

  // use effect to get applications status
  useEffect(() => {
    getApplicationsStatus(from, rowsPerPage).then((res) => {
      if (res) {
        setApplicationsStatusBlock(res);
        setApplicationsStatus([...applicationsStatus, ...res]);
      }
    });
    setFrom(from);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // use effect to scroll to the bottom of the page
  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationsStatusBlock.length]);

  // load more function
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

  //use effect to get state

  useEffect(() => {
    getApplicationsStatus(from, rowsPerPage).then((res) => {
      if (res) {
        setApplicationsStatusBlock(res);
        setApplicationsStatus([...applicationsStatus, ...res]);
      }
    });
    setUpdatedFrom(from);
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [from, updatedFrom]);

  return (
    <>
      {/* SEARCH BAR */}
      <DatePick
        selectedDate={selectedDate}
        selectedHour={selectedHour}
        setSelectedDate={function (date: Date | null): void {
          throw new Error("Function not implemented.");
        }}
        setSelectedHour={function (hour: Date | null): void {
          throw new Error("Function not implemented.");
        }}
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
