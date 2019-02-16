import React, {Component} from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import {
  ScaledSheet
} from 'react-native-size-matters'

const LineInput = ({ label, value, placeholder, typed, secureTextEntry, text }) => {
const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View>
      <TextInput
        ref={component => { this._textInput = component }}
        value={text}
        placeholder={placeholder}
        placeholderTextColor="dimgrey"
        style={inputStyle}
        onFocus={this.onFocus}
        onChangeText={(text) => typed(text)}
        onEndEditing={this.editingEnded}
        keyboardAppearance="dark"
      />
    </View>
  )
}

const styles = ScaledSheet.create({
  inputStyle: {
    width: '300@ms',
    height: '30@ms',
    fontSize: '19@ms',
    fontFamily: 'Montserrat-Regular',
    margin: '3@ms',
    borderColor: '#FE5F55',
    borderBottomWidth: '2@ms',
    marginTop: '20@ms',
    color: '#fff',
  },
  resultContainer: {
    margin: '10@ms',
    marginTop: '5@ms',
  },
})


export { LineInput };
