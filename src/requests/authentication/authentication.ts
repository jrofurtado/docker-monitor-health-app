import querystring from "querystring";

import axios, { AxiosError, AxiosResponse } from "axios";
import moment from "moment";
import { VariantType } from "notistack";
import { NavigateFunction } from "react-router";

import { useAuthorizationContext } from "@/context/AuthorizationContext";
import { Authorization, TokenResponse } from "@/requests/authentication/types";
import { Token } from "@/resources/interfaces";
import ROUTES from "@/resources/ROUTES";

declare global {
  interface Window {
    _env_: {
      [key: string]: string;
    };
  }
}

/**
 * ENV variables
 */
export const HOSTNAME: string = window._env_.REACT_APP_HOSTNAME ?? "";
export const REALM_NAME: string = window._env_.REACT_APP_REALM_NAME ?? "";
export const CLIENT_ID: string = window._env_.REACT_APP_CLIENT_ID ?? "";

// Context
const {
  token: contextToken,
  setToken,
  removeToken,
} = useAuthorizationContext.getState();

/**
 * API instances
 */
export const keycloakAPI = {
  axios: axios.create({
    baseURL: `https://${HOSTNAME}/auth`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  }),
  setInterceptors: function (
    callback: (message: string, type: VariantType) => void
  ): void {
    this.axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error: AxiosError) {
        if (401 === error.response?.status) {
          // handle error: inform user, go to login, etc
          callback("Username and password don't match", "error");
        } else {
          callback("An error occurred", "error");
          return Promise.reject(error);
        }
      }
    );
  },
};

export const serviceAPI = {
  axios: axios.create({
    baseURL: `https://${HOSTNAME}/api`,
    headers: {
      Authorization: contextToken ? `Bearer ${contextToken.access_token}` : "",
    },
  }),
  setInterceptors: function (
    navigate: NavigateFunction,
    callback: (message: string, type: VariantType) => void
  ): void {
    this.axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error: AxiosError) {
        console.log("error.response: ", error.response);
        if (error.response && [401, 403].includes(error.response.status)) {
          // handle error: inform user, go to login, etc
          callback("Authorization expired", "error");
          navigate(ROUTES.LOGIN);
        } else {
          callback("An error occurred", "error");
          return Promise.reject(error);
        }
      }
    );
  },
};

const getKeycloakAuthUrl = (): string => {
  return `/realms/${REALM_NAME}/protocol/openid-connect/token`;
};

const fetchAuth = async (
  username: string,
  password: string
): Promise<TokenResponse> => {
  const keycloakUrl = getKeycloakAuthUrl();

  try {
    const response: AxiosResponse<Authorization.Token> =
      await keycloakAPI.axios.post(
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
    return { token, message: "" };
  } catch (error) {
    console.log("error at fetchAuth: ", error);
    return { token: undefined, message: "" };
  }
};

const refreshAuth = async (token: Token): Promise<Token | undefined> => {
  const keycloakUrl = getKeycloakAuthUrl();

  try {
    const response: AxiosResponse<Authorization.Token> =
      await keycloakAPI.axios.post(
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
    return;
  }
};

export const authentication = {
  getAuth: async (
    username: string,
    password: string,
    requestCredentials: () => void
  ): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response: TokenResponse = await fetchAuth(username, password);
    if (response.token) {
      // setToken(token);
      authentication.setAuth(response.token, requestCredentials);
      return {
        success: true,
        message: "",
      };
    }
    return {
      success: false,
      message: response.message,
    };
  },
  setAuth: (token: Token, requestCredentials: () => void): void => {
    setToken(token);

    serviceAPI.axios.interceptors.request.use(async (config) => {
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
  removeAuth: (): void => {
    removeToken();
  },
  // setErrorHandling: (
  //   callback: (message: string, type: VariantType) => void
  // ): void => {
  //   keycloakAPI.interceptors.response.use(
  //     function (response) {
  //       return response;
  //     },
  //     function (error: AxiosError) {
  //       if (401 === error.response?.status) {
  //         // handle error: inform user, go to login, etc
  //         callback("Username and password don't match", "error");
  //       } else {
  //         callback("An error occurred", "error");
  //         return Promise.reject(error);
  //       }
  //     }
  //   );
  // },
};
