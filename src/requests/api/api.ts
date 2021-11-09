import axios, { AxiosResponse } from "axios";

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
      console.log("fetching ...");
      const response: AxiosResponse<Array<ApplicationData>> =
        await serviceAPI.get("/status/readLast");
      console.log("response: ", response);
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
      console.log("apps: ", apps);
      return apps;
    } catch (error) {
      console.log("error: ", error);
      return;
    }
  },
  getServiceHistory: async (
    appName: string,
    serverName: string
  ): Promise<ServiceInterface[] | undefined> => {
    // Fetch
    try {
      const response: AxiosResponse<Array<ServiceInterface>> =
        await serviceAPI.get(
          `/api/message/readInterval?appName=${appName}&serverName=${serverName}&from=0&to=2629746`
        );
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return;
    }
  },
};
