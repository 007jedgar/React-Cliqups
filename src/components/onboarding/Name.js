import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';
import { generalStyles, formStyle } from '../../stylesheet';
import { AuthBtn } from '../buttons';
import { Spinner, } from '../common';
var t = require('tcomb-form-native');
var Form = t.form.Form;
var _ = require('lodash');
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'firebase';

class Name extends Component {
  render() {
    return (
      <View>
        <Text>Hello Name</Text>
      </View>
    )
  }
}

const styles = ScaledSheet.create({

})

export default Name;
