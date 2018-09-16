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
} from './types';
import firebase from 'react-native-firebase';
var _ = require('lodash')
const db = firebase.firestore();


export const fetchUserCliqs = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_CLIQS })
    try {
      var cliqs = []
      firebase.firestore().collection('users').doc(user.uid)
        .collection('cliques').get().then((querySnap) => {
          if (querySnap.empty) {
            const data = {
              empty: true,
              cliqs: [],
            }
            dispatch({ type: FETCH_CLIQS_SUCCESS, payload: data})
          }
          querySnap.forEach((doc) => {
            cliqs.push(doc.data())
            const data = {
              cliqs,
              empty: false,
            }
            dispatch({ type: FETCH_CLIQS_SUCCESS, payload: data })
          })
        })
    } catch(err) {
      dispatch({ type: FETCH_CLIQS_FAILURE })
    }
  }
}

export const fetchAllCliqs = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_CLIQS })
    try {
      var cliqs = []
      firebase.firestore().collection('cliqeus')
        .get().then((querySnap) => {
          querySnap.forEach((doc) => {
            cliqs.push(doc.data())
            dispatch({ type: FETCH_CLIQS_SUCCESS, payload: cliqs })
          }).then(() => {
            dispatch({ type: FETCH_CLIQS_SUCCESS })
          })
        })
    } catch(err) {
      dispatch({ type: FETCH_CLIQS_FAILURE })
    }
  }
}

export const createClique = (cliqInfo) => {
  return (dispatch) => {
    dispatch({ type: CREATE_CLIQ })
    const { name, imgUrl } = cliqInfo
    try {
      const user = firebase.auth().currentUser
      firebase.firestore().collection('cliques').add({
        name: name,
        cliqPic: igUrl,
        cliqCreator: user.uid,
      }).then(() => {
        dispatch({ type: CREATE_CLIQ_SUCCESS })
      })
    } catch(err) {
      dispatch({ type: CREATE_CLIQ_FAILURE })
    }
  }
}

export const AddToCLiq = (cliqMates) => {
  return (dispatch) => {
    if (cliqMates.length > 0) {
      _.forEach(cliqMates, () => {
        addCollection(dispatch)
        addToUser(dispatch)
      })
    }
  }
}

const addCollection = (dispatch, cliqId, userUid) => {
  dispatch({ type: ADDING_TO_CLIQ })
  try {
    firebase.firestore.collection('cliques').doc(cliqId)
      .collection('cliqMates').add({
        userUid,
      }).then(() => {
        dispatch({ type: ADDED_TO_CLIQ_SUCCESS })
      })
  } catch(err) {
    dispatch({ type: ADDED_TO_CLIQ_FAILED })
  }
}

const addToUser = (dispatch, cliqId, userInfo) => {
  dispatch({ type: ADDING_TO_USER })
  try {
    firebase.firestore.collection('users').doc(userId)
      .collection('cliqs').doc(cliqId).set({
        cliqId,
        userInfo,
      }).then(() => {
        dispatch({ ADDED_TO_USER_SUCCESS })
      })
  } catch(err) {
    dispatch({ type: ADDED_TO_USER_FAILURE })
  }
}

export const fetchUploads = () => {
  return (dispatch) => {
    const user = firebase.auth().currentUser;
    var uploads = []

    try {
      firebase.firestore().collection('users').doc(user.uid)
        .collection('uploads').get().then((querySnap) => {
          if (querySnap.empty) {
            const data = {
              empty: true,
              uploads: [],
            }
            dispatch({ type: FETCH_UPLOADS_SUCCESS, payload: data })
          }

          querySnap.forEach((doc) => {
            var upload = doc.data()
            uploads.push(upload)

            const data = {
              empty: false,
              uploads: uploads,
            }
            dispatch({ type: FETCH_UPLOADS_SUCCESS, payload: data })
          })
        })
    } catch(err) {
      dispatch({ type: FETCH_UPLOADS_FAILURE })
    }
  }
}

export const createPost = (cliqueId, postInfo) => {
  return (dispatch) => {
    try {
      const user = firebase.auth().currentUser
      const time = moment()
      const id = Math.floor(Math.random() * 12)
      const { name, text, imgUrl, } = postInfo

      firebase.firestore().collection('cliques').doc(cliqueId)
        .collection('posts').add({
          creatorUid: user.uid,
          creatorPath: user,
          creatorName: name,
          createdOn: time,
          postImg: imgUrl,
          postId: id,
          text: text,
        }).catch((err) => {
          console.log('err w/posts', err)
        })

      firebase.firestore().collection('users').doc(user.uid)
        .collection('uploads').add({
          creatorUid: user.uid,
          creatorPath: user,
          creatorName: name,
          createdOn: time,
          postImg: imgUrl,
          postId: id,
          text: text,
        }).catch((err) => {
          console.log('err w/uploads', err)
        })
    } catch(err) {
      console.log('err',err)
      dispatch({ type: CREATE_POST_FAILURE })
    }
  }
}

export const saveProfilePic = (imgUrl) => {
  return (dispatch) => {
    dispatch({ type: SAVE_PROFILE_PIC })
    try {
      firebase.firestore().collection('users').doc(user.uid)
        .update({
          profilePic: imgUrl,
        }).then(() => {
          dispatch({ type: SAVE_PROFILE_SUCCESS })
        })
    } catch(err) {
      dispatch({ type: SAVE_PROFILE_PIC_FAILURE })
    }
  }
}

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

export const saveProfile = () => {
  return (dispatch) => {
    dispatch({ type: SAVE_PROFILE })
    try {
      firebase.firestore().collection('users').doc(user.uid)
        .update({
          name: name,
          phone: phone,
        }).then(() => {
          dispatch({ type: SAVE_PROFILE_SUCCESS })
        })
    } catch(err) {
      dispatch({ type: SAVE_PROFILE_FAILURE })
    }
  }
}

export const queryClassmates = (typed) => {
  return (dispatch) => {
    dispatch({ type: QUERY_CLASSMATES })
    classmates = []
    try {
      firebase.firestore().collection('users')
        .where("name", ">", typed)
          .get().then((querySnap) => {
            if (querySnap.empty) {
              const data = {
                empty: true,
                classmates: [],
              }
              dispatch({ type: QUERY_CLASSMATES_SUCCESS, payload: data })
            }
            querySnap.forEach((doc) => {
              classmates.push(doc.data())
              const data = {
                empty: false,
                classmates: classmates,
              }
              dispatch({ type: QUERY_CLASSMATES_SUCCESS, payload: data })
            })
          })
    } catch(err) {
      dispatch({ type: QUERY_CLASSMATES_FAILURE })
    }
  }
}

export const comment = (replyData) => {
  return (dispatch) => {
    dispatch({ type: COMMENT })
    const { text, user, timeStamp, userUid } = replyData
    try {
      firebase.firestore().collection('cliques')
        .doc(cliqId).collection('replies')
          .add({
            text,
            user,
            timeStamp,
            userUid,
          }).then(() => {
            dispatch({ type: COMMENT_SUCCESS })
          })
    } catch(err) {
      dispatch({ type: COMMENT_FAILURE })
    }
  }
}

export const fetchPosts = () => {
  return (dispatch) => {
    var posts = []
    try {
      firebase.firestore().collection('cliqs').doc(cliqId)
        .collection('replies').get().then((querySnap) => {
          if (querySnap.empty) {
            const data = {
              posts: [],
              empty: true,
            }
            dispatch({ type: FETCH_POSTS_SUCCESS, payload: data })
          }

          querySnap.forEach((doc) => {
            posts.push(doc.data())
            const data = {
              posts: posts,
              empty: false,
            }
            dispatch({ FETCH_POSTS_SUCCESS, payload: data })
          })
        })
    } catch(err) {
      dispatch({ type: FETCH_POSTS_FAILURE, payload: data })
    }
  }
}
