import {
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  CREATE_CLIQ,
  CREATE_CLIQ_SUCCESS,
  CREATE_CLIQ_FAILURE,
  CREATE_PROFILE,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAILURE,
  FETCH_CLIQS,
  FETCH_CLIQS_SUCCESS,
  FETCH_CLIQS_FAILURE,
  FETCH_UPLOADS,
  FETCH_UPLOADS_SUCCESS,
  FETCH_UPLOADS_FAILURE,
  SAVE_PROFILE_PIC,
  SAVE_PROFILE_PICE_SUCCESS,
  SAVE_PROFILE_PIC_FAILURE,
  QUERY_CLASSMATES,
  QUERY_CLASSMATES_SUCCESS,
  QUERY_CLASSMATES_FAILURE,
  ADDING_TO_CLIQ,
  ADDED_TO_CLIQ_SUCCESS,
  ADDED_TO_CLIQ_FAILED,
  ADDING_TO_USER,
  ADDED_TO_USER_SUCCESS,
  ADDED_TO_USER_FAILURE,
  SAVE_PROFILE,
  SAVE_PROFILE_SUCCESS,
  SAVE_PROFILE_FAILURE,
  COMMENT,
  COMMENT_SUCCESS,
  COMMENT_FAILURE,
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_SELF,
  FETCH_SELF_FAILED,
 } from '../actions/types';

const INITAL_STATE = {
  location: {},
  loading: false,
  error: '',
  cases: [],
  data: {
    empty: false,
    cliqs: [],
    posts: [],
  },
  selfDocInfo: {
    empty: false,
    self: {},
  },
};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case CREATE_POST:
      return { ...state, loading: true }
    case FETCH_SELF:
      return { ...state, loading: false, selfDocInfo: action.payload }
    case FETCH_SELF_FAILED:
      return { ...state, loading: false }
    default:
      return state;
  }
};
