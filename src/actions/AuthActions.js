import { Actions } from 'react-native-router-flux';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGIN_USER,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  FETCHED_USER,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  QUERY_BY_PHONE,
  PHONE_QUERY_SUCCESS,
  PHONE_QUERY_FAILURE,
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  CREATE_PROFILE,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAILURE,
 } from './types';
import firebase from 'react-native-firebase';

//used in loginUser
export const loginUser = ( email, password ) => {
  console.log('email', email);
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    try {
      firebase.auth().signInWithEmailAndPassword( email, password )
        .then((user) => {
          loginUserSuccess(dispatch, user)
          // Actions.cases();
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

const searchUserByPhone = (phone) => {
    try {
      var users = []
      firebase.firestore().collection('users').where("phone", "==", phone)
        .get().then((querySnap) => {
          if (querySnap.empty) {
            return users;
          }
          querySnap.forEach((doc) => {
            users.push(doc.data())
            return users;
          })
        })
    } catch(err) {
      return null
    }
}

export const createUser = (userInfo) => {
  const { phone, } = userInfo

  return (dispatch) => {
    dispatch({ type: CREATE_USER })
    try {
      firebase.firestore().collection('users')
      .where("phone", "==", phone).get()
        .then((querySnap) => {
          if (querySnap.emtpy) {
            addUser(dispatch, userInfo)
          }

          querySnap.forEach((doc) => {
            console.log('user', doc.data())
            var id = doc.id
            userInfo = doc.data()
            login(userinfo, id)
          })

        })
    } catch (err) {
      dispatch({ type: CREATE_USER_FAILURE })
    }
  }
}

//
export const createProfile = () => {
  return (dispatch) => {
    try {
      dispatch({ type: CREATE_PROFILE })
      firebase.firestore().collection('users').doc(user.uid)
        .set({
          name: name,
          phone: phone,
        }).then(() => {
          dispatch({ type: CREATE_PROFILE_SUCCESS })
        })
    } catch(err) {
      dispatch({ type: CREATE_PROFILE_FAILURE })
    }
  }
}

const addUser = (dispatch, userInfo) => {
  const { name, user, phone, school, } = userInfo
  try {
    firebase.auth().signInAnonymously().then((user) => {
      firebase.firestore().collection('users').doc(user.uid)
        .set({
          name: name,
          phone: phone,
          school: school,
        }).then(() => {
          dispatch({ type: CREATE_USER_SUCCESS })
        })
    })
  } catch(err) {
    dispatch({ type: CREATE_USER_FAILURE })
  }
}

const login = (userInfo) => {
  const { phone } = userInfo
  return (dispatch) => {
    // firebase.auth()
    console.log('user', userInfo)

  }
}

export const fetchUsers = () => {
  return (dispatch) => {
    console.log('entered')

    dispatch({ type: FETCH_USERS })
    try {
      firebase.firestore().collection('users')
        .onSnapshot((querySnap) => {
          var users = []
          if (querySnap.empty) {
            console.log('empty')
            dispatch({ type: FETCH_USERS, payload: users })
          }

          querySnap.forEach((doc) => {
            let user = doc.data()
            user.id = doc.id
            users.push(user)
          })
          dispatch({ type: FETCH_USERS_SUCCESS, payload: users })
        })
    } catch(err) {
      console.log('err', err)
      dispatch({ type: FETCH_USERS_FAILURE, payload: users })
    }
  }
}

export const instagramAuth = () => {
  return (dispatch) => {
    const user = firebase.auth().currentUser
    try {


    } catch(err) {
      dispatch({ })
    }
  }
}

export const signup = (students) => {
  const { email, password, apn_token, name, school, year, dob, picture } = students
  return (dispatch) => {
    firebase.auth()
    .createUserAndRetrieveDataWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(user)

      firebase.firestore().collection('users')
      .doc(user.uid).set({
        email: email,
        name: name,
        apn_token: apn_token,
        school: school,
        dob: dob,
        year: year,
        picture: picture,
      })
    })
  }
}
