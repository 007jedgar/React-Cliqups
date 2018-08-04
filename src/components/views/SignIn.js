import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';
import { generalStyles } from '../../stylesheet';
import { AuthBtn } from '../buttons';
import { NavBar, Spinner, } from '../common';
var t = require('tcomb-form-native');
var Form = t.form.Form;
var _ = require('lodash');
import { Actions } from 'react-native-router-flux';
import { loginUser } from '../../actions';
import { connect } from 'react-redux';
import firebase from 'firebase';

// FORM STYLING
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
//Textinput styling
stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.error.borderWidth = 0;
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.error.marginBottom = 0;
stylesheet.textbox.normal.marginBottom = moderateScale(5);
stylesheet.textbox.error.marginBottom = moderateScale(5);

stylesheet.textbox.normal.fontSize = moderateScale(23);
stylesheet.textbox.error.fontSize = moderateScale(23);
stylesheet.textbox.normal.color = '#fff';
stylesheet.textbox.error.color = '#fff';

//Entry label styling
stylesheet.controlLabel.normal.color = '#fff';
stylesheet.controlLabel.error.color = 'orange';
stylesheet.controlLabel.normal.marginLeft = moderateScale(5);
stylesheet.controlLabel.error.marginLeft = moderateScale(5);

//Outside textbox view styling
stylesheet.textboxView.normal.borderWidth = 0;
stylesheet.textboxView.error.borderWidth = 0;
stylesheet.textboxView.normal.borderRadius = 0;
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.normal.borderBottomWidth = moderateScale(4);
stylesheet.textboxView.error.borderBottomWidth = moderateScale(4);

stylesheet.textboxView.normal.borderColor = '#fff';
stylesheet.textboxView.error.borderColor = '#fff';

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
      <View style={general.container}>


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
