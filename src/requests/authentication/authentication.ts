import querystring from "querystring";

import axios, { AxiosResponse } from "axios";
import moment from "moment";

import { useAuthorizationContext } from "@/context/AuthorizationContext";
import { Authorization } from "@/requests/authentication/types";
import { Token } from "@/resources/interfaces";

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
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

export const serviceAPI = axios.create({
  baseURL: `http://${HOSTNAME}/api`,
  headers: { Authorization: "" },
});

const { setToken } = useAuthorizationContext.getState();

const getKeycloakAuthUrl = (): string => {
  return `/realms/${REALM_NAME}/protocol/openid-connect/token`;
};

const fetchAuth = async (
  username: string,
  password: string
): Promise<Token | undefined> => {
  const keycloakUrl = getKeycloakAuthUrl();

  try {
    const response: AxiosResponse<Authorization.Token> = await keycloakAPI.post(
      keycloakUrl,
      querystring.stringify({
        username,
        password,
        grant_type: "password",
        client_id: CLIENT_ID,
      })
    );

    const token: Token = {
      ...response.data,
      expires_date: moment().unix() + response.data.expires_in,
      refresh_expires_date: moment().unix() + response.data.refresh_expires_in,
    };
    return token;
  } catch (error) {
    console.log("error at fetchAuth: ", error);
    return;
  }
};

const refreshAuth = async (token: Token): Promise<Token | undefined> => {
  const keycloakUrl = getKeycloakAuthUrl();

  try {
    const response: AxiosResponse<Authorization.Token> = await keycloakAPI.post(
      keycloakUrl,
      querystring.stringify({
        refresh_token: token.refresh_token,
        grant_type: "refresh_token",
        client_id: CLIENT_ID,
      })
    );

    const currentDate: number = moment().unix();

    const newToken: Token = {
      ...response.data,
      expires_date: currentDate + response.data.expires_in,
      refresh_expires_date: currentDate + response.data.refresh_expires_in,
    };
    return newToken;
  } catch (error) {
    console.log("error at refreshAuth: ", error);
    return;
  }
};

export const authentication = {
  getAuth: async (
    username: string,
    password: string,
    requestCredentials: () => void
  ): Promise<boolean> => {
    const token: Token | undefined = await fetchAuth(username, password);
    if (token) {
      // setToken(token);
      authentication.setAuth(token, requestCredentials);
      return true;
    }
    return false;
  },
  setAuth: (token: Token, requestCredentials: () => void): void => {
    setToken(token);

    serviceAPI.interceptors.request.use(async (config) => {
      const currentToken = useAuthorizationContext.getState().token;
      const currentDate: number = moment().unix();

      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${currentToken?.access_token ?? ""}`,
      };

      if (!currentToken) {
        // redirect to login
        console.log("!!! No token");
        requestCredentials();
        return {
          ...config,
          cancelToken: new axios.CancelToken((cancel) =>
            cancel("No authentication")
          ),
        };
      }

      // If refresh expired
      if (currentDate > currentToken.refresh_expires_date) {
        // redirect to login
        console.log("!!! Refresh token expired");
        requestCredentials();
        return {
          ...config,
          cancelToken: new axios.CancelToken((cancel) =>
            cancel("No authentication")
          ),
        };
      }

      // If time for refresh
      if (currentDate > currentToken.expires_date) {
        // use refresh token
        console.log("!!! New token");
        const newToken = await refreshAuth(currentToken);
        console.log("!!! Got new token: ", !!newToken);
        if (newToken) {
          setToken(newToken);
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${newToken.access_token}`,
          };
          return config;
        }
      }
      return config;

      // Else
      // if (currentToken?.expires_date)
      //   if (currentToken?.access_token) {
      //     config.headers = {
      //       ...config.headers,
      //       Authorization: `Bearer ${currentToken.access_token}`,
      //     };
      //   }
      // return config;
    });
  },
};
