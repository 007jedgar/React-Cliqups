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
import { Spinner, FootInput, } from '../common';
import { FooterBtn } from '../buttons';
import { ProfileCameraModal } from '../modals';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

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
    if (showUploads) {
      return (
        <View>
          <Text>Uploads</Text>
        </View>
      )
    } else if (showUploads && noUploads) {
      return (
        <View>
          <Text>No Uploads</Text>
        </View>
      )
    }
  }

  renderCliqs() {
    const { showCLiqs, noCliqs } = this.state
    if (noCliqs && showCLiqs) {
      return (
        <TouchableOpacity>
          <View>
            <Text>Start a Clique</Text>
            <Image
              source={require('../../../assets/icons/x.png')}
              style={styles.camImg}
            />
          </View>
        </TouchableOpacity>
      )
    } else if (showCLiqs) {
      <View>
        <Text>Cliqs</Text>
      </View>
    }
  }

  render() {
    return (
      <View style={generalStyles.container}>
        <Text style={generalStyles.header}>My Stuff</Text>
        {this.renderProfilePic()}
        {this.renderTabs()}
        {this.renderUploads()}
        {this.renderCliqs()}

        <ProfileCameraModal
          visible={this.state.showPicModal}
          closeModal={() => this.editPic()}
        />
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
