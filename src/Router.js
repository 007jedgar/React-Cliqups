import React, { Component } from 'react';
import { Router, Scene, Actions, Stack, Modal, } from 'react-native-router-flux';
import { Text, View, Image } from 'react-native';
import SignIn from './components/views/SignIn';
import {
  scale,
  verticalScale,
  moderateScale,
  ScaledSheet,
} from 'react-native-size-matters';

class RouterComponent extends Component {
  render() {

    // const tabIcons = ({ focused, title }) => {
    //   let image;
    //   switch(title) {
    //     case 'Cases':
    //       image = !focused ? require('../assets/icons/greyCase.png') : require('../assets/icons/whiteCase.png');
    //       break;
    //     case 'Profile':
    //       image = !focused ? require('../assets/icons/greyContact.png') : require('../assets/icons/whiteContact.png');
    //       break;
    //   };
    //
    //   return ( <Image source={image} style={styles.image}/> );
    // }

    return (
      <Router>
          <Stack key="root" hideNavBar initial>
            <Scene key="signin" component={SignIn} initial hideNavBar />
          </Stack>
      </Router>
    );
  }
};

const styles = ScaledSheet.create({
  tabs: {
    backgroundColor: '#0E4457',
    borderTopWidth: 2,
  },
  image: {
    width: '28@ms',
    height: '28@ms',
  },
  label: {
    fontSize: '12@ms',
    fontFamily: 'AvenirNext-Medium',
    color: '#fff',
  },
})

export default RouterComponent;
