import moment from "moment";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CsvDownload from "react-json-to-csv";
import { useParams } from "react-router-dom";

import Page from "@/components/Page";
import RequireAuth from "@/components/RequireAuth";
import { api } from "@/requests/api/api";
import {
  downloadAsJSON,
  unixMiliToDateString,
  unixMiliToSecs,
} from "@/resources/functions";
import { ServerUptime } from "@/resources/interfaces";
import { getServerUptime } from "@/resources/statistics";

export default function Server(): JSX.Element {
  // Router
  const params = useParams();

  // State
  const [fromDate, setFromDate] = useState<Date | null>(
    // moment().subtract(1, "months").startOf("day").toDate()
    moment().startOf("month").startOf("day").toDate()
  );
  const [toDate, setToDate] = useState<Date | null>(
    moment().endOf("month").endOf("day").toDate()
  );

  const [statistics, setStatistics] = useState<ServerUptime | undefined>(
    undefined
  );

  useEffect(() => {
    if (params.app && params.server && fromDate && toDate) {
      console.log("fromDate: ", moment(fromDate).format("LLLL"));
      console.log("toDate: ", moment(toDate).format("LLLL"));
      setStatistics(undefined);
      api
        .getServiceHistory(params.app, params.server, fromDate, toDate)
        .then((res) => {
          console.log("res: ", res);
          if (res) setStatistics(getServerUptime(res));
        })
        .catch(() => {});
    }
  }, [fromDate, toDate]);

  return (
    <RequireAuth>
      <Page centerHor centerVer>
        <div className="mx-auto flex flex-col items-center justify-center">
          <div>
            <div>
              <span>From: </span>
              <DatePicker
                selected={fromDate}
                onChange={(date) =>
                  !Array.isArray(date) &&
                  setFromDate(
                    moment(date).startOf("month").startOf("day").toDate()
                  )
                }
                // dateFormat="dd/MM/yyyy"
                dateFormat="MMM yyyy"
                showMonthYearPicker
              />
            </div>
            <div>
              <span>To: </span>
              <DatePicker
                selected={toDate}
                onChange={(date) =>
                  !Array.isArray(date) &&
                  setToDate(moment(date).endOf("month").endOf("day").toDate())
                }
                // dateFormat="dd/MM/yyyy"
                dateFormat="MMM yyyy"
                showMonthYearPicker
              />
            </div>
          </div>
          {statistics ? (
            <div>
              <ul>
                <li>
                  <code>
                    Firt Report: {unixMiliToDateString(statistics.startTime)}
                  </code>
                </li>
                <li>
                  <code>
                    Last Report: {unixMiliToDateString(statistics.endTime)}
                  </code>
                </li>
                <li>
                  <code>Report Count: {statistics.reportCount}</code>
                </li>
                <li>
                  <code>
                    Elapsed Time: {unixMiliToSecs(statistics.elapsed)} seconds
                  </code>
                </li>
                <li>
                  <code>
                    Uptime: {unixMiliToSecs(statistics.uptime)} seconds
                  </code>
                </li>
                <li>
                  <code>
                    Uptime Percentage:{" "}
                    {(statistics.uptime / statistics.elapsed) * 100}%
                  </code>
                </li>
              </ul>
              <div>
                <button
                  onClick={() => downloadAsJSON(statistics)}
                  className="rounded-md bg-indigo-500 p-3 text-white"
                >
                  Download JSON
                </button>
                <div className="rounded-md bg-indigo-500 p-3 text-white">
                  <CsvDownload data={statistics} />
                </div>
              </div>
            </div>
          ) : (
            <div>Loading ...</div>
          )}
        </div>
      </Page>
    </RequireAuth>
  );
}
