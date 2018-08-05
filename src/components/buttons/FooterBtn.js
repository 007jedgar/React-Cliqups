import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';


const FooterBtn = ({ title, onPress, style }) => {
  const { containerStyle, textStyle } = styles;
  return (
    <TouchableOpacity activeOpacity={.7} onPress={onPress} style={[containerStyle, style]}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = ScaledSheet.create({
  containerStyle: {
    backgroundColor: '#0E4457',
    flex: .1,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: '26@ms',
    fontFamily: 'Futura-Medium',
    color: '#fff',
    marginLeft: '30@s',
  },
});

export { FooterBtn };
