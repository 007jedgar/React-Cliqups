import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
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
// import { CachedImage } from 'react-native-cached-image';

class NavBtn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      focused: false,
      swipedTo: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.focused != this.state.focused) {
      this.setState({ focused: nextProps.focused })
    }
    if (nextProps.swipedTo != this.state.swipedTo) {
      if (nextProps.swipedTo) {
        this.setState({ focused: nextProps.swipedTo, swipedTo: nextProps.swipedTo })
      } else {
        this.setState({ focused: nextProps.swipedTo, swipedTo: nextProps.swipedTo })
      }
    }
  }

  toggleFocused() {
    if (!this.state.focused) {
      this.props.pressed()
      this.setState({ focused: !this.state.focused })
    }
  }

  render() {
    const { title } = this.props;
    var color = this.state.focused? {color: 'black'} : {color: 'dimgrey'};
    return (
      <TouchableOpacity activeOpacity={.9} onPress={() => this.toggleFocused()} style={styles.container}>
        <Text style={[styles.title, color]}>{title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
    height: '50@ms',
    justifyContent: 'center',
    marginRight: '50@s',
    marginLeft: '50@s',
    alignItems: 'center',
  },
  title: {
    fontSize: '20@ms',
    fontWeight: '700',
    textAlign: 'center',
  },
})

export { NavBtn };
