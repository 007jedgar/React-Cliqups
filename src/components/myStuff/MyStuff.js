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
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

class MyStuff extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showUploads: true,

    }
  }

  renderProfilePic() {
    return (
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: imgUrl }}
          style={styles.img}
        />
      </View>
    )
  }

  renderTabs() {
    return (
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Uploads</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Cliqs</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderStuff() {
    if (this.state.showUploads) {
      return (
        <View>
        </View>
      )
    } else {
      return (
        <View>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={generalStyles.container}>
        <Text style={generalStyles.header}>My Stuff</Text>
        {this.renderProfilePic()}
        {this.renderTabs()}
        {this.renderStuff()}
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
})

export default MyStuff;
