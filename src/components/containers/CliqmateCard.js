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

class CliqmateCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      school_name: '',
      selected: false,
    }
  }

  componentDidMount() {
    this.fetchSchool()
  }

  pressed() {
    this.setState({ selected: !this.state.selected })
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
    const { school_name, selected } = this.state
    const selectedStyle = selected? styles.selectedStyle: {};
    return (
      <TouchableOpacity onPress={() => this.pressed()}>
        <View style={[ styles.container, selectedStyle ]}>
          <View style={styles.subCon}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.year}>{year}</Text>
          </View>
          <Text style={styles.school}>{school_name? school_name: ''}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
    margin: '10@ms',
    borderBottomColor: '#393939',
    borderBottomWidth: '2@ms',
    flexDirection: 'row',
  },
  name: {
    fontSize: '20@ms',
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
    marginLeft: '60@ms',
    fontSize: '25@ms',
    color: 'dimgrey',
    alignSelf: 'center',
    margin: '5@ms',
    position: 'absolute',
  },
  selectedStyle: {
    borderBottomColor: '#fff',
    borderBottomWidth: '3@ms',
  },
})

export {CliqmateCard};
