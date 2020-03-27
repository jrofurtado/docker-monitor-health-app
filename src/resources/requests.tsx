import axios from 'axios';
// TypeScript
import {
  ApplicationInterface,
  ServerInterface,
  ServiceInterface,
  ContainerInterface,
} from './interfaces';
/* develblock:start */
import allMocks from '../mocks/mockResponses';
/* develblock:end */

export async function getApplicationNamesList(): Promise<Array<
  ApplicationInterface
> | void> {
  /* develblock:start */
  // Mock
  if (process.env.NODE_ENV !== 'production') {
    return allMocks.getApplicationStatus();
  }
  /* develblock:end */
  // Fetch
  return await axios
    .get('/api/status/readLast')
    .then((response) => {
      // Define the recieved data format
      interface Data {
        // App Name
        [key: string]: {
          // Server Name
          [key: string]: {
            healthy: boolean;
            containers: number;
          };
        };
      }
      // Get the data
      const data: Data = response.data;
      // Create an Array with ApplicationInterface Objects
      const apps: Array<ApplicationInterface> = [];
      for (const [key, value] of Object.entries(data)) {
        const appName = key;
        let appHealthy = true;
        const servers: Array<ServerInterface> = Object.keys(value).map((k) => {
          if (!value[k].healthy) {
            appHealthy = false;
          }
          const server = {
            name: k,
            status: value[k],
          };
          return server;
        });
        apps.push({
          name: appName,
          healthy: appHealthy,
          servers: servers,
        });
      }
      return apps;
    })
    .catch((error) => {
      console.log('getApplicationNamesList Error: ', error);
    });
}

export async function getServiceInfo(
  appName: string,
  serverName: string
): Promise<ServiceInterface | void> {
  /* develblock:start */
  // Mock
  if (process.env.NODE_ENV !== 'production') {
    return allMocks.getServiceStatus(appName, serverName);
  }
  /* develblock:end */
  // Fetch
  return await axios
    .get(`/api/message/readLast?appName=${appName}&serverName=${serverName}`)
    .then((response) => {
      const data = {
        serverName: response.data.serverName,
        appName: response.data.appName,
        created: response.data.created,
        expires: response.data.expires,
        containers: response.data.containers.map(
          (container: ContainerInterface) => {
            return {
              id: container.Id,
              names: container.Names,
              image: container.Image,
              ImageID: container.ImageID,
              createdTimestamp: container.Created,
              healthy: container._Healthy,
            };
          }
        ),
      };
      return data;
    })
    .catch((error) => {
      console.log('getApplicationNamesList Error: ', error);
    });
}
