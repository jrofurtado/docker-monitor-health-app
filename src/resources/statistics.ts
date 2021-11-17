import moment from "moment";

import { ServiceInterface } from "@/requests/api/types";
import { ServerRuntime, ServerUptime } from "@/resources/interfaces";

interface ItemUptime {
  uptime: number;
  lastTime: number;
}

const getStartEndTime = (service: ServiceInterface[]): ServerRuntime => {
  if (service.length) {
    const startTime: number = service[0]?.createdTimestamp;
    const endTime: number = service[service.length - 1]?.createdTimestamp;
    const elapsed: number = endTime - startTime;
    return {
      startTime,
      endTime,
      elapsed,
    };
  }
  return {
    startTime: 0,
    endTime: 0,
    elapsed: 0,
  };
};

const getUptime = (service: ServiceInterface[]): number => {
  const getItemUptime = (
    acc: ItemUptime,
    item: ServiceInterface,
    index: number
  ): number => {
    const isHealthy: boolean =
      item.info.Containers === item.info.ContainersRunning;
    if (index === 0) {
      return 0;
    }
    if (isHealthy) {
      return item.createdTimestamp - acc.lastTime;
    }
    return 0;
  };

  const result = service.reduce(
    (acc, item, index): ItemUptime => {
      return {
        uptime: acc.uptime + getItemUptime(acc, item, index),
        lastTime: item.createdTimestamp,
      };
    },
    {
      uptime: 0,
      lastTime: 0,
    }
  );
  return result.uptime;
};

export const getServerUptime = (
  service: ServiceInterface[],
  fromDate: Date,
  toDate: Date
): ServerUptime[] => {
  // Get months from array
  const interim = moment(fromDate).clone();
  const timeValues = [];

  while (
    moment(toDate) > interim ||
    interim.format("M") === moment(toDate).format("M")
  ) {
    timeValues.push(interim.valueOf());
    interim.add(1, "month");
  }

  // Get stats for each month
  const serverUptimes: ServerUptime[] = timeValues.map((month) => {
    const filteredServicesByMonth = service.filter((serv) =>
      moment(serv.created).isSame(moment(month), "month")
    );
    const { startTime, endTime, elapsed } = getStartEndTime(
      filteredServicesByMonth
    );
    const result: ServerUptime = {
      uptime: getUptime(service),
      month: moment(month).format("M"),
      startTime,
      endTime,
      elapsed,
      reportCount: service.length,
    };
    return result;
  });

  console.log("serverUptimes: ", serverUptimes);

  return serverUptimes;

  // const { startTime, endTime, elapsed } = getStartEndTime(service);
  // const result: ServerUptime = {
  //   uptime: getUptime(service),
  //   startTime,
  //   endTime,
  //   elapsed,
  //   reportCount: service.length,
  // };
  // console.log("result: ", result);
  // return result;
};
