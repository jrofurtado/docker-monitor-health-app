import moment from "moment";

import { ServerUptime } from "@/resources/interfaces";

export const unixMiliToSecs = (time: number): number => {
  return Math.floor(time / 1000);
};

export const unixMiliToDateString = (time: number): string => {
  return moment(time).format("DD/MM/YYYY @ H:mm:ss");
};

export const downloadAsJSON = (statistics: ServerUptime) => {
  const filename = "export.json";
  const contentType = "application/json;charset=utf-8;";
  const a = document.createElement("a");
  a.download = filename;
  a.href =
    "data:" +
    contentType +
    "," +
    encodeURIComponent(JSON.stringify(statistics));
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
