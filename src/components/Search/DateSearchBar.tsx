import React, { useState } from "react";
import "./DateSearchBar.css";

//Material-UI
import "date-fns";
import moment from "moment";
import {
  Grid,
  InputLabel,
  FormControl,
  Select,
  TextField,
} from "@mui/material";
import MomentUtils from "@date-io/moment";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { Clear } from "@mui/icons-material";

interface Props {
  onChange: (event: any) => void;
  onDateChange: (event: any) => void;
  onHourChange: (event: any) => void;
}

export default function DateAndTimePickers(props: Props): JSX.Element {
  const { onChange, onDateChange, onHourChange } = props;

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
    setSelectedDate(null);
    setSelectedHour(null);
    onDateChange(null);
    onHourChange(null);
  };

  return (
    <div className="date-picker-container">
      <LocalizationProvider dateAdapter={MomentUtils}>
        <Grid container justifyContent="space-around">
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

          <div className="status-container">
            <FormControl>
              <InputLabel htmlFor="status-native-simple">Status</InputLabel>
              <Select
                native
                onChange={onChange}
                inputProps={{
                  name: "status",
                  id: "status-native-simple",
                }}
                className="select-status"
              >
                <option value={"all"}>All</option>
                <option value={"healthy"}>Healthy</option>
                <option value={"unhealthy"}>Unhealthy</option>
              </Select>
            </FormControl>
          </div>

          <div className="button-container">
            <button onClick={cleanFilter} className="clean-filter-button">
              <Clear fontSize="small" />
            </button>
          </div>
        </Grid>
      </LocalizationProvider>

      {/* <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container justify="space-around">
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

          <div className="status-container">
            <FormControl>
              <InputLabel htmlFor="status-native-simple">Status</InputLabel>
              <Select
                native
                onChange={onChange}
                inputProps={{
                  name: "status",
                  id: "status-native-simple",
                }}
                className="select-status"
              >
                <option value={"all"}>All</option>
                <option value={"healthy"}>Healthy</option>
                <option value={"unhealthy"}>Unhealthy</option>
              </Select>
            </FormControl>
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
