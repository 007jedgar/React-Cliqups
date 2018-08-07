import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';
import { generalStyles, formStyle } from '../../stylesheet';
import { AuthBtn } from '../buttons';
import { Spinner, NavBar, FootInput, } from '../common';
import { SchoolCard } from '../containers';
var t = require('tcomb-form-native');
var Form = t.form.Form;
var _ = require('lodash');
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import VPStatusBar from './VPStatusBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from 'react-native-modal-datetime-picker';


class Name extends Component {
  constructor(props) {
    super(props);

    this.state = {
      schools: [],
      showGradYearModal: false,
      showBirthModal: false,
      showSchool: false,
      showBirth: false,
      showgradYear: false,
      selectedSchool: {},
      selectedGradYear: '',
      selectedBith: '',
    }
  }

  alertSchool() {
    Alert.alert("Please confirm you are at least 14 years of age.")
  }

  _showGradPicker = () => this.setState({ showGradYearModal: true });

  _hideGradPicker = () => this.setState({ showGradYearModal: false });

  _handleGradPicker = (date) => {
    console.log('A date has been picked: ', date);
    this.setState({ })
    this._hideGradPicker();
  };

  _showBirthPicker = () => this.setState({ showBirthModal: true });

  _hideBirthPicker = () => this.setState({ showBirthModal: false });

  _showBirthPicker = (date) => {
    console.log('A date has been picked: ', date);
    this._hideBirthPicker();
  };

  toggleBirthModal() {
    this.setState({ showBirthModal: !this.state.showBirthModal})
  }

  toggleBirth() {
    this.setState({ showBirth: !this.state.showBirth})
  }

  toggleGradYearModal() {
    this.setState({ showGradYearModal: !this.state.showGradYearModal})
  }

  toggleGradYear() {
    this.setState({ showGradYear: !this.state.showGradYear})
  }

  toggleSchoolList() {
    this.setState({ showSchoolList: !this.state.showSchoolList})
  }

  toggleSchool() {
    this.setState({ showSchool: !this.state.showSchool})
  }

  renderGradYearModal() {
    if (this.state.showGradYearModal) {
      return (
        <Text>Grad year modal</Text>
      )
    }
  }

  renderBirthModal() {

  }

  renderNav() {
    return (
      <View>
        <NavBar
          style={{backgroundColor: 'black', height: moderateScale(40)}}
          titleViewStyle={{color: '#fff'}}
        >
          <TouchableOpacity onPress={() => Actions.popTo('welcome')}>
           <Image
            source={require('../../../assets/icons/backArrow.png')}
            style={styles.navImg}
           />
         </TouchableOpacity>
        </NavBar>
        <VPStatusBar backgroundColor="black" barStyle="light-content"/>
      </View>
    )
  }

  renderSchoolInput() {
    if (this.state.showSchool) {
      return (
        <FootInput
          returnKeyType="done"
          maxLength={10}
          style={styles.footerStyle1}
          placeholder="YOUR SCHOOL"
          value={this.state.selectedSchool.school}
          keyboardAppearance="dark"
          onFocus={() => this.setState({ showSchoolList: true })}
        />
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

  renderGradInput() {
    if (!_.isEmpty(this.state.selectedSchool)) {
      return (
        <TouchableOpacity onPress={this._showGradPicker} style={styles.btnStyle}>
          <Text style={styles.labelStyle}>GRAD YEAR</Text>
        </TouchableOpacity>
      )
    }
  }

  renderBirthDateInput() {
    if (this.state.showBirth) {
      return (
        <TouchableOpacity onPress={this.toggleBirth.bind(this)} style={styles.btnStyle}>
          <Text style={styles.labelStyle}>BIRTH DATE</Text>
        </TouchableOpacity>
      )
    }
  }

  renderNameInput() {
    return (
      <FootInput
        returnKeyType="done"
        maxLength={21}
        style={styles.footerStyle}
        placeholder="FULL NAME?"
        keyboardAppearance="dark"
        onSubmitEditing={() => this.setState({ showSchool: true})}
      />
    )
  }

  checkEnter(keyValue) {
    if (keyValue == 'Enter') {
      this.setState({ showSchool: true })
    }
  }

  render() {
    return (
      <View style={generalStyles.darkContainer}>
        {this.renderNav()}
          <KeyboardAwareScrollView style={styles.container}>
            <View>
              <Image
               source={require('../../../assets/images/unnamed.png')}
               style={styles.img}
              />
              <View style={styles.info}>
                {this.renderNameInput()}
              </View>

              {this.renderSchoolInput()}
              {this.renderSchools()}
              {this.renderGradInput()}
              {this.renderBirthDateInput()}
            </View>
          </KeyboardAwareScrollView>

          <DateTimePicker
            isVisible={this.state.showGradYearModal}
            onConfirm={this._handleGradPicker}
            onCancel={this._hideGradPicker}
          />
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
  container: {
    flex: 1,
  },
  img: {
    flexGrow:.5,
    height: '300@ms',
    width: '390@ms',
    alignItems: 'center',
    justifyContent:'center',
  },
  navImg: {
    width: '40@ms',
    height: '40@ms',
  },
  info: {
    position: 'absolute',
    top: '250@ms',
    left: '0@ms',
    right: '0@ms',
    bottom: '80@ms',
    alignItems: 'center',
  },
  footerStyle: {
    backgroundColor: 'rgba(80,80,80, .3)',
    height: '55@ms',
    width: '370@ms',
  },
  footerStyle1: {
    backgroundColor: '#E05B35',
    height: '45@ms',
    width: '370@ms',
  },
  btnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0E4457',
    height: '70@vs',
    paddingLeft: '20@ms',
    justifyContent: 'space-between',
    backgroundColor: '#E05B35',
    height: '40@ms',
    width: '360@ms',
  },
  labelStyle: {
    fontSize: '22@ms',
    fontWeight: '800',
    color: '#fff',
    textAlign: 'left'
  },
  schoolTitle: {
    fontSize: '22@ms',
    fontWeight: '800',
    color: '#fff',
    textAlign: 'left',
  },
  address: {
    fontSize: '19@ms',
    fontWeight: '700',
    color: '#fff',
    textAlign: 'left'
  },
  schoolContainer: {
    backgroundColor: '#898989',
    paddingLeft: '10@ms',
    paddingTop: '5@ms',
    paddingBottom: '5@ms',
    marginBottom: -1,
  },
  listStyle: {
    height: '200@ms',
    marginTop: '5@ms',
    marginBottom: '10@ms',
  }
})

export default Name;
