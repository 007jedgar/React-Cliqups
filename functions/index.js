const functions = require('firebase-functions');
const admin = require('firebas-admin');
const firebase = require('firebase')
////////////////
//                  ALERT TYPES
////////////////

//RECEIVED BY ALL CLIQ MEMBERS
exports.alertNewComment = functions.firestore
.document('cliqs/{cliqId}/posts/{postId}/messages/{messageId}')
.onCreate((snap, context) => {
  let cliqId = context.params.cliqId
  let postId = context.params.postId
  let message = snap.data()
  let alert = {
    info: `${message.sender} commented on a post`,
    hasBeenRead: false,
  }

  return firebase.firestore().collection('cliqs').doc(cliqId)
  .get().then((doc) => {
    let members = doc.data().members

    members.forEach((m) => {
      let id = m.id

      firebase.firestore().collection('users')
      .doc(id).collection('new_comment_alert')
      .doc(postId).collection('alerts')
      .where("hasBeenRead", "==", false).get()
      .then((querySnap) => {
        let unreadMsgs = querySnap.size

        if (unreadMsgs < 1) {
          alert = `${unreadMsgs} unread comments`
        }
        firebase.firestore().collection('users')
        .doc(id).collection('new_comment_alert')
        .doc(postId).collection('alerts').add(alert).then(() => {
          console.log('alerted user of comment')
        }).catch((err) => {
          console.log(err)
        })
      })
    })
  })
})

//RECEIVED BY ALL CLIQ MEMBERS
exports.alertNewFollower = functions.firestore
.document('cliqs/{cliqId}/followers/{folowerId}')
.onCreate((snap, context) => {
  let newFollower = snap.data()
  let cliqId = context.params.cliqId
  let followerId = context.params.followerId
  let alert = {
    hasBeenRead: false,
    info: `${newFollower.name} has followed your cliq`
  }

  firebase.firestore().collection('cliqs').doc(cliqId)
  .collection('followers').get().then((querySnap) => {
    let followerCount = querySnap.size

    if (followerCount < 1) {
      alert.info = `${newFollower.name} and ${followerCount} others have followed your cliq`
    }
    firebase.firestore().collection('cliqs')
    .doc(cliqId).get().then((doc) => {
      let members = doc.data().members

      members.forEach((m) => {
        let id = m.id
        firebase.firestore().collection('users')
        .doc(id).collection('new_follower_alert')
        .doc('cliqId').set(alert).then(() => {
          console.log('new follower alerted')
        }).catch((err) => {
          console.log(err)
        })
      })
    })
  })
})

//RECEIVED BY ALL CLIQ MEMBERS
exports.alertNewMember = functions.firestore
.document('cliqs/{cliqId}/members/{memberId}')
.onCreate((snap, context) => {
  let memberId = context.params.memberId
  let cliqId = context.params.cliqId
  let member = snap.data()

  let alert = {
    hasBeenRead: false,
    info: `${member.name} has joined the cliq`
  }

  return firebase.firestore().collection('cliqs').doc(cliqId)
  .get().then((doc) => {
    let members = doc.data().members

    members.forEach((m) => {
      firebase.firestore().collection('users')
      .doc(m.id).collection('new_member_alert')
      .add(alert).then(() => {
        console.log('new member alerted')
      }).catch((err) => {
        console.log(err)
      })
    })
  })
})

//RECEIVED BY UPLOAD OWNER
exports.alertNewLike = functions.firestore
.document('cliqs/{cliqId}/post/{postId}/likes/{likedBy}')
.onCreate((snap, context) => {
  let cliqId = context.params.contextId
  let postId = context.params.postId
  let likedBy = context.params.likedBy

  return firebase.firestore().collection('cliqs').doc(cliqId)
  .collection('posts').doc(postId).collection('likes')
  .get().then((querySnap) => {
    let likes = querySnap.size
    let rlb = `Liked by ${likedBy.name} and ${likes} others`
    let alert = {
      likes: likes,
      info: rlb,
      hasBeenRead: false,
    }
    firebase.firestore().collection('cliq').doc(cliqId)
    .collection('posts').doc(postId).get().then((doc) => {
      let ownerId = doc.data().ownerId

      firebase.firestore().collection('users')
      .doc(ownerId).collection('like_alerts')
      .doc(cliqId).set(alert).then(() => {
        console.log('alerted user of likes')
      }).catch((err) => {
        console.log(err)
      })
    })
  })
})

//RECEIVED BY UPLOAD OWNER
exports.alertNewTopCliq = functions.firestore
.document('topCliqs/{cliqId}')
.onCreate((snap, context) => {
  let cliqId = context.params.cliqId
  let cliqInfo = snap.data()
  let alert = {
    hasBeenRead: false,
    info: `Your cliq has reached the Top 100!`
  }

  return firebase.firestore().collection('cliqs').doc(cliqId)
  .get().then((doc) => {
    let members = doc.data().members

    members.forEach((m) => {
      let id = m.id
      fireabse.firestore().collection('users')
      .doc(id).collection('top_100_alert')
      .doc(cliqId).set(alert).then(() => {
        console.log('top 100 alerted')
      }).catch((err) => {
        console.log(err)
      })
    })
  })
})

////////////////
//                  CLIQ FUNCTIONS
////////////////

//background function that will allow popular posts to be sorted
//Builds a ledger of the most popular posts in the last 72 hours
//Located under school
exports.rankPosts = functions.firestore
.document('schools/{schoolId}/posts/{postId}/likes/{likedBy}')
.onCreate((snap, context) => {
  let postId = context.params.postId
  let post = snap.data()

  
})
