import { Actions } from 'react-native-router-flux';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGIN_USER,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  FETCHED_USER,
 } from './types';
import firebase from 'firebase';

//used in loginUser
export const loginUser = ( email, password ) => {
  console.log('email', email);
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    try {
      firebase.auth().signInWithEmailAndPassword( email, password )
        .then((user) => {
          loginUserSuccess(dispatch, user)
          Actions.cases();
        }).catch((err) => {
          console.log('login err', err);
          loginUserFail(dispatch);
        });
    } catch(err) {
      console.log('login err', err);
      loginUserFail(dispatch);
    }
  }
}

const loginUserFail = (dispatch, user) => {
  dispatch({ type: LOGIN_USER_FAILED });
}

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};

//used in manageProfile
export const logoutUser = (dispatch) => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER });

    try {
      firebase.auth().signOut().then(() => {
        logoutUserSuccess(dispatch)
      })
      .catch((err) => {
        console.log(err);
        logoutUserFail(dispatch)
      })
    } catch(err) {
      console.log('logout error', err)
    }
  }
};

const logoutUserFail = (dispatch) => {
  dispatch({ type: LOGOUT_USER_FAIL });
};

const logoutUserSuccess = (dispatch) => {
  dispatch({ type: LOGOUT_USER_SUCCESS });
  Actions.popTo('signin')
};

export const fetchUser = () => {
  return (dispatch) => {
    var user = firebase.auth().currentUser;
    if (user) {
      try {
        firebase.firestore().collection('users').doc(user.uid)
          .get().then((doc) => {
            dispatch({ FETCHED_USER, payload: doc.data()})
          }).catch((err) => console.log('err', err))
      } catch(err) {
        console.log('error fethcing user', err)
      }
    }
  }
}
