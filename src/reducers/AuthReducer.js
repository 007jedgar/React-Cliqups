import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGIN_USER,
 } from '../actions/types';

const INITAL_STATE = {
  name: '',
  email: '',
  password: '',
  confirmation: '',
  user: null,
  error: '',
  loading: false,
  numOfLessons: 0,
  price: '',
  coach: {},
  lesson: {},
};

export default (state = INITAL_STATE, action) => {

  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true, error: '' }
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITAL_STATE, user: action.payload, };
    case LOGIN_USER_FAILED:
      return { ...state, error: 'Your Credentials Failed :(', password: '', loading: false }
    default:
      return state;
  }
};
