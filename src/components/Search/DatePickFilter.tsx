import React, { useState } from "react";
import "../../styles/DateSearchBar.css";

//Material-UI
import "date-fns";

import {
  Box,
  MenuItem,
  Button,
  Grid,
  InputLabel,
  FormControl,
  Select,
  TextField,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
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

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <div className="date-picker-container">
      <LocalizationProvider dateAdapter={MomentUtils}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <DatePicker
              label="Date"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TimePicker
              label="Hour"
              value={selectedHour}
              onChange={handleHourChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value="All"
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="Healthy">Healthy</MenuItem>
                  <MenuItem value="UnHealthy">UnHealthy</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button>
              <Clear onClick={cleanFilter} />
            </Button>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </div>
  );
}
