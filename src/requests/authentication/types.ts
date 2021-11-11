export declare namespace Authorization {
  export interface Token {
    access_token: string;
    expires_in: number;
    expirity_date: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: string;
    "not-before-policy": number;
    session_state: string;
    scope: string;
  }
}
