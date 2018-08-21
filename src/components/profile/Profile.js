import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';
import { generalStyles, formStyle } from '../../stylesheet';
import { Spinner, FootInput, NavBar } from '../common';
import { FooterBtn } from '../buttons';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { ProfileCamera } from '../camera';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showProfile: true,
      showCamera: false,
    }
  }

  toggleCamera() {
    this.setState({
      showCamera: !this.state.showCamera,
      showProfile: !this.state.showProfile,
    })
  }

  renderCamera() {
    if (this.state.showCamera) {
      return (
        <ProfileCamera
          visible={true}
        />
      )
    }
  }

  renderProfile() {
    if (this.state.showProfile) {
      return (
        <View style={generalStyles.darkContainer}>
          <NavBar
            title="Profile"
          />
          <Text style={generalStyles.header}>Profile Page</Text>
          <TouchableOpacity onPress={() => this.toggleCamera()}>
            <Text style={generalStyles.header}>Show camera</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={generalStyles.darkContainer}>
        {this.renderCamera()}
        {this.renderProfile()}
      </View>
    )
  }
}

export default Profile;
