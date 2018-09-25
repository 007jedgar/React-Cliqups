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
    var iphoneX = this.isIphoneX();
    if (iphoneX) {
      this.iphoneXOptimization();
    }
    if (this.props.backArrow) {
      this.setState({ backArrow: this.props.backArrow})
    }
  }

  isIphoneX() {
    let d = Dimensions.get('window');
    const { height, width } = d;

    return (
      // This has to be iOS duh
      Platform.OS === 'ios' &&

      // Accounting for the height in either orientation
      (height === 812 || width === 812)
    );
  }

  iphoneXOptimization() {
    //stuff for iphone x nav bar
    // this.setState({ topStyle: {marginTop: -10}})
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

          <TouchableOpacity style={option} onPress={optionPress}>
            <Text style={optionText}>{rightBtn}</Text>
          </TouchableOpacity>

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
    justifyContent: 'space-between',
  },
  leftBtnView: {
    justifyContent: 'center',
    paddingLeft: '10@s',
    paddingRight: '20@s',
  },
  titleView: {
    alignSelf: 'flex-end',
    marginLeft: '37@s',
  },
  titleStyle: {
    fontSize: '26@ms',
    textAlign: 'right',
    color: 'dimgrey',
    fontFamily: 'Atletico Medium',
  },
  optionText: {
    fontSize: '22@ms',
    fontFamily: 'Atletico Medium',
    color: 'dimgrey'
  },
  option: {
    marginRight: '10@s',
    justifyContent: 'center',
    borderColor: '#27a587',
    borderRadius: 25,
    alignSelf: 'center'
  },
  navImage: {
    width: '44@ms',
    height: '44@ms',
    padding: '10@ms',
    alignSelf: 'center',
  },
})

export { BackNavBar };
