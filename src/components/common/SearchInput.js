import React, {Component} from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const SearchInput = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {

const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        placeholder={placeholder}
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}

const styles = ScaledSheet.create({
  inputStyle: {
    color: '#A7BED3',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
  },
  labelStyle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#56514f',
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    width: '240@ms',
    flexDirection: 'row',
    alignItems: 'center',
  },
})


export { SearchInput };
