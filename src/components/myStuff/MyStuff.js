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
import { Spinner, FootInput, } from '../common';
import {
  CliqsCard
} from '../containers';
import { FooterBtn } from '../buttons';
import { ProfileCameraModal } from '../modals';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { ImgUpload } from '../../util/Images';
import { ProfileCamera } from '../camera';

class MyStuff extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showUploads: true,
      showCLiqs: false,
      noCliqs: false,
      noUploads: false,
      showPicModal: false,
    }
  }

  onCliqs() {
    this.setState({
      showUploads: false,
      showCLiqs: true,
    })
  }

  onUploads() {
    this.setState({
      showCLiqs: false,
      showUploads: true,
    })
  }

  editPic() {
    this.setState({
      showPicModal: !this.state.showPicModal,
    })
  }

  saveImg(data, caseId) {
    var photoCount = 1;
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
          firebase.firestore().collection('users').doc(user.uid)
            .update({
              profilePic: url,
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

  renderProfilePic() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Image
          source={{uri: imgUrl }}
          style={styles.img}
        />
        <TouchableOpacity onPress={() => this.editPic()} style={styles.camImgContainer}>
          <Image
            source={require('../../../assets/icons/whiteCamera.png')}
            style={styles.camImg}
          />
        </TouchableOpacity>
      </View>
    )
  }

  renderTabs() {
    return (
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tab} onPress={() => this.onUploads()}>
          <Text style={styles.tabText}>Uploads</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab} onPress={() => this.onCliqs()}>
          <Text style={styles.tabText}>Cliqs</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderUploads() {
    const {showUploads, noUploads} = this.state
    if (showUploads && !noUploads) {
      return (
        <View>
          <Text style={generalStyles.lightText}>Uploads</Text>
        </View>
      )
    } else if (showUploads && noUploads) {
      return (
        <View>
          <Text style={generalStyles.lightText}>No Uploads</Text>
        </View>
      )
    }
  }

  renderCliqs() {
    const { showCLiqs, noCliqs } = this.state
    if (showCLiqs) {
      return (
        <View>
          <Text style={generalStyles.lightText}>Cliqs</Text>
          <ScrollView style={{height: moderateScale(500)}}>
            <CliqsCard />
          </ScrollView>
        </View>
      )
    } else if (noCliqs && showCLiqs) {
      return (
        <TouchableOpacity>
          <View>
            <Text style={generalStyles.lightText}>Start a Clique</Text>
            <Image
              source={require('../../../assets/icons/x.png')}
              style={styles.camImg}
            />
          </View>
        </TouchableOpacity>
      )
    }
  }

  renderCamera() {
    if (this.state.showPicModal) {
      return (
        <ProfileCamera
          visible={true}
          sendImg={(data, caseId) => this.saveImg(data, caseId)}
          closeCamera={() => this.editPic()}
        />
      )
    }
  }

  render() {
    return (
      <View style={generalStyles.container}>
        <Text style={generalStyles.header}>My Stuff</Text>
        {this.renderProfilePic()}
        {this.renderTabs()}
        {this.renderCliqs()}
        {this.renderUploads()}

        {this.renderCamera()}
      </View>
    )
  }
}

const imgUrl ="https://static1.squarespace.com/static/54eedeb0e4b0b5ba2b964449/t/57ec6edb2994ca3021dfc39e/1475112696569/?format=1000w"

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
  tabs: {
    flexDirection: 'row',
    height: '40@ms',
  },
  tabText: {
    textAlign: 'center',
    alignSelf: 'center',
    color: '#fff',
    fontSize: '27@ms',
  },
  tab: {
    flex: .5,
    justifyContent: 'center',
    backgroundColor: '#FE5F55',
  },
  dataHeader: {
    textAlign: 'center',
    alignSelf: 'center',
    color: '#fff',
    fontSize: '25@ms',
  },
})

export default MyStuff;
