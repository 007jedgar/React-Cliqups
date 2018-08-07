import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';
import { generalStyles, formStyle } from '../../stylesheet';

class SchoolCard extends Component {
  render() {
    const { pressed, school, address } = this.props;
    return (
      <TouchableOpacity activeOpacity={.4} onPress={pressed} style={styles.schoolContainer}>
        <Text style={styles.schoolTitle}>{school}</Text>
        <Text style={styles.address}>{address}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = ScaledSheet.create({
  schoolTitle: {
    fontSize: '22@ms',
    fontWeight: '800',
    color: '#fff',
    textAlign: 'left',
  },
  address: {
    fontSize: '19@ms',
    fontWeight: '700',
    color: '#fff',
    textAlign: 'left'
  },
  schoolContainer: {
    backgroundColor: '#898989',
    paddingLeft: '10@ms',
    paddingTop: '5@ms',
    paddingBottom: '5@ms',
    marginBottom: -1,
  },
})

export {SchoolCard};
