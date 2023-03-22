import { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { StyledGrid, StyledButton } from "../../JsxStyles/Styles";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { TextField, TextFieldProps } from "@mui/material";
import "../../styles/DatePicker.css";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

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
          className="date-picker-grid"
          item
          container
          style={{
            backgroundColor: "transparent",
            gap: "15",
            marginTop: "2em",
          }}
        >
          <DatePicker
            renderInput={(params: TextFieldProps) => (
              <TextField
                {...params}
                style={{ marginRight: "2em" }}
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
            onChange={(selectedDate) => setSelectedDate(selectedDate)}
            inputFormat="dd/MM/yyyy"
          />

          <TimePicker
            label="Hora"
            ampm={false}
            value={selectedHour}
            onChange={(selectedHour) => setSelectedHour(selectedHour)}
            renderInput={(params: TextFieldProps) => (
              <TextField
                {...params}
                style={{ marginRight: "2em" }}
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
          <StyledGrid
            item
            container
            direction="row"
            style={{
              backgroundColor: "transparent",
              marginTop: "2rem",
              gap: "2em",
            }}
          >
            <StyledButton
              style={{ backgroundColor: "white", color: "balck" }}
              onClick={handleSearch}
            >
              {" "}
              <SearchIcon />
            </StyledButton>

            <StyledButton
              style={{ backgroundColor: "red", color: "white" }}
              onClick={handleClearFilter}
            >
              {" "}
              <ClearIcon />
            </StyledButton>
          </StyledGrid>
        </StyledGrid>
      </LocalizationProvider>
    </div>
  );
}
