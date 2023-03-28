import React, { useState } from "react";
import "../../styles/DateSearchBar.css";

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

interface Props {
  onChange: (event: any) => void;
  onDateChange: (event: any) => void;
  onHourChange: (event: any) => void;
}

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
    value: "Unhealthy",
    label: "Unhealthy",
  },
];

export default function DateAndTimePickers(props: Props): JSX.Element {
  const { onChange, onDateChange, onHourChange } = props;

  const [selectedDate, setSelectedDate] = useState<any | null>(new Date());
  const [selectedHour, setSelectedHour] = useState<any | null>(
    new Date().getTime()
  );

  const handleDateChange = (date: any | null) => {
    setSelectedDate(date);

    onDateChange(date ? date.format() : null);
  };

  const handleHourChange = (hour: any | null) => {
    setSelectedHour(hour);
    onHourChange(hour ? hour.format("LTS") : null);
  };

  const clearFilter = () => {
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
            onClick={clearFilter}
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
