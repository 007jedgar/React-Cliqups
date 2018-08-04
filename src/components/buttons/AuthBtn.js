import React from 'react';
import {
  TouchableOpacity,
  Text,
} from 'react-native';
import { themes } from '../../stylesheet';


const AuthBtn = ({ pressed, btnTheme, textTheme, title }) => {
  return (
    <TouchableOpacity style={btnTheme} onPress={pressed}>
      <Text style={textTheme}>{title}</Text>
    </TouchableOpacity>
  )
}

export { AuthBtn };
