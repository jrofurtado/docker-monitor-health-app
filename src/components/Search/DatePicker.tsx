import { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { StyledGrid, StyledButton } from "../../JsxStyles/Styles";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { TextField, TextFieldProps } from "@mui/material";

export default function DatePick() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedHour, setSelectedHour] = useState<Number | null>(
    new Date().getTime()
  );

  const handleClearFilter = () => {
    setSelectedHour(null);
    setSelectedDate(null);
  };

  const handleSearch = () => {};

  return (
    <div className="date-picker">
      <LocalizationProvider dateAdapter={DateFnsUtils}>
        <StyledGrid
          item
          xs={12}
          sm={6}
          justifyContent="space-between"
          style={{ backgroundColor: "transparent" }}
        >
          <DatePicker
            renderInput={(params: TextFieldProps) => (
              <TextField
                {...params}
                style={{ marginRight: "2em", color: "whitesmoke" }}
              />
            )}
            label="Data"
            value={selectedDate}
            onChange={(selectedDate) => setSelectedDate(selectedDate)}
            inputFormat="dd/MM/yyyy"
          />
          <TimePicker
            label="Hora"
            ampm={false}
            value={selectedHour}
            onChange={(selectedHour) => setSelectedHour(selectedHour)}
            renderInput={(params: TextFieldProps) => (
              <TextField {...params} style={{ marginRight: "2em" }} />
            )}
          />
          <StyledButton onClick={handleSearch} style={{ marginRight: "2em" }}>
            {" "}
            Search
          </StyledButton>
          <StyledButton onClick={handleClearFilter}> Clear</StyledButton>
        </StyledGrid>
      </LocalizationProvider>
    </div>
  );
}
