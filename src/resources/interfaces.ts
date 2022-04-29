// Define used objects as interfaces

export interface ApplicationInterface {
  name: string;
  healthy: boolean;
  servers: Array<ServerInterface>;
}

export interface ServerInterface {
  name: string;
  status: {
    healthy: boolean;
    containers: number;
  };
}

export interface ServiceInterface {
  serverName: string;
  appName: string;
  created: string;
  expires: string;
  containers: Array<ContainerInterface>;
}

export interface ContainerInterface {
  Id: string;
  _Healthy: boolean;
  [key: string]: any;
}

export interface ApplicationKeyInterface {
  key: string;
}

export interface NotificationStatusInterface {
  global: boolean;
  apps: Array<NotificationAppStatusInterface>;
}

export interface NotificationAppStatusInterface {
  appName: string;
  isSubscribed: boolean;
}
