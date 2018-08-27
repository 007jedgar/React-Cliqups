import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';
import { generalStyles, formStyle } from '../../stylesheet';
import { Spinner, FootInput, } from '../common';
import { SlideNavBar, NavBtn } from '../containers';
import { FooterBtn } from '../buttons';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import Swiper from 'react-native-swiper';

class Slides extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      slideIndex: 0,
      p0: true,
      p1: false,
      p2: false,
    }
  }


  pressed(num) {
    this.setState({ focused: false, slideIndex: num })
  }

  onSignout() {
    firebase.auth().signOut()
  }

  swiped(index) {
    console.log('index', index);
    switch (index) {
      case 0:
        this.setState({ p0: true, p1: false, p2: false })
        break;
      case 1:
        this.setState({ p0: false, p1: true, p2: false })
        break;
      case 2:
        this.setState({ p0: false, p1: false, p2: true })
        break;
      default:
    }
  }

  renderNav() {
    return (
      <Swiper
        style={styles.wrapper2}
        loop={false}
        showsPagination={false}
        showsButtons={false}
        index={this.state.slideIndex}
        onIndexChanged={(index) => this.swiped(index)}
      >
        <TouchableOpacity>
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.text}>Top 100</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.text}>Search</Text>
        </TouchableOpacity>
      </Swiper>
    )
  }

  render() {
    return (
      <View style={generalStyles.darkContainer}>

{/*        <SlideNavBar >
          <NavBtn swipedTo={this.state.p0} focused={this.state.focused} pressed={this.pressed.bind(this, 0)} title="Profile" />
          <NavBtn swipedTo={this.state.p1} focused={this.state.focused} pressed={this.pressed.bind(this, 1)} title="Top 100" />
          <NavBtn swipedTo={this.state.p2} focused={this.state.focused} pressed={this.pressed.bind(this, 2)} title="Search" />
        </SlideNavBar>*/}
        {this.renderNav()}

        <Swiper
          style={styles.wrapper}
          loop={false}
          showsPagination={false}
          showsButtons={false}
          index={this.state.slideIndex}
          onIndexChanged={(index) => this.swiped(index)}
        >
          <View style={styles.slide1}>
            <Image
              source={require('../../../assets/images/darkBackground.jpg')}
              style={generalStyles.backgroundImg}
            />
            <Text style={styles.text}>Hello Profile</Text>
          </View>

          <TouchableOpacity onPress={() => this.onSignout()} style={styles.slide2}>
            <Text style={styles.text}>Top100</Text>
          </TouchableOpacity>

          <View style={styles.slide3}>
            <Text style={styles.text}>And Search</Text>
          </View>
        </Swiper>

      </View>
    )
  }
}

const styles = ScaledSheet.create({
  wrapper: {
    flex: 1,
  },
  wrapper2: {
    height: '60@ms',
    // width: '200@ms',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: '30@ms',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default Slides;
