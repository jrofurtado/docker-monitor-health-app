import DateFnsUtils from "@date-io/date-fns";
import { StyledGrid } from "../../JsxStyles/Styles";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { TextField, TextFieldProps } from "@mui/material";

interface DatePickProps {
  selectedDate: Date | null;
  selectedHour: Date | null;
  setSelectedDate: (date: Date | null) => void;
  setSelectedHour: (hour: Date | null) => void;
}

export default function DatePick(props: DatePickProps) {
  const { selectedDate, selectedHour, setSelectedDate, setSelectedHour } =
    props;

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedHour(null);
    props.setSelectedDate(date);
    props.setSelectedHour(null);
  };
  const handleHourChange = (hour: Date | null) => {
    setSelectedHour(hour);
    setSelectedDate(null);
    props.setSelectedHour(hour);
    props.setSelectedDate(null);
  };

  return (
    <div className="date-picker">
      <StyledGrid container spacing={3}>
        <LocalizationProvider dateAdapter={DateFnsUtils}>
          <StyledGrid item xs={12} sm={6}>
            <TimePicker
              label="Hora"
              value={selectedHour}
              onChange={handleHourChange}
              renderInput={(params: TextFieldProps) => (
                <TextField {...params} />
              )}
            />
            <DatePicker
              label="Dia"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params: TextFieldProps) => (
                <TextField {...params} />
              )}
            />
          </StyledGrid>
        </LocalizationProvider>
      </StyledGrid>
    </div>
  );
}
