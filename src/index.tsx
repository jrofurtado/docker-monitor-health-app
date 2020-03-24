import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import * as Keycloak from "keycloak-js";
import axios from "axios";
import App from "./components/App/App";
import rootReducer from "./redux/reducers";

const history = createBrowserHistory();
const middleware = [thunk, routerMiddleware(history)];
const store = createStore(rootReducer, applyMiddleware(...middleware));

function getKeycloak() {
  if (process.env.NODE_ENV === "production") {
    // @ts-ignore
    return new Keycloak("/keycloak.json");
  } else {
    // @ts-ignore
    return new Keycloak("/dev-keycloak.json");
  }
}
let kc = getKeycloak();

kc.init({ promiseType: "native", onLoad: "login-required" }).then(
  (authenticated: boolean) => {
    if (authenticated) {
      store.getState().keycloak = kc;

      ReactDOM.render(
        <Provider store={store}>
          <App />
        </Provider>,
        document.getElementById("root")
      );
    } else {
      console.warn("not authenticated!");
      kc.login();
    }
  }
);

axios.interceptors.request.use(config =>
  kc
    .updateToken(5)
    .then(() => {
      config.headers.Authorization = "Bearer " + kc.token;
      return Promise.resolve(config);
    })
    .catch(kc.login)
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
