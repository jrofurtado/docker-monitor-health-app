import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
// App Reducers
import application from "./applicationReducers";

export default combineReducers({
  keycloak: (keycloak = {}) => keycloak,
  routing: routerReducer,
  application: application
});
