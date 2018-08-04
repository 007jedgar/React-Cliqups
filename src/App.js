import React, { Component } from 'react';
import { View, } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import Router from './Router';
// import { VPStatusBar } from './components/containers';

export default class App extends Component {
  render() {
    // var config = {
    //   apiKey: "AIzaSyDLr6LEVLsEqroFTkqC1i7K0tnySIbaujQ",
    //   authDomain: "evidence-f6902.firebaseapp.com",
    //   databaseURL: "https://evidence-f6902.firebaseio.com",
    //   projectId: "evidence-f6902",
    //   storageBucket: "",
    //   messagingSenderId: "920313805971"
    // };
    //
    // firebase.initializeApp(config);


    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
        <Provider store={store}>
          <View style={{flex: 1}}>
            <Router />
          </View>
        </Provider>
    );
  }
}
