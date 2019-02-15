import {
  FETCH_SELF,
  FETCH_SELF_FAILED,
  FETCH_BLOCKED_USERS,
  FETCH_BLOCKED_ERROR,
  BLOCK_USER,
  BLOCK_USER_ERROR,
  REPORT_USER,
  REPORT_ERROR,
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
          dispatch({ type: FETCH_BLOCKED_USERS, payload: [] })
        }
        let blockedUsers = []
        querySnap.forEach((doc) => {
          var blockedUser = doc.data()
          blockedUsers.push(blockedUser)
          dispatch({ type: FETCH_BLOCKED_USERS, payload: blockedUsers })
        })
      })
    } catch(err) {
      dispatch({ type: FETCH_BLOCKED_ERROR })
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

export const reportUser = (reportReason, userReportted, details) => {
  return (dispatch) => {
    const user = firebase.auth().currentUser
    try {
      firebase.firestore().collection('reports')
      .add({
        user: userReportted,
        reason: reportReason,
        details: details,
      }).then(() => {
        dispatch({ type: REPORT_USER })
      }).catch((err) => {
        dispatch({ type: REPORT_ERROR })
      })
    } catch(err) {
      dispatch({ type: REPORT_ERROR })
    }
  }
}

export const blockUser = (blockedUser, reason) => {
  return (dispatch) => {
    const user = firebase.auth().currentUser
    const { name, id, } = blockedUser

    try {
      firebase.firestore().collection('users')
      .doc(blockedUser.id).collection('blocked_by')
      .add({
        id: user.uid,
      }).catch((err) => {
        dispatch({ type: BLOCK_USER_ERROR })
      })

      firebase.firestore().collection('users')
      .doc(user.uid).collection('blocked_users')
      .add({
        name: blockedUser.name,
        id: blockedUser.id,
      }).then(() => {
        dispatch({ type: BLOCK_USER })
      }).catch((err) => {
        dispatch({ type: BLOCK_USER_ERROR })
      })
    } catch(err) {
      dispatch({ type: BLOCK_USER_ERROR })
    }
  }
}
