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
  style: {};
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

export interface StatusInterface {
  healthy: boolean;
  containers: number;
}
export interface ServerStatusInterface {
  [key: string]: StatusInterface;
}

export interface ApplicationStatusInterface {
  [key: string]: ServerStatusInterface;
}
export interface ApplicationsStatusInterface {
  timestamp: number;
  apps: ApplicationStatusInterface;
}
export interface NotificationProps {
  applicationName: string;
  notificationEnabled: boolean;
}
export interface ServiceHistoryProps {
  appName: string;
  serviceName: string;
  handleMessageClick: (service: ServiceInterface) => void;
  handleHeaderTitle: (...args: string[]) => void;
  handleCurrentComp: (currentComp: string) => void;
}

export interface ServiceInformationProps {
  appName: string;
  serviceName: string;
  service: ServiceInterface;
  handleHeaderTitle: (...args: string[]) => void;
  handleCurrentComp: (currentComp: string) => void;
}
