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
} from './types';
import firebase from 'react-native-firebase';
var _ = require('lodash')
const db = firebase.firestore();

//Fetch cliqs that ther user is a part of
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

//Fetch All cliques
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

//On create clique
export const createClique = (cliqInfo) => {
  return (dispatch) => {
    dispatch({ type: CREATE_CLIQ })
    const { name, imgUrl, school, cliqMates, } = cliqInfo
    try {
      const user = firebase.auth().currentUser
      firebase.firestore().collection('cliques').add({
        name: name,
        cliqPic: imgUrl,
        cliqCreator: user.uid,
        school: school,
      }).then((docRef) => {
        var cliqId = docRef.id
        dispatch({ type: CREATE_CLIQ_SUCCESS })
        addUsers(cliqMates, cliqId)
      })
    } catch(err) {
      dispatch({ type: CREATE_CLIQ_FAILURE })
    }
  }
}

//Adding user's ref to cliq
const addUsers = (cliqMates, cliqId) => {
  return (dispatch) => {
    if (cliqMates.length > 0) {
      _.forEach(cliqMates, (cliqMate) => {
        var userUid = cliqMate.uid
        addToCliq(dispatch, cliqId, userUid)
        addToUser(dispatch, cliqId, userUid)
      })
    }
  }
}

//Adding user's id ref to the cliq's collection
const addToCliq = (dispatch, cliqId, userUid) => {
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

//Adding cliq id ref to user's collection
const addToUser = (dispatch, cliqId, userId) => {
  dispatch({ type: ADDING_TO_USER })
  try {
    firebase.firestore.collection('users').doc(userId)
      .collection('cliqs').doc(cliqId).set({
        cliqId,
        userId,
      }).then(() => {
        dispatch({ ADDED_TO_USER_SUCCESS })
      })
  } catch(err) {
    dispatch({ type: ADDED_TO_USER_FAILURE })
  }
}

// Fetch user's cliqs
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

// Create a img post to a cliq
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

// Save user's profile pic
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

export const FindSchools = () => {
  return (dispatch) => {
    //google query based on loncation

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
