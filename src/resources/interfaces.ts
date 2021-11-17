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
  month: string;
  reportCount: number;
}

export interface ReadableServerUptime {
  month: string;
  uptime: number;
  elapsed: string;
  elapsed_miliseconds: number;
  startTime: string;
  startTime_unix: number;
  endTime: string;
  endTime_unix: number;
}
