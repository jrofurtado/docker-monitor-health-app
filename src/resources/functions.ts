import moment from "moment";

export const unixMiliToSecs = (time: number): number => {
  return Math.floor(time / 1000);
};

export const unixMiliToDateString = (time: number): string => {
  return moment(time).format("DD/MM/YYYY @ H:mm:ss");
};
