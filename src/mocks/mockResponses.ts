import {
  ApplicationInterface,
  ServerInterface,
  ServiceInterface,
  ContainerInterface,
  NotificationStatusInterface,
} from "../resources/interfaces";

export async function getApplicationStatus(): Promise<Array<
  ApplicationInterface
> | void> {
  // Define the recieved data format
  interface Data {
    [key: string]: {
      [key: string]: {
        healthy: boolean;
        containers: number;
      };
    };
  }
  // Get the data from the Mock Response
  const data: Data = require("./responses/appState.json").data;
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
}

export async function getServiceStatus(
  appName: string,
  serverName: string
): Promise<ServiceInterface | void> {
  // Get the data from the Mock Response
  const response = require("./responses/serviceState.json").data;
  const service = {
    serverName: serverName,
    appName: appName,
    created: response.created,
    expires: response.expires,
    containers: response.containers.map((container: ContainerInterface) => {
      return {
        id: container.Id,
        names: container.Names,
        image: container.Image,
        ImageID: container.ImageID,
        createdTimestamp: container.Created,
        healthy: container._Healthy,
      };
    }),
  };
  return service;
}

export async function getServiceHistory(
  appName: string,
  serverName: string
): Promise<Array<ServiceInterface> | void> {
  // Get the data from the Mock Response
  const response = require("./responses/serviceStateHistory.json").data;
  const serviceHistory: Array<ServiceInterface> | any = [];

  response.forEach((service: ServiceInterface) => {
    let serv = {
      serverName: serverName,
      appName: appName,
      created: service.created,
      expires: service.expires,
      containers: service.containers.map((container: ContainerInterface) => {
        return {
          id: container.Id,
          names: container.Names,
          image: container.Image,
          ImageID: container.ImageID,
          createdTimestamp: container.Created,
          healthy: container._Healthy,
        };
      }),
    };
    serviceHistory.push(serv);
  });
  return serviceHistory;
}

export async function getNotificationStatus(): Promise<NotificationStatusInterface | void> {
  // Get the data from the Mock Response
  const data: NotificationStatusInterface = require("./responses/notificationState.json")
    .data;
  return data;
}

const allMocks = {
  getApplicationStatus,
  getServiceStatus,
  getServiceHistory,
  getNotificationStatus,
};

export default allMocks;
