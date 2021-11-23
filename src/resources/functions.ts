import moment from "moment";

import { ReadableServerUptime, ServerUptime } from "@/resources/interfaces";

export const unixMiliToSecs = (time: number): number => {
  return Math.floor(time / 1000);
};

export const unixMiliToDateString = (time: number): string => {
  return moment(time).toISOString();
};

export const uptimeToReadable = (
  uptime: ServerUptime
): ReadableServerUptime => {
  const readable: ReadableServerUptime = {
    month: uptime.month,
    year: uptime.year,
    uptime_percentage: (uptime.uptime / uptime.runtime) * 100,
    uptime_miliseconds: uptime.uptime,
    downtime_miliseconds: uptime.runtime - uptime.uptime,
    runtime: uptime.runtime
      ? moment.duration(uptime.runtime, "milliseconds").humanize()
      : "0",
    runtime_miliseconds: uptime.runtime,
    startTime: uptime.startTime ? moment(uptime.startTime).toISOString() : "",
    startTime_unix: uptime.startTime,
    endTime: uptime.endTime ? moment(uptime.endTime).toISOString() : "",
    endTime_unix: uptime.endTime,
  };
  return readable;
};

export const downloadStatisticsAsJSON = (statistics: ServerUptime[]) => {
  const filename = "export.json";
  const contentType = "application/json;charset=utf-8;";
  const a = document.createElement("a");
  a.download = filename;
  a.href =
    "data:" +
    contentType +
    "," +
    encodeURIComponent(
      JSON.stringify({
        statistics: statistics.map((stats) => uptimeToReadable(stats)),
      })
    );
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
