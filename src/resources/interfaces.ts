import { Authorization } from "@/requests/authentication/types";

export interface Token extends Authorization.Token {
  expires_date: number;
  refresh_expires_date: number;
}

export interface ServerRuntime {
  startTime: number;
  endTime: number;
  runtime: number;
}

export interface ServerUptime extends ServerRuntime {
  uptime: number;
  month: string;
  year: string;
  reportCount: number;
}

export interface ReadableServerUptime {
  month: string;
  year: string;
  uptime_percentage: number;
  uptime_miliseconds: number;
  downtime_miliseconds: number;
  runtime: string;
  runtime_miliseconds: number;
  startTime: string;
  startTime_unix: number;
  endTime: string;
  endTime_unix: number;
}
