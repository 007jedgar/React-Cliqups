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
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux'

class SearchContactCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      school_name: '',
    }
  }

  componentDidMount() {
    // this.fetchSchool()
  }

  pressed() {
    // Actions.profile()
  }

  fetchSchool() {
    const school_id = this.props.school_id
    firebase.firestore().collection('schools').doc(school_id)
    .get().then((doc) => {
      this.setState({ school_name: doc.data().name })
    }).catch((err) => console.log('err', err))
  }

  render() {
    const { name, phone, school, year } = this.props;
    let { school_name } = this.state
    school_name = school_name? school_name : '';
    school_name = school_name.replace('High School', 'HS')
    school_name = school_name.replace('Prepatory', 'Prep')
    let pic = this.props.picture? {uri: this.props.picture} : require('../../../assets/icons/profile.png')
    let picStyle = this.props.picture? {borderRadius: moderateScale(20)}: {};

    return (
      <TouchableOpacity onPress={() => this.pressed()}>
        <View style={styles.container}>
          <Image style={[styles.img, picStyle]} source={pic}/>
          <View style={styles.subCon}>
            <Text style={styles.name}>{name}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.year}>{year}</Text>
              <Text style={styles.school}>{school_name}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
    margin: '10@ms',
    borderBottomColor: '#FE5F55',
    borderBottomWidth: '2@ms',
    flexDirection: 'row',
    flex: 1,
  },
  name: {
    fontSize: '20@ms',
    fontFamily: 'OpenSans-BoldItalic',
    color: '#fff'
  },
  year: {
    fontSize: '18@ms',
    color: '#fff'
  },
  subCon: {
    marginLeft: '10@ms',
    margin: '5@ms',
  },
  school: {
    marginLeft: '20@ms',
    fontSize: '25@ms',
    color: 'dimgrey',
  },
  img: {
    width: '40@ms',
    height: '40@ms',
    alignSelf: 'center',
  }
})

export {SearchContactCard};
