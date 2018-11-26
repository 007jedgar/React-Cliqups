import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import Router from './Router';
import { VPStatusBar } from './components/containers';

export default class App extends Component {
  render() {
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
