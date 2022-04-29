import { combineReducers } from 'redux';
// App Reducers
import application from './applicationReducers';

export default combineReducers({
  keycloak: (keycloak = {}) => keycloak,
  application: application,
});
