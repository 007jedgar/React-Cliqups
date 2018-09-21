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

class BoilerPlate extends Component {
  render() {
    const { children, position } = this.props;
    return (
      <TouchableOpacity style={styles.container}>

      </TouchableOpacity>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
    height: '50@ms',
    flex: .5,
    backgroundColor: '#fff',
  },
  scrollview: {
    flex: 1,
  }
})

export { BoilerPlate };
