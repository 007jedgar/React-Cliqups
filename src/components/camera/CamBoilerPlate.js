import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Alert,
  Modal,
} from 'react-native';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';
import { generalStyles, formStyle } from '../../stylesheet';
import { Spinner, FootInput, NavBar } from '../common';
import firebase from 'react-native-firebase';
import { RNCamera, FaceDetector } from 'react-native-camera';

class ProfileCamera extends Component {

  toggleCamera() {
    this.props.closeCamera();
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      const caseId = this.state.caseNum
      this.props.sendImg(data, caseId);
    }
  }

  renderNav() {
    return (
      <NavBar
        title="Photo"
      />
    )
  }

  renderLibrary() {
    if (this.state.showLib) {
      return (
        <View>
          <Text>Library</Text>
        </View>
      )
    }
  }

  renderCamera() {
    if (this.state.showCamera) {
      return (
        <View style={styles.container}>
          {this.renderNav()}
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={this.state.flashStatus}
            permissionDialogTitle={'Camera Permission'}
            permissionDialogMessage={"We need your permission to use your phone's camera"}
          />
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={this.takePicture.bind(this)}
              style={styles.capture}
            >
              <Text style={{fontSize: 14}}>  </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  render() {
    const { visible } = this.props;
    return (
      <Modal
        visible={visible}
        animationType="slide"
        transparent={false}
      >
      {this.renderNav()}
      {this.renderCamera()}
      </Modal>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
  },
  capture: {
    backgroundColor: '#fff',
    borderRadius: '30@ms',
    borderWidth: '7@ms',
    borderColor: 'dimgrey',
    width: '55@ms',
    height: '55@ms',
    alignSelf: 'center',
    marginLeft: '73@s',
    marginBottom: '15@ms',
  },
})

export {ProfileCamera};
