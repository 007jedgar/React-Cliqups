import {
  FETCH_COMMENT_ALERT,
  FETCH_FOLLOWER_ALERT,
  FETCH_INVITE_ALERT,
  FETCH_LIKE_ALERT,
  FETCH_MEMBER_ALERT,
  FETCH_TOP_CLIQ_ALERT,
  FETCH_ALERT_ERROR,
  ALERT_ERROR,
  ALERT_HANDLE,
  INVITE_USER,
  INVITE_USER_FAIL,
} from './types'
import firebase from 'react-native-firesbase'
import moment from 'moment'
var _ - require('lodash')


export const fetchMessageAlerts = () => {
  return (dispatch) => {
    const user = firebase.auth().currentUser
    try {
      firebase.firestore().collection('users')
      .doc(user.uid).get().then((doc) => {
        let cliqs = doc.data().cliq
        cliqs.forEach((c) => {
          let id = c.id

          firebase.firestore().collection('users')
          .doc(user.uid).collection('new_comment_alert')
          .doc(cliqId).collection('messages')
          .where("hasBeenRead", "==", false)
          .onSnapshot((querySnapshot) => {
            if (querySnap.empty) {
              dispatch({ type: FETCH_COMMENT_ALERT, payload: {} })
            }
            let alerts = []
            querySnapshot.forEach((doc) => {
              var alert = doc.data()
              if (alert.seen) {
                alerts.push(alert)
                dispatch({ type: FETCH_COMMENT_ALERT, payload: alerts })
              }
            })
          }, (err) => {
            dispatch({ type: FETCH_ALERT_ERROR, payload: err })
          })
        })
      })
    } catch(err) {
      dispatch({ type: FETCH_ALERT_ERROR, payload: err })
    }
  }
}

export const commentSeen = (alertId) => {
  return (dispatch) => {
    const user = firebase.auth().currentUser

    try {
      firebase.firestore().collection('users')
      .doc(user.uid).collection('new_follower_alerts')
      .doc(alertId).update({
        hasBeenRead: true,
      }).catch((err) => {
        dispatch({ type: ALERT_ERROR, payload: err })
      }).then(() => {
        dispatch({ type: ALERT_HANDLED })
      })
    } catch(err) {
      dispatch({ type: FETCH_ALERT_ERROR, payload: err })
    }
  }
}

export const fetchLikeAlerts = () => {
  return (dispatch) => {
    const user = firebase.auth().currentUser
    try {
      firebase.collection('users').doc(user.uid)
      .collection('like_alerts')
      .where("hasBeenRead", "==", )
      .onSnapshot((querySnapshot) => {
        if (querySnap.empty) {
          dispatch({ tpye: FETCH_LIKE_ALERT, paylaod: [] })
        }
        let alerts = []
        querySnapshot.forEach((doc) => {
          var alert = doc.data()
          if (alert.seen) {
            alerts.push(alert)
            dispatch({ type: FETCH_LIKE_ALERT, payload: alerts })
          }
        })
      }, (err) => {
        dispatch({ type: FETCH_ALERT_ERROR, payload: err })
      })
    } catch(err) {
      dispatch({ type: FETCH_ALERT_ERROR, payload: err })
    }
  }
}

export const fetchNewFollowerAlert = (cliqId) => {
  return (dispatch) => {
    const user = firebase.auth().currentUser
    try {
      firebase.collection('users').doc(user.uid)
      .collection('new_follower_alerts')
      .onSnapshot((querySnapshot) => {
        if (querySnap.empty) {
          dispatch({ type: FETCH_FOLLOWER_ALERT, payload: [] })
        }

        let followers = []
        querySnapshot.forEach((doc) => {
          var newb = doc.data()
          if (newb.seen) {
            followers.push(newb)
            alertInfo = {alertType: 'new_follower', followers: followers }
            dispatch({ type: FETCH_FOLLOWER_ALERT, payload: alertInfo })
          }
        })
      }, (err) => {
        dispatch({ type: FETCH_ALERT_ERROR, payload: err })
      })
    } catch(err) {
      dispatch({ type: FETCH_ALERT_ERROR, payload: err })
    }
  }
}

export const newFollowerSeen = (alertId) => {
  return (dispatch) => {
    const user = firebase.auth().currentUser

    try {
      firebase.firestore().collection('users')
      .doc(user.uid).collection('new_follower_alerts')
      .doc(alertId).update({
        hasBeenRead: true,
      }).catch((err) => {
        dispatch({ type: ALERT_ERROR, payload: err })
      }).then(() => {
        dispatch({ type: ALERT_HANDLED })
      })
    } catch(err) {
      dispatch({ type: FETCH_ALERT_ERROR, payload: err })
    }
  }
}

export const fetchUploadAlert = (cliqId) => {
  return (dispatch) => {
    const user = firebase.auth().currentUser
    try {
      firebase.collection('cliqs').doc(cliqId).collection('posts')
      .onSnapshot((querySnapshot) => {
        if (querySnap.empty) {
          dispatch({ })
        }
        let newps = []
        querySnapshot.forEach((doc) => {
          var newp = doc.data()
          if (newp.seen) {
            newps.push(newp)
            alertInfo = {alertType: 'new_post', newPosts: newps }
            dispatch({ payload: alertInfo })
          }
        })
      }, (err) => {
        dispatch({ })
      })
    } catch(err) {
      dispatch({ })
    }
  }
}

export const inviteNewMember = (invitee, inviter, cliqInfo) => {
  return (dispatch) => {
    const { cliqId, cliqName } = cliqInfo
    const user = firebase.auth().currentUser
    let info = `You've been invited to join ${cliqName}`

    try {
      firebase.firestore().collection('users')
      .doc(invitee).collection('invite_alerts')
      .add({
        hasBeenRead: false,
        invitedBy: inviter,
        info: info,
        cliq: cliqId,
        cliqName: cliqName
      }).catch((err) => {
        dispatch({ type: INVITE_USER_FAIL, payload: err })
      }).then(() => {
        dispatch({ type: INVITE_USER })
      })
    } catch(err) {
      dispatch({ type: INVITE_USER_FAIL, payload: err })
    }
  }
}

export const joinCliq = (cliqInfo) => {
  return (dispatch) => {
    const { cliqId } = cliqInfo
    const user = firebase.auth().currentUser

    try {
      firebase.firestore().collection('user')
      .doc(invitee).collection('invite_alerts')
      .add({
        hasBeenRead: false,
        info: info,
        cliq: cliqId,
      })
    } catch(err) {
      dispatch({ })
    }
  }
}

export const alertRead = (ref) => {
  try {
    ref.update({
      hasBeenRead: true
    }).catch((err) => {
      dispatch({ type: ALERT_ERROR, payload: err })
    }).then(() => {
      dispatch({ type: ALERT_HANDLED })
    })
  } catch(err) {
    dispatch({ type: ALERT_ERROR, payload: err })
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
