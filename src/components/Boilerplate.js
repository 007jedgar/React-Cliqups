import React, { Component} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';

class Classmate extends Component {
  render() {
    return (
      <View style={styles.container}>

      </View>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
     flex: 1,
     backgroundColor: '#fff',
  },
})

export default Classmate;
