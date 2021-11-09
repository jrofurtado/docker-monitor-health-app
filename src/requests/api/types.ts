export interface ApplicationData {
  // App Name
  [key: string]: {
    // Server Name
    [key: string]: {
      healthy: boolean;
      containers: number;
    };
  };
}

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
  [key: string]: unknown;
}
