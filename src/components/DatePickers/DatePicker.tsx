import { useEffect, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { Grid, TextField, TextFieldProps, Button } from "@mui/material";
import "./DatePicker.css";

import { useSearchParams } from "react-router-dom";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import moment from "moment";

interface DateProps {
  onDateChange: (event: any) => void;
  onHourChange: (event: any) => void;
  from: number;
}
export default function DatePick(props: DateProps): JSX.Element {
  const { onDateChange, onHourChange, from } = props;
  const [selectedDate, setSelectedDate] = useState<any | null>();
  const [selectedHour, setSelectedHour] = useState<any | null>();

  const defaultDate = new Date().toISOString();
  const defaultHour = new Date().getTime().toString();

  /*  const [searchParams, setSearchParams] = useSearchParams({
    date: searchParams.get("date") || defaultDate,
    hour: searchParams.get("hour") || defaultHour,
  });

  const date = searchParams.get("date");
  const hour = searchParams.get("hour") */ const handleDateChange = (
    date: any | null
  ) => {
    setSelectedDate(date);

    const params = {
      date: date ? date.format("YYYY-MM-DD") : null,
    };

    /*   setSearchParams(params); */

    onDateChange(date ? date.format() : null);
  };

  const handleHourChange = (hour: any | null) => {
    setSelectedHour(hour);

    const params = {
      hour: hour ? hour.format("HH:mm:ss") : null,
    };

    /* setSearchParams(params);
     */
    onHourChange(hour ? hour.format("HH:mm:ss") : null);
  };

  const handleClearFilter = () => {
    setSelectedDate(new Date());
    setSelectedHour(new Date().getTime());
  };
  useEffect(() => {
    if (from) {
      const date = moment(from);
      setSelectedDate(date);
      setSelectedHour(date);
    }
  }, [from]);

  return (
    <div className="date-picker">
      <LocalizationProvider dateAdapter={DateFnsUtils}>
        <Grid
          className="date-picker-grid"
          container
          md={12}
          gap={4.5}
          spacing={0}
          /* columnSpacing={12} */
          alignItems="center"
          justifyContent="center"
          style={{
            backgroundColor: "transparent",
            marginTop: "0.5rem",
            marginBottom: "2rem",
          }}
        >
          <Grid
            item
            xs={12}
            sm={8}
            md={4}
            alignItems="center"
            justifyContent="center"
          >
            <DatePicker
              renderInput={(params: TextFieldProps) => (
                <TextField
                  /* value={date} */
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
              label="Data"
              value={selectedDate}
              onChange={handleDateChange}
              inputFormat="dd/MM/yyyy"
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={8}
            md={4}
            alignItems="center"
            justifyContent="center"
          >
            <TimePicker
              label="Hora"
              ampm={false}
              value={selectedHour}
              onChange={handleHourChange}
              renderInput={(params: TextFieldProps) => (
                <TextField
                  /* value={hour} */
                  {...params}
                  style={{ display: "flex" }}
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

          <Grid item xs={12} sm={8} md={1}>
            <Button
              onClick={handleClearFilter}
              style={{
                backgroundColor: "white",
                color: "#475F7D",
              }}
            >
              {" "}
              <RestartAltIcon sx={{ fontSize: "2rem" }} />
            </Button>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </div>
  );
}
