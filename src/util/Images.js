import {
  Platform,
} from 'react-native';
var RNFetchBlob = require ('rn-fetch-blob').default
import firebase from 'react-native-firebase';
import b64 from 'base64-js'

var caseId = 0;
var user = null;
var photoCount = 0;

export const ImgUpload = (url, caseId, user, photoCount) => {
  this.caseId = caseId
  this.user = user
  this.photoCount = photoCount
  return uploadImage(url);
};

//Does all the blobifying work and sends blob to
const uploadImage = (uri, mime = 'application/octet-stream') => {
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;

return new Promise((resolve, reject) => {
  uri = uri.toString()
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
  let uploadBlob = null

  const imageRef = firebase.storage().ref('casePics').child(this.caseId + '/' + this.photoCount)

  fs.readFile(uploadUri, 'base64')
    .then((data) => { //build blob
      return Blob.build(data, { type: `image/jpeg;BASE64` })
    }).then((blob) => { //upload to firebase storage
      uploadBlob = blob
      return imageRef.put(uri, { contentType: 'image/jpeg' })
    }).then(() => { // get download url from storage
      uploadBlob.close()
      return imageRef.getDownloadURL()
    }).then((url) => { // send to function that saves storage download url
      resolve(url) //
    }).catch((error) => {
      reject(error)
    })
  })
}
