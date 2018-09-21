import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';
import { generalStyles, formStyle } from '../../stylesheet';

class CliqsCard extends Component {
  render() {
    const { children, position } = this.props;
    return (
      <TouchableOpacity style={styles.container}>
        <Text></Text>
      </TouchableOpacity>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
    height: '130@ms',
    borderWidth: '4@ms',
    borderColor: 'green',
  },
})

export { CliqsCard };
