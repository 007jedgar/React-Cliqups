import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
} from 'react-native';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';
import { generalStyles, formStyle } from '../../stylesheet';
import { Spinner, FootInput, } from '../common';
import {
  Block,
} from '../containers'
import { FooterBtn } from '../buttons';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

class TopCliqs extends Component {
  render() {
    return (
      <View style={generalStyles.container}>
        <Text style={generalStyles.header}>Top100 Page</Text>
        <ScrollView contentContainerStyle={styles.content} style={styles.grid}>
          <Block />
          <Block />
          <Block />
          <Block />
        </ScrollView>
      </View>
    )
  }
}
const styles = ScaledSheet.create({
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
})

export default TopCliqs;
