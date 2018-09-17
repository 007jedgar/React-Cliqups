import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGIN_USER,
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
 } from '../actions/types';

const INITAL_STATE = {
  password: '',
  user: null,
  error: '',
  loading: false,
  users: [],
};

export default (state = INITAL_STATE, action) => {

  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true, error: '' }
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITAL_STATE, user: action.payload, };
    case LOGIN_USER_FAILED:
      return { ...state, error: 'Your Credentials Failed :(', password: '', loading: false }
    case FETCH_USERS:
      return { ...state, }
    case FETCH_USERS_SUCCESS:
      return { ...state, users: action.payload }
    default:
      return state;
  }
};
