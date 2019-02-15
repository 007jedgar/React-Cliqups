import {
  COMPLETE_SCHOOLS,
  COMPLETE_SCHOOLS_FAIL,
  COMPLETE_SEARCH,
  COMPLETE_SEARCH_FAIL
} from './types'
import {
  GOOGLE_PLACES_API_KEY,
  ALGOLIA_APP_ID,
  ALGOLIA_API_KEY,
} from 'react-native-dotenv'
import firebase from 'react-native-firebase'
var algoliasearch = require('algoliasearch')
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
var _ = require('lodash')


export const autoCompleteSchools = (search) => {
  return (dispatch) => {
    let key = GOOGLE_PLACES_API_KEY
    let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&language=en&key=${key}`

    fetch(url).then((resp) => {
      resp.json().then((solved) => {
        console.log(solved)
      })
    })
  }
}

export const autoCompleteSearch = (search, school) => {
  return (dispatch) => {
    let q = [{
      indexName: 'cliqs',
      query: search,
      params: {
        hitsPerPage: 3
      }
    }, {
      indexName: 'users',
      query: search,
      params: {
        hitsPerPage: 3,
      }
    }]

    client.search(queries, function searchCallback(err, content) {
      if (err) return console.log(err);

      console.log(content.results);
    });
  }
}

//
