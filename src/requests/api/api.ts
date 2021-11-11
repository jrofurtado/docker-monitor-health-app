import { AxiosResponse } from "axios";
import moment from "moment";

import { useAuthorizationContext } from "@/context/AuthorizationContext";
import {
  ApplicationData,
  ApplicationInterface,
  ServerInterface,
  ServiceInterface,
} from "@/requests/api/types";
import { serviceAPI } from "@/requests/authentication/authentication";

export const api = {
  getApplicationList: async (): Promise<ApplicationInterface[] | void> => {
    try {
      console.log("query here", useAuthorizationContext.getState().token);
      const response: AxiosResponse<Array<ApplicationData>> =
        await serviceAPI.get("/status/readLast");
      // Create an Array with ApplicationInterface Objects
      const apps: Array<ApplicationInterface> = [];
      for (const [key, value] of Object.entries(response.data)) {
        const appName = key;
        let appHealthy = true;
        const servers: ServerInterface[] = Object.keys(value).map(
          (k): ServerInterface => {
            if (!value[k].healthy) {
              appHealthy = false;
            }
            const server: ServerInterface = {
              name: k,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              status: value[k],
            };
            return server;
          }
        );
        apps.push({
          name: appName,
          healthy: appHealthy,
          servers: servers,
        });
      }
      return apps;
    } catch (error) {
      console.log("error: ", error);
      return;
    }
  },
  getServiceHistory: async (
    app: string,
    server: string,
    fromDate: Date,
    toDate: Date
  ): Promise<ServiceInterface[] | undefined> => {
    // Fetch
    try {
      const response: AxiosResponse<Array<ServiceInterface>> =
        await serviceAPI.get(
          `/message/readInterval?appName=${app}&serverName=${server}&from=${moment(
            fromDate
          ).valueOf()}&to=${moment(toDate).valueOf()}`
        );
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return;
    }
  },
};
