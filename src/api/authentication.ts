import querystring from "querystring";

import axios from "axios";

const getKeycloakUrl = (hostname: string, realmName: string): string => {
  return `http://${hostname}/auth/realms/${realmName}/protocol/openid-connect/token`;
};

export const getAuth = async (): Promise<string> => {
  const keycloakUrl = getKeycloakUrl(
    process.env.REACT_APP_HOSTNAME ?? "",
    process.env.REACT_APP_REALM_NAME ?? ""
  );

  console.log("keycloakUrl: ", keycloakUrl);

  const response = await axios.post(
    keycloakUrl,
    querystring.stringify({
      username: "admin",
      password: "password",
      grant_type: "password",
      client_id: process.env.REACT_APP_CLIENT_ID ?? "",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  console.log("response: ", response);

  return keycloakUrl;
};

// const authentication = {
//   getAuth,
// };

// export default authentication;
