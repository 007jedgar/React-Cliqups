import {
  COMPLETE_SCHOOLS,
  COMPLETE_SCHOOLS_FAIL,
  COMPLETE_SEARCH,
  COMPLETE_SEARCH_FAIL,
 } from '../actions/types';

const INITAL_STATE = {
  schools: [],
  completeSchoolsErr: {},
  searchResults: [],
  searchErr: {},
};

export default (state = INITAL_STATE, action) => {

  switch (action.type) {
    case COMPLETE_SCHOOLS:
      return { ...state, schools: action.payload }
    case COMPLETE_SCHOOLS_FAIL:
      return { ...state, completeSchoolsErr: action.payload }
    case COMPLETE_SEARCH:
      return { ...state, searchResults: action.payload }
    case COMPLETE_SEARCH_FAIL:
      return { ...state, searchErr: action.payload }
    default:
      return state;
  }
}
