import React, { useState } from "react";
import "./DateSearchBar.css";

//Material-UI
import "date-fns";

import { Grid, MenuItem, Button, TextField } from "@mui/material";

import DateFnsUtils from "@date-io/date-fns";
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
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import moment from "moment";

interface Props {
  onChange: (event: any) => void;
  onDateChange: (event: any) => void;
  onHourChange: (event: any) => void;
}

// makes a list of all the status and maps it to each status
const status = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "healthy",
    label: "Healthy",
  },
  {
    value: "unhealthy",
    label: "Unhealthy",
  },
];

export default function DateAndTimePickers(props: Props): JSX.Element {
  const { onChange, onDateChange, onHourChange } = props;

  const [selectedDate, setSelectedDate] = useState<any | null>();
  const [selectedHour, setSelectedHour] = useState<any | null>();

  // changes the date
  const handleDateChange = (date: any | null) => {
    setSelectedDate(date);

    onDateChange(date ? moment(date).format("YYYY-MM-DD") : null);
  };

  //changes the hour
  const handleHourChange = (hour: any | null) => {
    setSelectedHour(hour);
    onHourChange(hour ? moment(hour).format("HH:mm:ss") : null);
  };
  // resets the date and hour
  const handleReset = () => {
    setSelectedDate(new Date());
    setSelectedHour(new Date().getTime());
  };

  return (
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <Grid
        className="date-picker-grid"
        container
        md={12}
        gap={4}
        spacing={0}
        alignContent={"center"}
        justifyContent={"center"}
        /* columnSpacing={12} */

        style={{
          backgroundColor: "transparent",
          marginTop: "0.5rem",
          marginBottom: "2rem",
        }}
      >
        <Grid item xs={12} sm={12} md={12} />

        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          alignItems="center"
          justifyContent="center"
        >
          <DatePicker
            label="Date"
            value={selectedDate}
            onChange={handleDateChange}
            inputFormat="dd/MM/yyyy"
            renderInput={(params) => (
              <TextField
                {...params}
                style={{ display: "flex" }}
                id="text-field-date"
                className="DatePicker"
                sx={{
                  svg: { color: "white" },
                  input: { color: " white" },
                  label: { color: "white" },
                  borderColor: { color: "white" },
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <TimePicker
            ampm={false}
            label="Hora"
            value={selectedHour}
            onChange={handleHourChange}
            renderInput={(params) => (
              <TextField
                {...params}
                style={{ display: "flex" }}
                id="text-field-date"
                className="DatePicker"
                size="medium"
                sx={{
                  svg: { color: "white" },
                  input: { color: " white" },
                  label: { color: "white" },
                  borderColor: { color: "white" },
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <TextField
            multiline
            select
            label="Status"
            className="DatePicker"
            onChange={onChange}
            defaultValue="all"
            InputProps={{ style: { color: "white" } }}
            sx={{
              "&.MuiTextField-root": {
                width: "100%",
                color: "white",
                borderColor: "white",
              },
              svg: { color: "white" },
              input: { color: " white" },
              label: { color: "white" },
              borderColor: { color: "white" },
            }}
          >
            {status.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={1} style={{ marginTop: "7px" }}>
          <Button
            onClick={handleReset}
            style={{
              backgroundColor: "white",
              color: "#475F7D",
              float: "inline-end",
              position: "relative",
            }}
          >
            {" "}
            <RestartAltIcon sx={{ fontSize: "2rem" }} />
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
