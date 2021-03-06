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

class BoilerPlate extends Component {
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

export { BoilerPlate };
