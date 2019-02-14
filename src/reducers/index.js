import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CliqueReducer from './CliqueReducer';
import AlertReducer from './AlertReducer';

export default combineReducers({
  alert: AlertReducer,
  auth: AuthReducer,
  clique: CliqueReducer,
});
