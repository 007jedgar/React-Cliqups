import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';
import { generalStyles, formStyle } from '../../stylesheet';
import { Spinner, } from '../common';
import { FooterBtn } from '../buttons';
var t = require('tcomb-form-native');
var Form = t.form.Form;
var _ = require('lodash');
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'firebase';

class Welcome extends Component {

  renderFooters() {
    return (
      <View style={styles.footerContainer}>
        <FooterBtn style={{backgroundColor: '#E05B35'}} title="Enter Invite Code"/>
        <FooterBtn style={{backgroundColor: 'dimgrey'}} title="New Account"/>
        <FooterBtn style={{backgroundColor: '#000'}} title="Sign In"/>
      </View>
    )
  }

  render() {
    return (
      <View style={generalStyles.container}>
        <Image
          source={(require('../../../assets/images/_splash.png'))}
          style={styles.img}
          resizeMode="cover"
        />
        {this.renderFooters()}
      </View>
    )
  }
}

const styles = ScaledSheet.create({
  img: {
    opacity: .99,
    position: 'absolute',
    height: '660@vs',
    width: '350@s',
  },
  footerContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
})

export default Welcome;
