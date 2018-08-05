import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';
import { generalStyles, formStyle } from '../../stylesheet';
var t = require('tcomb-form-native');
var Form = t.form.Form;
var _ = require('lodash');
import { Actions } from 'react-native-router-flux';
import { loginUser } from '../../actions';
import { connect } from 'react-redux';
import firebase from 'firebase';

var User = t.struct({
  email: t.String,
  password: t.String,
});

var options = {
  stylesheet: formStyle,
  fields: {
    email: {
      label: 'Email',
      placeholder: 'jc123@zzpd.gov',
      autoCapitalize: 'none',
      placeholderTextColor: '#A0BDBC',
      keyboardAppearance: 'dark',
      keyboardType: 'email-address',
      selectionColor: '#fff',
    },
    password: {
      label: 'Password',
      placeholder: 'password',
      autoCapitalize: 'none',
      placeholderTextColor: '#A0BDBC',
      keyboardAppearance: 'dark',
      secureTextEntry: true,
      selectionColor: '#fff',
    },
  }
}

//Signin View
class SignIn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userForm: {
        email: '',
        password: '',
      },
      loading: this.props.loading,
    }
  }

  changeUser(value) {
    this.setState({ userForm: value })
  }

  componentDidMount() {
    this.checkAuth()
  }

  checkAuth() {
    this.setState({ loading: true })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //do stuff
      }
    })
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <View style={{marginTop: moderateScale(20)}}>
          <Spinner color={{backgroundColor: '#fff'}}/>
        </View>
      );
    }
  }

  renderNav() {
    return (
      <NavBar
        style={{backgroundColor: '#0E4457', marginBottom: 4}}
        title="Cliqups"
        titleText={{color: '#fff'}}
      />
    )
  }

  render() {
    return (
      <View style={generalStyles.container}>

        <Text>Hello Signin</Text>
      </View>
    )
  }
}

const styles = ScaledSheet.create({
  formContainer: {
    margin: '20@ms',
  },
})

const mapStateToProps = state => {
  const { user, loading } = state.auth;

  return {
    user,
    loading,
  }
}

export default connect(mapStateToProps, {loginUser})(SignIn);
