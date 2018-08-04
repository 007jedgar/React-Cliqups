import {
  AUTO_COMPLETE,
  ADDRESS_FAIL,
  ADDRESS_SUCCESS,
  CASES_FETCHED,
 } from '../actions/types';

const INITAL_STATE = {
  location: {},
  loading: false,
  error: '',
  cases: [],
};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case AUTO_COMPLETE:
      return { ...state, loading: true }
    case ADDRESS_SUCCESS:
      console.log('location reducer', action.payload);
      return { ...state, loading: false, location: action.payload}
    case ADDRESS_FAIL:
      return { ...state, loading: false, error: 'Make sure your location services are enabled' }
    case CASES_FETCHED:
      return { ...state, cases: action.payload, loading: false, }
    default:
      return state;
  }
};
