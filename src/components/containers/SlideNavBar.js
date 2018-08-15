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
import { FooterBtn } from '../buttons';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

class SlideNavBar extends Component {
  render() {
    const { children, position } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView showsHorizontalScrollIndicator={false} style={styles.scrollview} horizontal>
          {children}
        </ScrollView>
      </View>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
    height: '50@ms',
    backgroundColor: '#fff',
  },
  scrollview: {
    flex: 1,
  }
})

export { SlideNavBar };
