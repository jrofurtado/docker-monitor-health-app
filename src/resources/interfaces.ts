// Define used objects as interfaces

export interface ApplicationInterface {
  name: String;
  healthy: boolean;
  servers: Array<ServerInterface>;
}

export interface ServerInterface {
  name: String;
  status: {
    healthy: boolean;
    containers: number;
  };
}

export interface ApplicationKeyInterface {
  key: String;
}
