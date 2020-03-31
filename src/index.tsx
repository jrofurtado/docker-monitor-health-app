import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import * as serviceWorker from './serviceWorker';
import * as Keycloak from 'keycloak-js';
import axios from 'axios';
import App from './components/App/App';
import rootReducer from './redux/reducers';

const middleware = [thunk];
const store = createStore(rootReducer, applyMiddleware(...middleware));

/*eslint-disable*/
function getKeycloak() {
  if (process.env.NODE_ENV === 'production') {
    // @ts-ignore
    return new Keycloak({
      url: process.env.REACT_APP_KEYCLOAK_AUTH_SERVER_URL,
      realm: process.env.REACT_APP_KEYCLOAK_REALM,
      clientId: process.env.REACT_APP_KEYCLOAK_RESOURCE,
    });
  } else {
    let host = '172.17.0.1';
    if (process.env.REACT_APP_HOST != null) {
      host = process.env.REACT_APP_HOST;
    }
    // @ts-ignore
    return new Keycloak({
      url: `http://${host}/auth`,
      realm: 'docker-monitor-health-server',
      clientId: 'app',
    });
  }
}
/*eslint-enable*/

const kc = getKeycloak();

kc.init({ promiseType: 'native', onLoad: 'login-required' }).then(
  (authenticated: boolean) => {
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
