import React, { Component } from 'react';
import { View, } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import Router from './Router';
import {VPStatusBar} from './components/containers';

export default class App extends Component {
  render() {
    var config = {
      apiKey: "AIzaSyA2x_lWl51uawAuIHrVWGFtYceIzw6DOvQ",
      authDomain: "cliqups-3c8c1.firebaseapp.com",
      databaseURL: "https://cliqups-3c8c1.firebaseio.com",
      projectId: "cliqups-3c8c1",
      storageBucket: "",
      messagingSenderId: "367061293141"
    };
    firebase.initializeApp(config);


    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
        <Provider store={store}>
          <View style={{flex: 1}}>
            <VPStatusBar backgroundColor="black" barStyle="light-content"/>
            <Router />
          </View>
        </Provider>
    );
  }
}
