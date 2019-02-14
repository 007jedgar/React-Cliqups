import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';
import { generalStyles, formStyle } from '../../stylesheet';
import {
  AlertCard,
} from '../containers'
import { Spinner, FootInput, NavBar } from '../common';
import { FooterBtn } from '../buttons';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { ProfileCamera } from '../camera';
import { ImgUpload } from '../../util/Images';
import {
  loginUser,
} from '../../actions'

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showProfile: true,
      showCamera: false,
    }
  }

  componentDidMount() {
    const user = 'ryanrickert@gmail.com'
    password = 'password'
    // this.props.loginUser(user, password)
    const auth = [ user, password]
    console.log('hello profile', auth)
  }

  saveImg(data, caseId) {
    var photoCount = this.state.photoCount + 1;
    this.setState({ photoCount: photoCount });
    var user = firebase.auth().currentUser;
    var base64 = data.base64;
    var height = data.height;
    var width = data.width;
    var uri = data.uri;

    ImgUpload(uri, caseId, user, photoCount).then((url) => { // sends photo to fb storage and returns download url
        console.log('download url:', url)
        var _pictures = this.state._pictures
        var picture = {
          url: url,
          num: photoCount,
        }
        _pictures.push(picture)
        this.setState({ _pictures: _pictures })
        var _caseId = caseId.toString()
        try {
          firebase.firestore().collection('cases').doc(_caseId)
            .collection('pictures').add({
              picture,
            }).then(() => {
              console.log('done');
            }).catch((err) => {
              console.log('error: ', err);
            })
        } catch(err) {
          console.log('error saving downloadUrl')
        }
    }).catch((err) => {
        console.log('error: ', err)
      })
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
          sendImg={(data, caseId) => this.saveImg(data, caseId)}
          closeCamera={() => this.toggleCamera()}
        />
      )
    }
  }

  //testing purposes  only
  signOut() {
    firebase.auth().signOut().then(() => {
      Actions.welcome()
    })
  }

  signIn() {
    const email = "007j.edgar@gmail.com"
    const password = 'password'
    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
      Alert.alert('not signed in')
    });
  }

  newCliq() {
    Actions.newCliq()
  }

  renderAlerts() {
    if (this.props.alerts.length < 0) {
      return (
        <FlatList
          renderItem={({item}) => (
            <AlertCard alert={item}/>
          )}
        />
      )
    }
  }

  renderProfile() {
    if (this.state.showProfile) {
      return (
        <View style={generalStyles.container}>
          <NavBar
            title="Profile"
          />

          <TouchableOpacity onPress={()=> this.newCliq()}>
            <Text style={generalStyles.header}>New Cliq</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.signOut()}>
            <Text style={generalStyles.header}>Logout</Text>
          </TouchableOpacity>

        </View>
      )
    }
  }

  render() {
    return (
      <View style={generalStyles.container}>
        {this.renderCamera()}
        {this.renderProfile()}
      </View>
    )
  }
}

const mapStateToProps = state => {
  const { user } = state.auth
  const { alerts } = state.alert
  return {
    user,
    alerts
  }
}

export default connect(mapStateToProps, {loginUser}) (Profile);
