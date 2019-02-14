import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  ScaledSheet,
} from 'react-native-size-matters';
import { generalStyles, formStyle } from '../../stylesheet';

class TitleInput extends Component {
  render() {
    const { children, position } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.props.onTyped(text)}
          value={this.props.text}
          secureTextEntry={this.props.secureTextEntry}
          keyboardAppearance={this.props.keyboardType}
          placeholderTextColor="#fff"
          placeholder={this.props.placeholder}
          textContentType={this.props.textContentType}
        />
      </View>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
    margin: '10@ms',
    backgroundColor: 'dimgrey',
    padding: '4@ms',
    marginRight: '20@ms',
    marginLeft: '20@ms',

  },
  inputStyle: {
    fontSize: '24@ms',
    color: '#fff',
  }
})

export { TitleInput };
