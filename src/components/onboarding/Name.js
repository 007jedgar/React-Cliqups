import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';
import { generalStyles, formStyle } from '../../stylesheet';
import { AuthBtn } from '../buttons';
import { Spinner, NavBar, FootInput, } from '../common';
var t = require('tcomb-form-native');
var Form = t.form.Form;
var _ = require('lodash');
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import VPStatusBar from './VPStatusBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


class Name extends Component {
  renderNav() {
    return (
      <View>
        <NavBar
          style={{backgroundColor: 'black', height: moderateScale(40)}}
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

  renderSchoolInput() {
    return (
      <FootInput
        returnKeyType="done"
        maxLength={10}
        style={styles.footerStyle1}
        placeholder="YOUR SCHOOL"
        keyboardAppearance="dark"
      />
    )
  }

  renderGradInput() {
    return (
      <TouchableOpacity style={styles.btnStyle}>
        <Text style={styles.labelStyle}>GRAD YEAR</Text>
      </TouchableOpacity>
    )
  }

  renderBirthDateInput() {
    return (
      <TouchableOpacity style={styles.btnStyle}>
        <Text style={styles.labelStyle}>BIRTH DATE</Text>
      </TouchableOpacity>
    )
  }

  renderNameInput() {
    return (
      <FootInput
        returnKeyType="done"
        maxLength={21}
        style={styles.footerStyle}
        placeholder="FULL NAME?"
        keyboardAppearance="dark"
      />
    )
  }

  // onChangeText={this.onChangeText.bind(this)}
  // pressed={() => this.onContinue()}
  // continuable={this.state.continuable}
  // <Text style={styles.info}>FULL NAME</Text>

  render() {
    return (
      <View style={generalStyles.darkContainer}>
        {this.renderNav()}
          <KeyboardAwareScrollView style={styles.container}>
          <View>
            <Image
             source={require('../../../assets/images/unnamed.png')}
             style={styles.img}
            />
            <View style={styles.info}>
              {this.renderNameInput()}
            </View>
            {this.renderSchoolInput()}
            {this.renderGradInput()}
            {this.renderBirthDateInput()}
            </View>
          </KeyboardAwareScrollView>
      </View>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  img: {
    flexGrow:.5,
    height: '300@ms',
    width: '390@ms',
    alignItems: 'center',
    justifyContent:'center',
  },
  navImg: {
    width: '40@ms',
    height: '40@ms',
  },
  info: {
    position: 'absolute',
    top: '250@ms',
    left: '0@ms',
    right: '0@ms',
    bottom: '80@ms',
    alignItems: 'center',
  },
  footerStyle: {
    backgroundColor: 'rgba(80,80,80, .3)',
    height: '55@ms',
    width: '360@ms',
  },
  footerStyle1: {
    backgroundColor: '#E05B35',
    height: '40@ms',
    width: '360@ms',
  },
  btnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0E4457',
    height: '70@vs',
    paddingLeft: '20@ms',
    justifyContent: 'space-between',
    backgroundColor: '#E05B35',
    height: '40@ms',
    width: '360@ms',
  },
  labelStyle: {
    fontSize: '22@ms',
    fontWeight: '800',
    color: '#fff',
    textAlign: 'left'
  },
})

export default Name;
