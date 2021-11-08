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

  await axios
    .post("/user", {
      firstName: "Fred",
      lastName: "Flintstone",
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  return keycloakUrl;
};

// const authentication = {
//   getAuth,
// };

// export default authentication;
