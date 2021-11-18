import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// Library CSS
import "react-datepicker/dist/react-datepicker.css";
// Datepicker
import { registerLocale, setDefaultLocale } from "react-datepicker";
import pt from "date-fns/locale/pt";
registerLocale("pt", pt);
setDefaultLocale("pt");

import App from "@/components/App";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
