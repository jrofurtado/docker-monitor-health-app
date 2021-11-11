import moment from "moment";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";

import Page from "@/components/Page";
import RequireAuth from "@/components/RequireAuth";
import { api } from "@/requests/api/api";

export default function Server() {
  // Router
  const params = useParams();

  // State
  const [fromDate, setFromDate] = useState<Date | null>(
    moment().subtract(1, "months").toDate()
  );
  const [toDate, setToDate] = useState<Date | null>(moment().toDate());

  useEffect(() => {
    if (params.app && params.server && fromDate && toDate) {
      api
        .getServiceHistory(params.app, params.server, fromDate, toDate)
        .then((res) => console.log("res: ", res))
        .catch(() => {});
    }
  }, [fromDate, toDate]);

  return (
    <RequireAuth>
      <Page centerHor centerVer>
        <div>
          <div>
            <span>From: </span>
            <DatePicker
              selected={fromDate}
              onChange={(date) => !Array.isArray(date) && setFromDate(date)}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div>
            <span>To: </span>
            <DatePicker
              selected={toDate}
              onChange={(date) => !Array.isArray(date) && setToDate(date)}
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>
      </Page>
    </RequireAuth>
  );
}
