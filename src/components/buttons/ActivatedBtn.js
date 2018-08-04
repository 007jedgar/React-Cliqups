import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale,
  ScaledSheet,
} from 'react-native-size-matters';

class ActivatedBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      selected: props.selected,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected || nextProps.selected == false) {
      var selected = nextProps.selected;
      this.toggleSelected(selected);
    };
  }

  toggleSelected(selected) {

    if (selected == true) {
      this.setState({
        containerStyle: {borderColor: '#27a587'},
        titleColor: {color: '#27a587'},
        title: 'Account is Active',
      });
    } else if (selected == false) {
      this.setState({
        containerStyle: {borderColor: 'dimgrey'},
        titleColor: {color: 'dimgrey'},
        title: 'Activate Account',
      });
    }
  }

  render() {
    const { pressed, btnStyle } = this.props;

    return (
      <TouchableOpacity onPress={pressed} activeOpacity={.5}>
        <View style={[styles.container, this.state.containerStyle, btnStyle]}>
          <Text style={[styles.title, this.state.titleColor]}>{this.state.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: '5@ms',
    borderWidth: '2@ms',
    borderColor: 'dimgrey',
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#393939',
    shadowOpacity: .3,
    marginRight: '20@ms',
    marginLeft: '20@ms',
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'Roboto-Regular',
    fontSize: '20@ms',
    margin: '5@ms',
    marginLeft: '20@ms',
    marginRight: '20@ms',
    color: 'dimgrey',
    textAlign: 'center',
  },
})

export {ActivatedBtn};
