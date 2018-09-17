import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Alert,
  FlatList,
} from 'react-native';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';
import { generalStyles, formStyle, formStyle1 } from '../../stylesheet';
import { Spinner, FootInput, } from '../common';
import { SchoolCard } from '../containers';
import { FooterBtn, AuthBtn } from '../buttons';
var t = require('tcomb-form-native');
var Form = t.form.Form;
var _ = require('lodash');
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import VPStatusBar from './VPStatusBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

var t = require('tcomb-form-native');
var Form = t.form.Form;
var _ = require('lodash');
var user = t.struct({
  name: t.String,
  phone: t.String,
  gradYear: t.String,
})

var returning = t.struct({
  phone: t.String,
})

var options1 = {
  stylesheet: formStyle1,
  fields: {
    phone: {
      label: 'Phone',
      placeholder: '1231231234',
      placeholderTextColor: '#A0BDBC',
      keyboardAppearance: 'dark',
      selectionColor: '#fff',
      autoCapitalize: 'none',
      keyboardType: 'phone-pad',
    },
  }
}

var options = {
  stylesheet: formStyle1,
  fields: {
    name: {
      label: 'Name',
      placeholder: 'Alex Doe',
      placeholderTextColor: '#A0BDBC',
      keyboardAppearance: 'dark',
      selectionColor: '#fff',
    },
    phone: {
      label: 'Phone',
      placeholder: '1231231234',
      placeholderTextColor: '#A0BDBC',
      keyboardAppearance: 'dark',
      selectionColor: '#fff',
      autoCapitalize: 'none',
      keyboardType: 'phone-pad',
    },
    gradYear: {
      label: 'Grad Year',
      placeholder: '2019',
      placeholderTextColor: '#A0BDBC',
      keyboardAppearance: 'dark',
      selectionColor: '#fff',
    }
  }
}

class Welcome extends Component {
  constructor(props) {
    super(props)

    this.state = {
      continuable: false,
      mobileNum: '',
      countryCode: '+1',
      user: {
        name: '',
        phone: '',
        gradYear: '',
      },
      user1: {
        phone: '',
      },
      showSchoolList: true,
      showSchool: true,
      selectedSchool: {},
      authBtn: 'Sign up',
      changeTo: 'Sign in',
      authType: false,
    }
  }

  componentDidMount() {
    this.checkAuth()
  }

  checkAuth() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        Actions.profile({ user: user})
      }
    })
  }

  onChangeText(text) {
    this.setState({ mobileNum: text })
    if (text.length > 8) {
      this.setState({ continuable: true })
    } else {
      this.setState({ continuable: false })
    }
  }

  onContinue() {
    const userInfo = {
      name: this.state.name,
      phone: this.state.phone,
      gradYear: this.state.gradYear,
    }

    this.props.createUser(userInfo)
  }

  onChangeValue(value) {
    this.setState({ user: value })
  }

  onChangeValue1(value) {
    this.setState({ user1: value })
  }

  toggleSchoolList() {
    this.setState({ showSchoolList: !this.state.showSchoolList})
  }

  toggleSchool() {
    this.setState({ showSchool: !this.state.showSchool})
  }

  toggleAuthType() {
    var authBtn = this.state.authType? 'Sign up': 'Sign in';
    var changeTo = this.state.authType? 'Sign in': 'Sign up';
    this.setState({ authType: !this.state.authType, authBtn, changeTo})
  }

  renderChangeAuth() {
    return (
      <View>
        <Text>{this.state.changeTo}</Text>
      </View>
    )
  }

  renderSchoolInput() {
    if (this.state.showSchool) {
      return (
        <View style={styles.inputStyle}>
          <FootInput
            returnKeyType="done"
            maxLength={10}
            style={styles.footerStyle1}
            placeholder="YOUR SCHOOL"
            value={this.state.selectedSchool.school}
            keyboardAppearance="dark"
            onFocus={() => {
              this.setState({ showSchoolList: true })
            }}
          />
        </View>
      )
    }
  }

  renderSchools() {
    if (this.state.showSchoolList) {
      return (
        <View style={styles.listStyle}>
          <FlatList
            scrollEnabled={false}
            data={schools}
            renderItem={({ item }) => (
              <SchoolCard
                school={item.school}
                address={item.address}
                pressed={() => {
                  this.setState({ selectedSchool: item })
                  this.toggleSchoolList()
                }}
              />
            )}
            keyExtractor={ item => item.address}
          />
        </View>
      )
    }
  }

  renderBtn() {
    if (this.state.loading) {
      return (
        <View style={{ marginTop: moderateScale(20)}}>
          <Spinner />
        </View>
      )
    } else {
      return (
        <View style={{ marginTop: moderateScale(20)}}>
          <AuthBtn pressed={() => this.onContinue()} title={this.state.authBtn}/>
        </View>
      )
    }
  }

  renderSignUp() {
    if (!this.state.authType) {
      return (
        <View style={generalStyles.formContainer}>
          <Form
            ref="form"
            type={user}
            options={options}
            value={this.state.user}
            onChange={(value) => this.onChangeValue(value)}
          />

          <KeyboardAwareScrollView >
            {this.renderSchoolInput()}
            {this.renderSchools()}
            {this.renderBtn()}
          </KeyboardAwareScrollView>

        </View>
      )
    }
  }

  renderSignin() {
    if ( this.state.authType) {
      return (
        <View style={generalStyles.formContainer}>
          <Form
            ref="form"
            type={returning}
            options={options1}
            value={this.state.user1}
            onChange={(value) => this.onChangeValue1(value)}
          />

          {this.renderBtn()}

        </View>
      )
    }
  }

  render() {
    return (
      <View style={generalStyles.container}>
        <Image
          source={(require('../../../assets/images/suhDude.png'))}
          style={styles.img}
          resizeMode="cover"
        />
        {this.renderSignUp()}
        {this.renderSignin()}
      </View>
    )
  }
}

const schools = [
  {school: 'Woodlands High School', address: '6101 Research Forest Dr. 77381'},
  {school: 'Woodlands High School (9th Grade Campus)', address: '6102 Research Forest Dr. 77381'},
  {school: 'Kingwood High School', address: '2102 Kingwood Dr. 77345'},
];

const styles = ScaledSheet.create({
  img: {
    opacity: .3,
    position: 'absolute',
    height: '660@vs',
    width: '350@s',
  },
  footerContainer: {

  },
  continueStyle: {
    fontSize: '22@ms',
    fontWeight: '700',
    color: '#fff',
    textAlign: 'right',
    marginRight: '10@ms',
  },
  listStyle: {
    height: '200@ms',
    marginTop: '5@ms',
    marginBottom: '20@ms',
  },
  imputStyle: {
    marginTop: '5@ms',
    marginBottom: '20@ms',
  }
})

export default Welcome;
