import {
  AUTO_COMPLETE,
  ADDRESS_FAIL,
  ADDRESS_SUCCESS,
  CASE_ADDED,
  CASE_SUBMITTED,
  CASE_CANCELLED,
  CASES_FETCHED,
} from './types';
import firebase from 'firebase';
import 'firebase/firestore';

export const autoComplete = () => {
  console.log('entered auto c');
    return (dispatch) => {
      dispatch({ type: AUTO_COMPLETE })
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('position', position)
        reverseGeocode(position, dispatch);
      });
  }
}

const reverseGeocode = (position, dispatch) => {
  const apiKey = '764919a2927f42a0876cd67306acaa0d';
  const lat = position.coords.latitude
  const long = position.coords.longitude
  console.log('lat, long', lat, long);
  var url = `https://geoservices.tamu.edu/Services/ReverseGeocoding/WebService/v04_01/Rest/?lat=${lat}&lon=${long}&apikey=${apiKey}&format=json&notStore=true&version=4.10`

  try {
    fetch(url, {
      method: 'GET',
    }).then((response) => {
      response.json().then((solved) => {
        console.log('Street Addresses', solved.StreetAddresses[0])
        location = solved.StreetAddresses[0]
        dispatch({ type: ADDRESS_SUCCESS, payload: location })
      })
    }).catch((err) => {
      console.log('err', err);
      dispatch({ type: ADDRESS_FAIL })
    })
  } catch(err) {
    console.log('autocomplete error', err)
  }
}

const deblobify = (blob) => {
  return (dispatch) => {
    //blob ->
    //fb storage ->
    //view img >---<
  }
}

export const addCase = (caseInfo) => {
  console.log('added case', caseInfo)
  return (dispatch) => {
    const { caseId, location, position, officerId, caseDate, caseFormattedDate, picture, caseNum } = caseInfo;
    var photo = picture == ''? '': picture;
    const firestore = firebase.firestore()
    const settings = {timestampsInSnapshots: true}
    firestore.settings(settings);
    try {
      const officerUid = firebase.auth().currentUser.uid;
      firebase.firestore().collection('cases').doc(caseId).set({
        position: position,
        officerId: officerId,
        officerUid: officerUid,
        caseId: caseId,
        caseDate: caseDate,
        caseFormattedDate: caseFormattedDate,
        caseSubmitted: false,
      }).then(() => {
        dispatch({ type: CASE_ADDED })
      })
    } catch(err) {
      console.log('error', err);
    }
  }
}

export const submitCase = (caseInfo) => {
  console.log('case Info', caseInfo);
  return (dispatch) => {
    const {
      caseId, location, position, officerId,
      caseDate, caseFormattedDate, caseNum, incidentType,
      additionalInfo,
    } = caseInfo;
    const _position = position == undefined? '': position;
    const _location = location == typeof(WorkerLocation)? '': location;

    const firestore = firebase.firestore()
    const settings = {timestampsInSnapshots: true}
    firestore.settings(settings);
    try {
      firebase.firestore().collection('cases').doc(caseId).update({
        incidentType: incidentType,
        additionalInfo: additionalInfo,
        position: _position,
        officerId: officerId,
        caseId: caseId,
        caseDate: caseDate,
        caseFormattedDate: caseFormattedDate,
        caseSubmitted: true,
        timeSubmitted: new Date(),
      }).then(() => {
        dispatch({ type: CASE_SUBMITTED })
      }).catch((err) => console.log('err', err))
    } catch(err) {
      console.log('err', err);
    }
  }
}

export const fetchCases = (user) => {
  return (dispatch) => {
    var cases = [];
    const firestore = firebase.firestore()
    const settings = {timestampsInSnapshots: true}
    firestore.settings(settings);
    try {
      const user = firebase.auth().currentUser;
      firebase.firestore().collection('cases')
        .where("officerUid", "==", user.uid)
          .get().then((querySnap) => {
            querySnap.forEach((doc) => {
              cases.push(doc)
              dispatch({ type: CASES_FETCHED, payload: cases })
            })
          }).catch((err) => console.log('err fetching case', err))
    } catch(err) {
      console.log('err', err)
    }
  }
}

export const cancelCase = (caseInfo) => {
  return (dispatch) => {
    const { caseId } = caseInfo;
    try {
      firebase.firestore().collection('cases').doc(caseId)
        .delete().then(() => {
          dispatch({ type: CASE_CANCELLED })
        })
    } catch(err) {
      console.log('err')
    }
  }
}
