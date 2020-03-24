import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { Router, Route, Switch } from 'react-router-dom';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import axios from 'axios';
import * as Keycloak from 'keycloak-js';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import rootReducer from './modules';

const history = createBrowserHistory();
const middleware = [thunk, routerMiddleware(history)];
const store = createStore(rootReducer, applyMiddleware(...middleware));

let kc = null;
if (process.env.NODE_ENV === 'production') {
  kc = new Keycloak({
    url: process.env.REACT_APP_KEYCLOAK_AUTH_SERVER_URL,
    realm: process.env.REACT_APP_KEYCLOAK_REALM,
    clientId: process.env.REACT_APP_KEYCLOAK_RESOURCE,
  });
} else {
  let myDockerHost = '172.17.0.1';
  if (process.env.REACT_APP_HOST != null) {
    myDockerHost = process.env.REACT_APP_HOST;
  }
  kc = new Keycloak({
    url: `http://${myDockerHost}/auth`,
    realm: 'docker-monitor-health-server',
    clientId: 'app',
  });
}

kc.init({ promiseType: 'native', onLoad: 'login-required' }).then(
  (authenticated) => {
    if (authenticated) {
      store.getState().keycloak = kc;

      ReactDOM.render(
        <Provider store={store}>
          <App />
        </Provider>,
        document.getElementById('root')
      );
    } else {
      kc.login();
    }
  }
);

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
serviceWorker.unregister();
