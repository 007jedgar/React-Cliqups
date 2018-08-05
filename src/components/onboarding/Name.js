import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';
import { generalStyles, formStyle } from '../../stylesheet';
import { AuthBtn } from '../buttons';
import { Spinner, NavBar } from '../common';
var t = require('tcomb-form-native');
var Form = t.form.Form;
var _ = require('lodash');
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import VPStatusBar from './VPStatusBar';

class Name extends Component {
  renderNav() {
    return (
      <View>
        <NavBar
          style={{backgroundColor: 'black'}}
          titleViewStyle={{color: '#fff'}}
        >
          <TouchableOpacity onPress={() => Actions.popTo('welcome')}>
           <Image
            source={require('../../../assets/icons/backArrow.png')}
            style={styles.navImg}
           />
         </TouchableOpacity>
        </NavBar>
        <VPStatusBar backgroundColor="black" barStyle="light-content"/>
      </View>
    )
  }

  render() {
    return (
      <View style={generalStyles.darkContainer}>
        {this.renderNav()}
          <Image
           source={require('../../../assets/images/unnamed.png')}
           style={styles.img}
          />
          <Text style={generalStyles.lightText}>Hello Name</Text>
      </View>
    )
  }
}

const styles = ScaledSheet.create({
  img: {
    // position: 'absolute',
    resizeMode: 'repeat',
    height: '200@ms',
    width: '400@s',
  },
  navImg: {
    width: '40@ms',
    height: '40@ms',
  }
})

export default Name;
