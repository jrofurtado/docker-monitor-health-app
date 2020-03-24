import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  keycloak: (keycloak = {}) => keycloak,
  routing: routerReducer,
});
