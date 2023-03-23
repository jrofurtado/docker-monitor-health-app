import { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { Grid, TextField, TextFieldProps, Button } from "@mui/material";
import "../../styles/DatePicker.css";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

interface DateProps {
  onDateChange: (event: any) => void;
  onHourChange: (event: any) => void;
}
export default function DatePick(props: DateProps): JSX.Element {
  const { onDateChange, onHourChange } = props;
  const [selectedDate, setSelectedDate] = useState<any | null>(new Date());
  const [selectedHour, setSelectedHour] = useState<any | null>(
    new Date().getTime()
  );

  const handleDateChange = (date: any | null) => {
    setSelectedDate(date);
    onDateChange(date ? date.format() : null);
    console.log(onDateChange);
  };

  const handleHourChange = (hour: any | null) => {
    setSelectedHour(hour);
    onHourChange(hour ? hour.format("LTS") : null);
  };

  const handleClearFilter = () => {
    setSelectedDate(new Date());
    setSelectedHour(new Date().getTime());
  };

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
