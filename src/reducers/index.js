import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CaseReducer from './CaseReducer';

export default combineReducers({
  auth: AuthReducer,
  case: CaseReducer,
});
