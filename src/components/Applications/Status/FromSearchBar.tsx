import React, { useState } from "react";
import MomentUtils from "@date-io/moment";
// import {
//   KeyboardDatePicker,
//   KeyboardTimePicker,
//   MuiPickersUtilsProvider,
// } from "@material-ui/pickers";

import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";

import "./FromSearchBar.css";
import { Grid, TextField } from "@mui/material";
import { Clear } from "@mui/icons-material";
import moment from "moment";

interface Props {
  onDateChange: (event: any) => void;
  onHourChange: (event: any) => void;
  from: number;
}

export default function FromSearchBar(props: Props): JSX.Element {
  const { onDateChange, onHourChange, from } = props;

  const [selectedDate, setSelectedDate] = useState<any | null>(null);
  const [selectedHour, setSelectedHour] = useState<any | null>(null);

  const handleDateChange = (date: any | null) => {
    setSelectedDate(date);
    onDateChange(date ? date.format() : null);
  };

  const handleHourChange = (hour: any | null) => {
    setSelectedHour(hour);
    onHourChange(hour ? hour.format("LTS") : null);
  };

  const cleanFilter = () => {
    const newDate = moment().format("YYYY-MM-DD");
    const newHour = moment().format("HH:mm");
    setSelectedDate(newDate);
    setSelectedHour(newHour);
    onDateChange(newDate);
    onHourChange(newHour);
  };

  // use effect to initialize the date and hour
  React.useEffect(() => {
    if (from) {
      const date = moment(from);
      setSelectedDate(date);
      setSelectedHour(date);
    }
  }, [from]);

  return (
    <div className="date-picker-container">
      <LocalizationProvider dateAdapter={MomentUtils}>
        <Grid container>
          <div className="date-picker">
            <DatePicker
              label="Date picker"
              inputFormat="YYYY-MM-DD"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>

          <div className="time-picker">
            <TimePicker
              ampm={false}
              label="Time picker"
              value={selectedHour}
              onChange={handleHourChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>

          <div className="button-container">
            <button className="clean-filter" onClick={cleanFilter}>
              <Clear fontSize="small" />
            </button>
          </div>
        </Grid>
      </LocalizationProvider>
      {/* <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container>
          <MuiPickersUtilsProvider utils={MomentUtils} locale="fr">
            <div className="date-picker">
              <KeyboardDatePicker
                label="Date picker"
                format={"YYYY-MM-DD"}
                value={selectedDate}
                onChange={handleDateChange}
                animateYearScrolling={false}
              />
            </div>
          </MuiPickersUtilsProvider>

          <div className="time-picker">
            <KeyboardTimePicker
              ampm={false}
              id="time-picker"
              label="Time picker"
              value={selectedHour}
              onChange={handleHourChange}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </div>

          <div className="button-container">
            <button onClick={cleanFilter} className="clean-filter-button">
              <Clear fontSize="small" />
            </button>
          </div>
        </Grid>
      </MuiPickersUtilsProvider> */}
    </div>
  );
}
