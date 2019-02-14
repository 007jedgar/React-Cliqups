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

class AlertCard extends Component {
  render() {
    const { alertType, alertImg, message } = this.props;
    return (
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={alertImg}
        />
        <View>
          <Text style={styles.alertTitle}>{alertType}</Text>
          <Text style={styles.alertMessage}>{message}</Text>
        </View>
      </View>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
    height: '50@ms',
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  scrollview: {
    flex: 1,
  },
  img: {
    width: '50@ms',
    height: '50@ms',
  },
  alertMessage: {
    fontSize: '20@ms',
    color: '#fff',
    fontFamily: 'OpenSans-Regular',
  },
  alertTitle: {
    fontSize: '18@ms',
    color: '#fff',
    fontFamily: 'OpenSans-Regular',
  },
})

export { AlertCard };
