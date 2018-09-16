import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CliqueReducer from './CliqueReducer';

export default combineReducers({
  auth: AuthReducer,
  clique: CliqueReducer,
});
