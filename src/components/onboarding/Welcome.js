import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';
import { generalStyles, formStyle } from '../../stylesheet';
import { Spinner, FootInput, } from '../common';
import { FooterBtn } from '../buttons';
var t = require('tcomb-form-native');
var Form = t.form.Form;
var _ = require('lodash');
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import VPStatusBar from './VPStatusBar';

class Welcome extends Component {
  constructor(props) {
    super(props)

    this.state = {
      continuable: false,
    }
  }

  onChangeText(text) {
    if (text.length > 8) {
      this.setState({ continuable: true })
    } else {
      this.setState({ continuable: false })
    }
  }

  onContinue() {
    Actions.terms()
  }

  renderFooters() {
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={verticalScale(0)} style={styles.footerContainer} behavior="padding">
        <FootInput
          onChangeText={this.onChangeText.bind(this)}
          pressed={() => this.onContinue()}
          continuable={this.state.continuable}
          returnKeyType="done"
          maxLength={10}
          keyboardType="phone-pad"
          style={{backgroundColor: '#E05B35'}}
          placeholder="Enter Mobile Number"
          keyboardAppearance="dark"
        >
          <Text style={styles.continueStyle}>Continue</Text>
        </FootInput>
      </KeyboardAvoidingView>
    )
  }

  render() {
    return (
      <View style={[generalStyles.container, {justifyContent: 'space-between'}]}>
        <VPStatusBar backgroundColor="#000" barStyle="light-content"/>
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
    // flex: 1,
  },
  footerContainer: {
    // justifyContent: 'flex-end',
    // backgroundColor: 'black',
    // alignContent: 'flex-end',
  },
  continueStyle: {
    fontSize: '22@ms',
    fontWeight: '800',
    color: '#fff',
    textAlign: 'right',
    marginRight: '10@ms',
  },
})

export default Welcome;
