import {

} from './types'
import firebase from 'react-native-firesbase'
import moment from 'moment'
var _ - require('lodash')


export const fetchRepliesAlert = () => {
  return (dispatch) => {
    const user = firebase.auth().currentUser
    try {
      firebase.collection('users').doc(user.uid).collection('user_posts')
      .doc('{postId}').collection('post_replies')
      .onSnapshot((querySnapshot) => {
        if (querySnap.empty) {
          dispatch({ })
        }
        let alerts = []
        querySnapshot.forEach((doc) => {
          var alert = doc.data()
          if (alert.seen) {
            alerts.push(alert)
            dispatch({ payload: alerts })
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

export const fetchNewUserAlert = () => {
  return (dispatch) => {
    const user = firebase.auth().currentUser
    try {
      firebase.collection('users').doc(user.uid).collection('cliqs')
      .doc('{cliqId}').collection('post_replies')
      .onSnapshot((querySnapshot) => {
        if (querySnap.empty) {
          dispatch({ })
        }
        let alerts = []
        querySnapshot.forEach((doc) => {
          var alert = doc.data()
          if (alert.seen) {
            alerts.push(alert)
            dispatch({ payload: alerts })
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

export const fetchNewFollowerAlert = (cliqId) => {
  return (dispatch) => {
    const user = firebase.auth().currentUser
    try {
      firebase.collection('cliqs').doc(cliqId).collection('cliq_followers')
      .onSnapshot((querySnapshot) => {
        if (querySnap.empty) {
          dispatch({ })
        }
        let followers = []
        querySnapshot.forEach((doc) => {
          var newb = doc.data()
          if (newb.seen) {
            followers.push(newb)
            alertInfo = {alertType: 'new_follower', followers: followers }
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

export const tagViewedAlerts = () => {
  return (dispatch) => {
    const user = firebase.auth().currentUser
    try {
      const repliesRef = firebase.firstore().collection('users').doc(user.uid)
      .collection('user_posts').doc('{postId}')
      .collection('post_replies')

      repliesref.where("seen", "==", false)
      .get().then((querySnap) => {
        if (querySnap.empty) {
          dispatch({ })
        }

        querySnap.forEach((doc) => {
          repliesRef.update({
            seen: true,
          }).catch((err) => dispatch({ }))
        })
      })
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

export const funcName = () => {
  return (dispatch) => {
    const user = firebase.auth().currentUser
    try {

    } catch(err) {
      dispatch({ })
    }
  }
}
