import axios from "axios";
// TypeScript
import { ApplicationInterface, ServerInterface } from "./interfaces";
/* develblock:start */
// @ts-ignore
import allMocks from "../mocks/mockResponses.ts";
/* develblock:end */

export async function getApplicationNamesList(): Promise<Array<
  ApplicationInterface
> | void> {
  /* develblock:start */
  // Mock
  if (process.env.NODE_ENV !== "production") {
    return allMocks.getStatus();
  }
  /* develblock:end */
  // Fetch
  return await axios
    .get("/api/status/ReadLast")
    .then(response => {
      // Create an Array with ApplicationInterface Objects
      let apps: Array<ApplicationInterface> = [];
      for (const [key, value] of Object.entries(response)) {
        const appName = key;
        let appHealthy = true;
        let servers: Array<ServerInterface> = Object.keys(value).map(k => {
          if (!value[k].healthy) {
            appHealthy = false;
          }
          const server = {
            name: k,
            status: value[k]
          };
          return server;
        });
        apps.push({
          name: appName,
          healthy: appHealthy,
          servers: servers
        });
      }
      return apps;
    })
    .catch(error => {
      console.log("getApplicationNamesList Error: ", error);
    });
}
