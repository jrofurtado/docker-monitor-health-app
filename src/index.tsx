import React from "react";
import ReactDOM from "react-dom/client";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";

import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import * as Keycloak from "keycloak-js";
import axios from "axios";
import App from "./components/App/App";

import store from "./redux-store/props-redux/store";
import { subscribeUser } from "./resources/subscription";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

/*eslint-disable*/
function getKeycloak() {
  if (process.env.NODE_ENV === "production") {
    // @ts-ignore
    return new Keycloak({
      url: "___KEYCLOAK_AUTH_SERVER_URL___",
      realm: "___KEYCLOAK_REALM___",
      clientId: "___KEYCLOAK_RESOURCE___",
    });
  } else {
    let host = "172.17.0.1";
    if (process.env.REACT_APP_HOST != null) {
      host = process.env.REACT_APP_HOST;
    }
    // @ts-ignore
    return new Keycloak({
      url: `http://${host}/auth`,
      realm: "docker-monitor-health-server",
      clientId: "app",
    });
  }
}
/*eslint-enable*/

export const kc = getKeycloak();

kc.init(
  { promiseType: "native", onLoad: "login-required" },
  { loadUserInfo: true }
).then((authenticated: boolean) => {
  if (authenticated) {
    root.render(
      <Provider store={store}>
        <React.StrictMode>
          <App kc={kc} />
        </React.StrictMode>
      </Provider>
    );
  } else {
    kc.login();
  }

  /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["axiosConfig"] }] */
  axios.interceptors.request.use((axiosConfig) =>
    kc
      .updateToken(5)
      .then(() => {
        axiosConfig.headers.Authorization = `Bearer ${kc.token}`;
        return Promise.resolve(axiosConfig);
      })
      .catch(kc.login)
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorkerRegistration.register();

  reportWebVitals();
  subscribeUser();
});
