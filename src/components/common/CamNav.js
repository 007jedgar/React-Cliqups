import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';


class CamNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bottonRow: props.bottomRow,
      topStyle: {marginTop: moderateScale(10)},
      pressed: false,
      icon: require('../../../assets/icons/whiteCamera.png')
    }
  }

  componentDidMount() {
    this.toggleIcon()
  }

  componentDidUpdate(nextProps) {
    if (nextProps.pressed) {
      console.log('pressed 1');
    }
  }

  toggleIcon() {
    var icon = !this.state.pressed? require('../../../assets/icons/whiteCamera.png'): require('../../../assets/icons/emptyCamera.png');
    this.setState({
      icon: icon,
    })
  }

  renderBack() {
    var {children} = this.props
    if (children) {
      return (
        <View style={styles.leftBtnView}>
          {children}
        </View>
      )
    }
  }

  toggleCamera() {
    this.setState({ pressed: !this.state.pressed})
    this.props.rightPressed()
    setTimeout(() => this.toggleIcon(), 100)
    // this.toggleIcon()
  }

  renderRightBtn() {
    return (
      <TouchableWithoutFeedback onPress={() => this.toggleCamera()}>
        <Image
          source={this.state.icon}
          style={styles.camImg}
        />
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const {
      leftBtnView, titleStyle, rightBtnStyle, titleView,
      container, top } = styles;
    const {
      children, title, style,
      titleViewStyle, titleText } = this.props;

    return (
      <View style={[container, style]}>

          {this.renderBack()}

          <View style={[titleView, titleViewStyle]}>
            <Text style={[titleStyle, titleText]}>{title}</Text>
          </View>

          {this.renderRightBtn()}

      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    height: '60@vs',
    backgroundColor: '#fff',
    // shadowOffset: {width: 3, height: 3},
    // shadowColor: '#393939',
    // shadowOpacity: .3,
    marginBottom: '4@vs',
    flexDirection: 'row',
    padding: '7@ms',
    paddingLeft: '4@ms',
    justifyContent: 'center',
  },
  leftBtnView: {
    justifyContent: 'center',
    paddingLeft: '10@s',
  },
  titleView: {
    flex: 1,
    alignSelf: 'center',
  },
  titleStyle: {
    fontSize: '26@ms',
    textAlign: 'center',
    color: 'dimgrey',
    fontFamily: 'Avenir-Medium',
  },
  camImg: {
    width: '40@ms',
    height: '40@ms',
    marginRight: '20@ms',
  }
})

export { CamNav };
