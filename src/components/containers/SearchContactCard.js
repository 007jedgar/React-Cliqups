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

class SearchContactCard extends Component {
  pressed() {
    
  }

  render() {
    const { name, phone, school, year } = this.props;
    return (
      <TouchableOpacity onPress={() => this.pressed()}>
        <View style={styles.container}>
          <View style={styles.subCon}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.year}>{year}</Text>
          </View>
          <Text style={styles.school}>{school}</Text>
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
    marginLeft: '20@ms',
    fontSize: '25@ms',
    color: 'dimgrey',
    alignSelf: 'center',
    margin: '5@ms',
  },
})

export {SearchContactCard};
