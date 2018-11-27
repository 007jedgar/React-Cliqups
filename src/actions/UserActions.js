import {

} from './types'
import firebase from 'react-native-firesbase'
import moment from 'moment'
var _ - require('lodash')

export const funcName = () => {
  return (dispatch) => {
    const user = firebase.auth().currentUser
    try {

    } catch(err) {
      dispatch({ })
    }
  }
}

export const fetchBlockedUsers = () => {
  return (dispatch) => {
    const user = firebase.auth().currentUser
    try {
      firebase.firestore().collection('users').doc(user.uid)
      .collection('blocked_users').get().then((querySnap) => {
        if (querySnap.empty) {
          dispatch({ })
        }
        let blockedUsers = []
        querySnap.forEach((doc) => {
          var blockedUser = doc.data()
          blockedUsers.push(blockedUser)
          dispatch({ payload: blockedUsers })
        })
      })
    } catch(err) {
      dispatch({ })
    }
  }
}

export const fetchSelf = () => {
  return (dispatch) => {
    const user = firebase.auth().currentUser
    firebase.firestore().collection('users').doc(user.uid)
    .get().then((doc) => {
      if (!doc.exists) {
        const selfDocInfo = { empty: true, self: [] }
        return dispatch({ type: FETCH_SELF, payload: selfDocInfo })
      }

      const selfDocInfo = { empty: false, self: doc.data()}
      dispatch({ type: FETCH_SELF, payload: selfDocInfo })
    })
  }
}

export const blockUser = (userId, userInfo) => {
  return (dispatch) => {
    const user = firebase.auth().currentUser
    try {
      firebase.firestore().collection('users').doc(user.uid)
      .collection('blocked_users').doc(userId).set(userInfo)
      .then(() => {
        dispatch({ })
      }).catch((err) => {
        dispatch({ })
      })
    } catch(err) {
      dispatch({ })
    }
  }
}

export const funcName = () => {
  return (dispatch) => {
    const user = firebase.auth().currentUser
    try {

    } catch(err) {
      dispatch({ })
    }
  }
}
