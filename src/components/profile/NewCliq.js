import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
  ScrollView,
  TextInput,
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
import Contacts from 'react-native-contacts';


class NewCliq extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pic: require('../../../assets/images/closeupWave.png'),
    }
  }

  componentDidMount() {
    this.fetchContact()
  }

  fetchContact() {
    Contacts.getAll((err, contacts) => {
      if (err) return Alert.alert('There was a problem fetching your contact list');

      console.log('contatcs', contacts)
    })
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
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
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
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <CachedImage
            source={this.state.pic}
            style={styles.img}
          />
          <TouchableOpacity onPress={() => this.choosePic()} style={styles.camImgContainer}>
            <CachedImage
              source={require('../../../assets/icons/whiteCamera.png')}
              style={styles.camImg}
            />
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View>
            <TextInput
              style={styles.cliqNameInput}
              onChangeText={(text) => this.setState({cliqName: text})}
              value={this.state.cliqName}
              placeholder="Cliq Name"
              autocorrect={false}
              placeholderTextColor='#fff'
            />
          </View>
        </ScrollView>
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
  camImgContainer: {
    position: 'absolute',
    width: '40@ms',
    height: '40@ms',
    backgroundColor: '#898989',
    opacity: .8
  },
  cliqNameInput: {
    height: '40@ms',
    flex: 1,
    color: '#fff',
    fontFamily: 'Lato-Bold',
    fontSize: '24@ms',
  },
  inputContainer: {
    flexDirection: 'row',
    flex: 1,
  },
})

export default NewCliq;
