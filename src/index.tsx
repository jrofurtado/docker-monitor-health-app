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

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
