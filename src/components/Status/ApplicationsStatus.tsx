import { useEffect, useState } from "react";
import moment from "moment";

import { ApplicationsStatusInterface } from "../../resources/requests";
import { getApplicationsStatus } from "../../resources/requests";
import DatePick from "../Search/DatePicker";
import "../../styles/ApplicationsStatus.css";
import { Grid, Button } from "@mui/material";
import AppsStatusItem from "./AppsStatusItem";
import { StyledGrid } from "../../JsxStyles/Styles";

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
  const [selectedDate, setSelectedDate] = useState<any | null>(null);
  const [selectedHour, setSelectedHour] = useState<any | null>(null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [from, updatedFrom]);

  return (
    <>
      SEARCH BAR
      <StyledGrid
        justifyContent="space-evenly"
        alignItems="center"
        style={{ backgroundColor: "transparent" }}
      >
        <DatePick />
      </StyledGrid>
      RESULTS
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
