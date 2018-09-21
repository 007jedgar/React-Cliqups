import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';
import { generalStyles, formStyle } from '../../stylesheet';
import { Spinner, FootInput, NavBar } from '../common';
import { FooterBtn } from '../buttons';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { ProfileCamera } from '../camera';
import { ImgUpload } from '../../util/Images';

class NewCliq extends Component {
  render() {
    return (
      <View style={generalStyles.darkContainer}>
        <NavBar
          title="New Cliq"
        />
        <Text>Create a New Cliq</Text>
      </View>
    )
  }
}

const styles = ScaledSheet.create({

})

export default NewCliq;
