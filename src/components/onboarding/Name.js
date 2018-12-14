import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  LayoutAnimation,
  Picker,
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
import moment from 'moment';


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
      selectedGradYear: 'GRAD YEAR',
      selectedBith: '',
    }
  }
  animateForm() {
   const createPropery = {
     type: 'spring',
     springDamping: 0.5,
     property: 'opacity',
   }

   const updatePropery = {
     type: 'spring',
     springDamping: 0.5,
     property: 'opacity',
   }

   const deletePropery = {
     type: 'spring',
     springDamping: 0.5,
     property: 'opacity',
   }

   const animationConfig = {
     duration: 500,
     create: createPropery,
     update: updatePropery,
     delete: deletePropery,
   };

   LayoutAnimation.configureNext(animationConfig);
 }

 componentWillUpdate() {
   // this.animateForm()
   LayoutAnimation.spring()
 }

  alertSchool() {
    Alert.alert("Please confirm you are at least 14 years of age.")
  }

  _showGradPicker = () => this.setState({ showGradYearModal: true });

  _hideGradPicker = () => this.setState({ showGradYearModal: false });

  _handleGradPicker = (date) => {
    console.log('A date has been picked: ', date);
    formattedDate = moment(date).format("MMM Do YY");
    this.setState({ selectedGradYear: formattedDate })
    this._hideGradPicker();
  };

  _showBirthPicker = () => this.setState({ showBirthModal: true });

  _hideBirthPicker = () => this.setState({ showBirthModal: false });

  _showBirthPicker = (date) => {
    console.log('A date has been picked: ', date);
    this._hideBirthPicker();
  };

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
        <Picker
          itemStyle={styles.pickerText}
          selectedValue={this.state.selectedGradYear}
          onValueChange={(itemValue, itemIndex) => this.setState({selectedGradYear: itemValue, showGradYearModal: !this.state.showGradYearModal,})}>
          <Picker.Item label="2019" value="Senior" />
          <Picker.Item label="2020" value="Junior" />
          <Picker.Item label="2021" value="Sophomore" />
          <Picker.Item label="2022" value="Senior" />
        </Picker>
      )
    }
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
          onFocus={() => {
            this.setState({ showSchoolList: true })
            this.scroll.props.scrollToPosition(0, 200)
          }}
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
        <TouchableOpacity onPress={() => this.setState({ showGradYearModal: !this.state.showGradYearModal
        })} style={styles.btnStyle}>
          <Text style={styles.labelStyle}>{this.state.selectedGradYear}</Text>
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

  _scrollToInput (reactNode: any) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.scrollToFocusedInput(reactNode)
  }

  renderContinue() {
    if (this.state.selectedGradYear != 'GRAD YEAR') {
      return (
        <TouchableOpacity style={styles.btnStyle}>
          <Text style={styles.labelStyle}>CONTINUE</Text>
        </TouchableOpacity>
      )
    }
  }

  render() {
    return (
      <View style={generalStyles.darkContainer}>
        {this.renderNav()}
          <KeyboardAwareScrollView
            style={styles.container}
            innerRef={ref => {this.scroll = ref}}
          >
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
              {this.renderGradYearModal()}
              {this.renderContinue()}
            </View>
          </KeyboardAwareScrollView>

          <DateTimePicker
            isVisible={this.state.showBirthModal}
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
    width: '370@ms',
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
  },
  pickerText: {
    fontSize: '22@ms',
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
  },
  picker: {
    backgroundColor: '#fff',
  }
})

export default Name;
