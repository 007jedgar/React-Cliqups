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
      pic: {uri: 'https://firebasestorage.googleapis.com/v0/b/cliqups-3c8c1.appspot.com/o/profile_pics%2FApp%20Profile.jpeg?alt=media&token=f06d3923-2d22-40e8-9fe9-c4154618e2d0'},
    }
  }

  choosePic() {
    var options = {
      title: 'Select Avatar',
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
        this.setState({
          pic: source
        });
        const user = firebase.auth().currentUser
        const imgRef = "profile_pics"
        ImgUpload(source, user, imgRef).then((url) => {
          firebase.firestore().collection('users').doc(user.uid)
          .update({
            profile_pic: url,
          })
        }).catch((err) => {
          console.log('err', err)
          Alert.alert("There was a problem uploading your photo. Please try again")
        })
      }
    });
  }

  renderCliqPic() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <CachedImage
          source={this.state.pic}
          style={styles.img}
        />
        <Text style={styles.photoTitle}>Add a Cliq Pic</Text>
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
          title="Create"
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
  },
  camImg: {
    width: '40@ms',
    height: '40@ms',
    backgroundColor: '#898989',
  },
  photoTitle: {
    position: 'absolute',
    alignSelf: 'center',
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
