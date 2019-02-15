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
import {
  Spinner,
  FootInput,
  NavBar,
 } from '../common';
import {
  Block,
} from '../containers'
import { FooterBtn, CreateBtn } from '../buttons';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

class TopCliqs extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: 'Top 100'
    }
  }
  render() {
    return (
      <View style={generalStyles.container}>
        <NavBar title={this.state.title} />
        <ScrollView contentContainerStyle={styles.content} style={styles.grid}>
          <Block />
          <Block />
          <Block />
          <Block />
        </ScrollView>
        <CreateBtn />
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
