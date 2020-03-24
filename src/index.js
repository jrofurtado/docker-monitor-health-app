import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {Router, Route, Switch} from "react-router-dom";
import {routerMiddleware} from "react-router-redux";
import thunk from "redux-thunk";
import {createBrowserHistory} from 'history';
import './index.css';
import * as serviceWorker from './serviceWorker';
import * as Keycloak from 'keycloak-js'
import axios from "axios";
import App from './App';
import rootReducer from "./modules";

const history = createBrowserHistory();
const middleware = [
  thunk,
  routerMiddleware(history),
]
const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
)
let kc = null
if (process.env.NODE_ENV === 'production') {
  kc = new Keycloak('/keycloak.json');
} else {
  kc = new Keycloak('/dev-keycloak.json');
}
kc.init({promiseType: 'native', onLoad: 'login-required'}).then(authenticated => {
  if (authenticated) {
    store.getState().keycloak = kc;
    ReactDOM.render(<App />, document.getElementById("root"));
  } else {
    console.warn("not authenticated!");
    kc.login();
  }
})
axios.interceptors.request.use(config => (
  kc.updateToken(5).then(() => {
    config.headers.Authorization = 'Bearer ' + kc.token;
    return Promise.resolve(config)
  }).catch(kc.login)
))

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
async function demo() {
  await sleep(2000)
  axios.get('/api/apps').then(function (response) {
    console.log(response.data)
    console.log(response.status)
  })
}
demo()
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();