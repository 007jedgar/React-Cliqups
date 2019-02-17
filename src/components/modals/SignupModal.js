import React, {Component} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
} from 'react-native'
import {
  moderateScale, scale, verticalScale, ScaledSheet,
} from 'react-native-size-matters'
import { NavBar, LineInput, Spinner } from '../common';
import {
  AutoCompleteInput,
} from '../containers'
import { CachedImage } from 'react-native-cached-image';
import {
  ImgUpload,
} from '../../util/Images'
import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view'
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase'
var _ = require('lodash')

class SignupModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profile: require('../../../assets/icons/profile.png'),
      profileText: 'Add a profile Pic',
      year: '2019',
      age: '2132312312',
      school: 'Kingwood High School',
      password: 'password',
      email: '007j.edgar@gmail.com',
      name: 'Jonathan Edgar',
      profileUrl: '',
    }
  }

  componentDidMount() {
    this.getToken()
  }

  async getToken() {
    fcmToken = await firebase.messaging().getToken()

    try {
      fcmToken = await firebase.messaging().getToken()

      this.setState({ fcmToken: fcmToken })
    } catch(err) {
      console.log(err)
    }
  }

  onSignupPressed = () => {
    let student = {
      apn_token: this.state.fcmToken,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      school: this.state.school,
      year: this.state.year,
      dob: this.state.age,
      picture: this.state.profileUrl,
    }
    let empty = false
    _.forEach(student, (s) => {
      if (s === '' || s === undefined) {
        this.alertEmpty('a')
        empty = true
      }
    })

    if (!empty) {
      this.props.signup(student)
      this.xOut()
    }
  }

  onHandlePicture = () => {
    const options = {
      title: 'Select Profile Pic',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        uploadingStatus: '',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({
          profile: source,
          profileText: '',
          imageChanged: true,
          uploadingStatus: 'pending'
        })
        ImgUpload(response.uri, null, 'profile_pic' )
        .then((url) => {
          console.log(url)
          this.setState({
            profileUrl: url,
            uploadingStatus: 'done'
          })
        }).catch((err) => {
          console.log(err)
          this.setState({
            profileUrl: url,
            uploadingStatus: 'error'
          })
        })
      }
    })
  }

  xOut() {
    this.props.closeModal()
  }

  alertEmpty(field) {
    let body = 'You left a field empty'
    Alert.alert(
      'Oops...', body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  renderLoading( ) {
    if (this.state.uploadingStatus === 'pending') {
      return (
        <View style={{justifyContent: 'center'}}>
          <Spinner />
        </View>
      )
    } else if (this.state.uploadingStatus === 'done') {
      return (
        <View style={{justifyContent: 'center'}}>
          <Image
            source={require('../../../assets/icons/done.png')}
            style={styles.doneIcon}
          />
        </View>
      )
    }
  }

  renderProfilePic() {
    //profile pic btn
    let border = this.state.imageChanged? {borderRadius: moderateScale(40)}: {};
    return (
      <TouchableOpacity onPress={this.onHandlePicture}>
        <Image
          source={this.state.profile}
          style={[styles.profile, border]}
        />
        <Text style={styles.picText}>{this.state.profileText}</Text>
      </TouchableOpacity>
    )
  }

  renderSchoolForm() {
    //school autocomplete
    //year, age
    return (
      <View style={styles.formContainer}>
        <AutoCompleteInput
          typed={(text) => this.props.onTyped(text)}
          placeholder="School"
          text={this.state.school}
          results={this.props.results}
        />
        <LineInput
          text={this.state.year}
          placeholder="Year"
          typed={(t) => this.setState({ year: t })}
        />
        <LineInput
          text={this.state.age}
          placeholder="Age"
          typed={(t) => this.setState({ age: t })}
        />
      </View>
    )
  }

  renderAuthForm() {
    //name, email, password
    return (
      <View style={styles.formContainer}>
        <LineInput
          text={this.state.name}
          placeholder="Name"
          typed={(t) => this.setState({ name: t })}
        />
        <LineInput
          text={this.state.email}
          placeholder="Email"
          typed={(t) => this.setState({ email: t })}
        />
        <LineInput
          text={this.state.password}
          placeholder="Password"
          typed={(t) => this.setState({ password: t })}
        />
      </View>
    )
  }

  renderFinishBtn() {
    return (
      <TouchableOpacity onPress={this.onSignupPressed} style={styles.btn}>
        <Text style={styles.btnText}>Sign up</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { visible } = this.props
    return (
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => {}}
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.xOut()}>
            <Image
              source={require('../../../assets/icons/whiteX.png')}
              style={styles.xImg}
            />
          </TouchableOpacity>
          <KeyboardAwareScrollView>
            {this.renderProfilePic()}
            {this.renderLoading()}
            {this.renderAuthForm()}
            {this.renderSchoolForm()}
            {this.renderFinishBtn()}
          </KeyboardAwareScrollView>
        </View>
      </Modal>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#171717',
    marginTop: '20@ms',
    flex: 1,
  },
  textContainer: {
    margin: '10@ms',
  },
  xImg: {
    width: '40@ms',
    height: '40@ms',
    margin: '10@ms',
  },
  profile: {
    width: '80@ms',
    height: '80@ms',
    alignSelf: 'center',
  },
  picText: {
    color: '#fff',
    textAlign: 'center',
  },
  formContainer: {
    margin: '20@ms',
    marginTop: '10@ms',
  },
  btn: {
    backgroundColor: '#fff',
    padding: '5@ms',
    marginTop: '10@ms',
    alignSelf: 'center',
  },
  btnText: {
    fontFamily: 'OpenSans-BoldItalic',
    color: '#171717',
    fontSize: '24@ms',
    textAlign: 'center',
  },
  doneIcon: {
    width: '20@ms',
    height: '20@ms',
    alignSelf: 'center',
  },
})

export { SignupModal }
