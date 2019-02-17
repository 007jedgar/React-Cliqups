import React, { Component } from 'react';
import { View, AsyncStorage, Alert } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import Router from './Router';
import { VPStatusBar } from './components/containers';
import firebase from 'react-native-firebase'

export default class App extends Component {
  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners(); //add this line
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission()

    if (enabled) {

    } else {
        this.requestPermission()
    }
  }

  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        this.getToken()
    } catch (error) {
      console.log('permission rejected')
    }
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        this.showAlert(title, body);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

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
