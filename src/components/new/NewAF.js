import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';
import { generalStyles, formStyle } from '../../stylesheet';
import { Spinner, FootInput, } from '../common';
import { FooterBtn } from '../buttons';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

class NewAF extends Component {
  render() {
    return (
      <View style={generalStyles.container}>
        <Text style={generalStyles.header}>New AF Page</Text>
      </View>
    )
  }
}

export default NewAF;
