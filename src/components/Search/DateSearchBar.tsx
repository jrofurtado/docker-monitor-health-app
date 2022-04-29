import React, { useState } from "react";
import "./DateSearchBar.css";

//Material-UI
import "date-fns";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ClearIcon from '@material-ui/icons/Clear';

interface Props {
  onChange: (event: any) => void;
  onDateChange: (event: any) => void;
  onHourChange: (event: any) => void;
}

export default function DateAndTimePickers(props: Props): JSX.Element {
  const { onChange, onDateChange, onHourChange} = props;

  const [selectedDate, setSelectedDate] = useState<any | null>(
    moment().format()
  );
  const [selectedHour, setSelectedHour] = useState<any | null>(
    moment().format()
  );

  const handleDateChange = (date: any | null) => {
    setSelectedDate(date);
    onDateChange(date ? date.format() : null);
  };

  const handleHourChange = (hour: any | null) => {
    setSelectedHour(hour);
    onHourChange(hour ? hour.format("LTS") : null);
  };
  
  const cleanFilter = () => {
    setSelectedDate(null)
    setSelectedHour(null)
    onDateChange(null)
    onHourChange(null)
  }

  return (
    <div className="date-picker-container">
      <MuiPickersUtilsProvider utils={MomentUtils}>
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
          <button onClick={cleanFilter} className="clean-filter-button"><ClearIcon fontSize="small"/></button>
          </div>
        </Grid>
      </MuiPickersUtilsProvider>
     
    </div>
  );
}
