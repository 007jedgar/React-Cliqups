const functions = require('firebase-functions');
const admin = require('firebas-admin');

////////////////
//                  ALERT TYPES
////////////////

//RECEIVED BY ALL CLIQ MEMBERS
exports.alertNewComment = functions.firestore
.document('cliqs/{cliqId}/posts/{postId}/messages/{messageId}')
.onCreate((snap, context) => {

})

//RECEIVED BY ALL CLIQ MEMBERS
exports.alertNewFollower = functions.firestore
.document('cliqs/{cliqId}/followers/{folowerId}')
.onCreate((snap, context) => {

})

//RECEIVED BY ALL CLIQ MEMBERS
exports.alertNewMember = functions.firestore
.document('cliqs/{cliqId}/members/{memberId}')
.onCreate((snap, context) => {

})

//RECEIVED BY INVITEEE
exports.alertNewInvite = functions.firestore
.document('users/{userId}/invites/{inviteId}')
.onCreate((snap, context) => {

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
      recentlyLikedBy: rlb,
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

})

exports.alertNewTopCliq = functions.firestore
.document('topCliqs/{cliqId}')
.onUpdate((change, context) => {

})

////////////////
//                  CLIQ FUNCTIONS
////////////////
