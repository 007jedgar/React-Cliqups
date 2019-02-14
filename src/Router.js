import React, { Component } from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import { Text, View, Image } from 'react-native';
import SignIn from './components/onboarding/SignIn';
import InviteCode from './components/onboarding/InviteCode';
import Name from './components/onboarding/Name';
import Number from './components/onboarding/Number';
import ProfilePic from './components/onboarding/ProfilePic';
import School from './components/onboarding/School';
import Welcome from './components/onboarding/Welcome';
import Terms from './components/onboarding/Terms';
import Profile from './components/profile/Profile';
import Settings from './components/settings/Settings';
import Search from './components/search/Search';
import NewAF from './components/new/NewAF';
import MyStuff from './components/myStuff/MyStuff';
import TopCliqs from './components/top/TopCliqs';
import Slide from './components/slide/Slides';
import NewCliq from './components/profile/NewCliq';
import Classmate from './components/search/Classmate';
import CreateCliq from './components/myStuff/CreateCliq';
import Cliq from './components/myStuff/Cliq';

import {
  scale, verticalScale, moderateScale, ScaledSheet,
} from 'react-native-size-matters';

class RouterComponent extends Component {
  render() {
    const tabIcons = ({ focused, title }) => {
      let image;
      switch(title) {
        case 'Profile':
          image = !focused ? require('../assets/icons/greyProfile.png') : require('../assets/icons/profile.png');
          break;
        case 'Search':
          image = !focused ? require('../assets/icons/greySearch.png') : require('../assets/icons/search.png');
          break;
        case 'My Stuff':
          image = !focused ? require('../assets/icons/greyStuff.png') : require('../assets/icons/stuff.png');
          break;
        case 'Cliqs':
          image = !focused ? require('../assets/icons/pyramid.png') : require('../assets/icons/whitePyramid.png');
      };
      return ( <Image source={image} style={styles.image}/> );
    }
    return (
      <Router>
          <Stack key="root" hideNavBar initial>

            <Scene key="welcome"  component={Welcome}  hideNavBar />
            <Scene key="signin" component={SignIn} initial  hideNavBar />
            <Scene key="terms" component={Terms}  hideNavBar />
            <Scene key="name" component={Name}  hideNavBar />
            <Scene key="slides" component={Slide}  hideNavBar />

            <Scene key="cliqups"  tabs showLabel={true} activeTintColor={'dimgrey'} labelStyle={styles.label} tabBarStyle={styles.tabs}>

              <Scene key="cliqs" initial title="Cliqs" icon={tabIcons}>
                <Scene key="topCliqs" component={TopCliqs} hideNavBar />
              </Scene>

              <Scene key="myStuff" title="My Stuff" icon={tabIcons} >
                <Scene key="myStuff" component={MyStuff}  hideNavBar />
                <Scene key="createCliq" component={CreateCliq} hideNavBar />
              </Scene>

              <Scene key="profile"  title="Profile" icon={tabIcons} >
                <Scene key="profile" component={Profile} hideNavBar />
                <Scene key="profilePic" component={ProfilePic} hideNavBar />
                <Scene key="newCliq" component={NewCliq} hideNavBar />
              </Scene>

              <Scene key="search" title="Search" icon={tabIcons} >
                <Scene key="search" component={Search}  hideNavBar />
                <Scene key="classmate" component={Classmate} hideNavBar />
              </Scene>

            </Scene>

          </Stack>
      </Router>
    );
  }
};

const styles = ScaledSheet.create({
  tabs: {
    backgroundColor: '#171717',
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
