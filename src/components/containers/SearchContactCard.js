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

class SearchContactCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>Joneaux Wondervosen</Text>
        <Text style={styles.year}>2016</Text>
      </View>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
    margin: '10@ms',
    borderBottomColor: '#393939',
    borderBottomWidth: '2@ms',
  },
  name: {
    fontSize: '20@ms',
    color: '#fff'
  },
  year: {
    fontSize: '18@ms',
    color: '#fff'
  },
})

export {SearchContactCard};
