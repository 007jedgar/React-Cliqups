import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';
import { generalStyles, formStyle } from '../../stylesheet';
var t = require('tcomb-form-native');
var Form = t.form.Form;
var _ = require('lodash');
import {
  TitleInput,
} from '../containers'
import {
  SignupModal,
} from '../modals'
import { Actions } from 'react-native-router-flux';
import { loginUser, autoCompleteSchools } from '../../actions';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';


//Signin View
class SignIn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      loading: this.props.loading,
      name: '',
      signupMenu: false,
    }
  }

  handleSignin = () => {
    let { email, password } = this.state
    Actions.profile()
  }

  handleSignup = () => {
    this.setState({ signupMenu: !this.state.signupMenu })
  }

  onAutoComplete = () => {
    this.props.autoCompleteSchools()
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

  renderModal() {
    if (this.state.signupMenu) {
      return (
        <SignupModal
          visible={this.state.signupMenu}
          closeModal={() => this.setState({ signupMenu: !this.state.signupMenu })}
          onTyped={this.onAutoComplete}
        />
      )
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

  rederAuthForm() {
    if (this.state.signup) {
      return (
        <TitleInput
          text={this.state.name}
          placeholder="name"
          onTyped={(t) => this.setState({ name: t })}
          secureTextEntry
          keyboardAppearance="dark"
        />
      )
    }
  }

  render() {
    return (
      <View style={generalStyles.container}>

        <Text style={styles.header}>CliqUps</Text>

        <View style={styles.form}>
          <TitleInput
            text={this.state.email}
            placeholder="email"
            onTyped={(t) => this.setState({ email: t })}
            keyboardAppearance="dark"
            textContentType="emailAddress"
          />

          <TitleInput
            text={this.state.password}
            placeholder="password"
            onTyped={(t) => this.setState({ pwassword: t })}
            secureTextEntry
            keyboardAppearance="dark"
            textContentType="password"
          />

          {this.rederAuthForm()}

          <TouchableOpacity style={styles.signinContainer} onPress={this.handleSignin}>
            <Text style={styles.signinText}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{alignSelf: 'center'}} onPress={this.handleSignup}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
        {this.renderModal()}
      </View>
    )
  }
}

const styles = ScaledSheet.create({
  formContainer: {
    margin: '20@ms',
  },
  form: {
    flex: .6,
    justifyContent: 'center',
  },
  header: {
    color: '#fff',
    fontSize: '30@ms',
    fontFamily: 'OpenSans-ExtraBoldItalic',
    margin: '20@ms',
  },
  signinText: {
    color: '#000',
    fontSize: '25@ms',
    fontFamily: 'OpenSans-ExtraBoldItalic',
    textAlign: 'center',
  },
  signupText: {
    color: '#fff',
    fontSize: '20@ms',
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    alignSelf: 'center',
  },
  signinContainer: {
    padding: '4@ms',
    paddingRight: '10@ms',
    paddingLeft: '10@ms',
    backgroundColor: '#fff',
    margin: '10@ms',
    alignSelf: 'center',
  },
})

const mapStateToProps = state => {
  const { user, loading, schools } = state.auth;

  return {
    user,
    loading,
    schools,
  }
}

export default connect(mapStateToProps, {loginUser, autoCompleteSchools})(SignIn);
