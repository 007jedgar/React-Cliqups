import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import {
  ScaledSheet,
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import { Actions } from 'react-native-router-flux';
import { CachedImage } from 'react-native-cached-image';

class BackNavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bottonRow: props.bottomRow,
      topStyle: {marginTop: moderateScale(10)},
      backArrow: require('../../../assets/icons/backArrow.png'),
    }
  }

  componentDidMount() {
    if (this.props.backArrow) {
      this.setState({ backArrow: this.props.backArrow})
    }
  }

  render() {
    const {
      leftBtnView, titleStyle, rightBtnStyle, titleView,
      container, optionText, option, top } = styles;
    const {
      children, rightBtn, optionPress, title, style,
      titleViewStyle, titleText, backArrow } = this.props;

    return (
      <View style={[container, style]}>

        <View style={[top, this.props.topStyle]}>

          <View style={leftBtnView}>
            <TouchableOpacity onPress={() => Actions.pop()}>
              <CachedImage
                source={this.state.backArrow}
                style={styles.navImage}
              />
            </TouchableOpacity>
          </View>

          <View style={[titleView, titleViewStyle]}>
            <Text style={[titleStyle, titleText]}>{title}</Text>
          </View>

        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    height: '60@vs',
    backgroundColor: '#fff',
    shadowOffset: {width: 3, height: 3},
    shadowColor: '#393939',
    shadowOpacity: .3,
    marginBottom: '4@vs',
  },
  top: {
    marginTop: '10@ms',
    paddingBottom: '5@vs',
    flexDirection: 'row',
  },
  leftBtnView: {
    justifyContent: 'center',
    paddingLeft: '10@s',
    paddingRight: '20@s',
    alignSelf: 'center',
  },
  titleView: {
    alignSelf: 'center',
    marginLeft: '57@s',
  },
  titleStyle: {
    fontSize: '26@ms',
    textAlign: 'right',
    color: 'dimgrey',
    fontFamily: 'OpenSans-Regular',
  },
  navImage: {
    width: '44@ms',
    height: '44@ms',
    padding: '10@ms',
    alignSelf: 'center',
  },
})

export { BackNavBar };
