import querystring from "querystring";

import axios, { AxiosResponse } from "axios";

import { useAuthorizationContext } from "@/context/AuthorizationContext";
import { Authorization } from "@/requests/authentication/types";

/**
 * ENV variables
 */
export const HOSTNAME: string = process.env.REACT_APP_HOSTNAME ?? "";
export const REALM_NAME: string = process.env.REACT_APP_REALM_NAME ?? "";
export const CLIENT_ID: string = process.env.REACT_APP_CLIENT_ID ?? "";

/**
 * API instances
 */
export const keycloakAPI = axios.create({
  baseURL: `http://${HOSTNAME}/auth`,
  timeout: 1000,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

export const serviceAPI = axios.create({
  baseURL: `http://${HOSTNAME}/api`,
  timeout: 1000,
  headers: { Authorization: "" },
});

const { setToken } = useAuthorizationContext.getState();

const getKeycloakAuthUrl = (): string => {
  return `/realms/${REALM_NAME}/protocol/openid-connect/token`;
};

export const authentication = {
  getAuth: async (username: string, password: string): Promise<boolean> => {
    const keycloakUrl = getKeycloakAuthUrl();

    try {
      const response: AxiosResponse<Authorization.Token> =
        await keycloakAPI.post(
          keycloakUrl,
          querystring.stringify({
            username,
            password,
            grant_type: "password",
            client_id: CLIENT_ID,
          })
        );

      console.log("response: ", response.data);
      authentication.setAuth(response.data);
      setToken(response.data);
      return true;
    } catch (error) {
      console.log("error: ", error);
      return false;
    }
  },
  setAuth: (token: Authorization.Token) => {
    serviceAPI.interceptors.request.use(function (config) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token.access_token}`,
      };
      return config;
    });
  },
};
