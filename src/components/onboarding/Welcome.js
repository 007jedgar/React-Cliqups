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
    //onChangeText={(text) => this.onChange(text)}
  }

  renderFooters() {
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={verticalScale(20)} style={styles.footerContainer} behavior="padding">
        <FootInput
          onChangeText={this.onChangeText.bind(this)}
          pressed={() => this.onContinue()}
          continuable={this.state.continuable}
          returnKeyType="done"
          maxLength={10}
          keyboardType="phone-pad"
          style={{backgroundColor: '#E05B35'}}
          placeholder="Enter Mobile Number"
        >
          <Text style={styles.continueStyle}>Continue</Text>
        </FootInput>
      </KeyboardAvoidingView>
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
  continueStyle: {
    fontSize: '22@ms',
    fontWeight: '800',
    color: '#fff',
    textAlign: 'right',
    marginLeft: '10@ms',
    // align
  },
})

export default Welcome;
