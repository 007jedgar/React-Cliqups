import {
  FETCH_COMMENT_ALERT,
  FETCH_FOLLOWER_ALERT,
  FETCH_INVITE_ALERT,
  FETCH_LIKE_ALERT,
  FETCH_MEMBER_ALERT,
  FETCH_TOP_CLIQ_ALERT,
  FETCH_ALERT_ERROR,
 } from '../actions/types';

const INITAL_STATE = {
  alerts: [],
  alertError: '',
};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COMMENT_ALERT:
      return { ...state, alerts: action.payload }
    case FETCH_FOLLOWER_ALERT:
      return { ...state, alerts: action.payload }
    case FETCH_INVITE_ALERT:
      return { ...state, alerts: action.payload }
    case FETCH_LIKE_ALERT:
      return { ...state, alerts: action.payload }
    case FETCH_MEMBER_ALERT:
      return { ...state, alerts: action.payload }
    case FETCH_TOP_CLIQ_ALERT:
      return { ...state, alerts: action.payload }
    case FETCH_ALERT_ERROR:
      return { ...state, alerts: action.payload }
    default:
      return state;
  }
}
