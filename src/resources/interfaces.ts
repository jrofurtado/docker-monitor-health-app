import { Authorization } from "@/requests/authentication/types";

export interface Token extends Authorization.Token {
  expires_date: number;
  refresh_expires_date: number;
}
