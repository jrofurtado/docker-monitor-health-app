import querystring from "querystring";

import axios, { AxiosResponse } from "axios";

import { Authorization } from "@/api/authentication/types";
import { useAuthorizationContext } from "@/context/AuthorizationContext";

const { setToken } = useAuthorizationContext.getState();

const getKeycloakUrl = (): string => {
  const hostname: string = process.env.REACT_APP_HOSTNAME ?? "";
  const realmName: string = process.env.REACT_APP_REALM_NAME ?? "";
  return `http://${hostname}/auth/realms/${realmName}/protocol/openid-connect/token`;
};

export const authentication = {
  getAuth: async (username: string, password: string): Promise<boolean> => {
    const keycloakUrl = getKeycloakUrl();

    try {
      const response: AxiosResponse<Authorization.Token> = await axios.post(
        keycloakUrl,
        querystring.stringify({
          username,
          password,
          grant_type: "password",
          client_id: process.env.REACT_APP_CLIENT_ID ?? "",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("response: ", response.data);
      setToken(response.data);
      return true;
    } catch (error) {
      console.log("error: ", error);
      return false;
    }
  },
};
