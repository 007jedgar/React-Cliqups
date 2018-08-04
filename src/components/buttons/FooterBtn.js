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
    <TouchableOpacity onPress={onPress} style={[containerStyle, style]}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = ScaledSheet.create({
  containerStyle: {
    backgroundColor: '#0E4457',
    flex: .13,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: '26@ms',
    fontFamily: 'AvenirNext-Medium',
    alignSelf: 'center',
    color: '#fff',
    marginLeft: '30@s',
    marginRight: '30@s',
  },
});

export { FooterBtn };
