import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';
import { generalStyles, formStyle } from '../../stylesheet';
import { Spinner, FootInput, BackNavBar } from '../common';
import { FooterBtn } from '../buttons';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { ProfileCamera } from '../camera';
import { ImgUpload } from '../../util/Images';
import { CachedImage } from 'react-native-cached-image';
var ImagePicker = require('react-native-image-picker');

class NewCliq extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pic: '',
    }
  }

  choosePic() {
    var options = {
      title: 'Select Avatar',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  renderCliqPic() {
    const imgUrl = "https://firebasestorage.googleapis.com/v0/b/varsityprep-8fce6.appspot.com/o/coach_pics%2Ft9OwHWV2LIX5nozsKUJqqrnqKv32?alt=media&token=5c82f986-5d79-4c48-b927-ef95eb6382f0";

    return (
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <CachedImage
          source={{uri: imgUrl }}
          style={styles.img}
        />
        <TouchableOpacity onPress={() => this.choosePic()} style={styles.camImgContainer}>
          <CachedImage
            source={require('../../../assets/icons/whiteCamera.png')}
            style={styles.camImg}
          />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={generalStyles.darkContainer}>
        <BackNavBar
          title="New Cliq"
        />

        {this.renderCliqPic()}
      </View>
    )
  }
}

const styles = ScaledSheet.create({
  img: {
    flex: 1,
    height: '200@ms',
    opacity: .9,
  },
  camImg: {
    width: '40@ms',
    height: '40@ms',
    backgroundColor: '#898989',
  },
  camImgContainer: {
    position: 'absolute',
    width: '40@ms',
    height: '40@ms',
    backgroundColor: '#898989',
    opacity: .8
  },
})

export default NewCliq;
