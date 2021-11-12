import { Authorization } from "@/requests/authentication/types";

export interface Token extends Authorization.Token {
  expires_date: number;
  refresh_expires_date: number;
}

export interface ServerRuntime {
  startTime: number;
  endTime: number;
  elapsed: number;
}

export interface ServerUptime extends ServerRuntime {
  uptime: number;
  reportCount: number;
}
