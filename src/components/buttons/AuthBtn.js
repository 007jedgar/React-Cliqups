import React from 'react';
import {
  TouchableOpacity,
  Text,
} from 'react-native';
import { themes } from '../../stylesheet';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';

const AuthBtn = ({ pressed, btnTheme, textTheme, title }) => {
  return (
    <TouchableOpacity style={[styles.btn, btnTheme]} onPress={pressed}>
      <Text style={[styles.text, textTheme]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = ScaledSheet.create({
  btn: {
    height: '40@ms',
    width: '300@ms',
    borderColor: 'dimgrey',
    borderRadius: '7@ms',
    borderWidth: '3@ms',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  text: {
    color: 'dimgrey',
    fontSize: '25@ms',
    // fontFamily: 'Lato-Bold',
    margin: '3@ms',
    textAlign: 'center',
    alignSelf: 'center',
  },
})

export { AuthBtn };
