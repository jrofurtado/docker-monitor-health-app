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
  downloadStatisticsAsJSON,
  uptimeToReadable,
} from "@/resources/functions";
import { ServerUptime } from "@/resources/interfaces";
import { getServerUptime } from "@/resources/statistics";

export default function Server(): JSX.Element {
  // Router
  const params = useParams();

  // State
  const [fromDate, setFromDate] = useState<Date | null>(
    moment().startOf("month").startOf("day").toDate()
  );
  const [toDate, setToDate] = useState<Date | null>(
    moment().endOf("month").endOf("day").toDate()
  );

  const [statistics, setStatistics] = useState<ServerUptime[] | undefined>(
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
          if (res) setStatistics(getServerUptime(res, fromDate, toDate));
        })
        .catch(() => {});
    }
  }, [fromDate, toDate]);

  return (
    <RequireAuth>
      <Page centerHor>
        <div className="mx-auto flex flex-col items-center">
          <div className="mb-5">
            <div>Select month range for reports</div>
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
                dateFormat="MMM yyyy"
                showMonthYearPicker
              />
            </div>
          </div>
          {statistics ? (
            <div>
              <div className="grid gap-5">
                <button
                  onClick={() => downloadStatisticsAsJSON(statistics)}
                  className="rounded-md bg-indigo-500 p-3 text-white"
                >
                  Download JSON
                </button>
                <div className="text-white">
                  <CsvDownload
                    data={statistics.map((stats) => uptimeToReadable(stats))}
                    className="text-transparent translate-x-3"
                  />
                  <div className="-translate-y-9 rounded-md bg-indigo-500 p-3 pointer-events-none">
                    Download CSV
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-md bg-indigo-500 p-3 text-white">
              Loading ...
            </div>
          )}
        </div>
      </Page>
    </RequireAuth>
  );
}
