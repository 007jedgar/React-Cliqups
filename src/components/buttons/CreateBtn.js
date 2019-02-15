import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import {
  CreateCliqModal,
  CreatePostModal,
} from '../modals'

class CreateBtn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      icon: require('../../../assets/icons/add.png'),
      createCliq: false,
      createPost: false,
    }
  }

  onPressed = () => {
    let icon = !this.state.showOptions? require('../../../assets/icons/whiteX.png'): require('../../../assets/icons/add.png')
    this.setState({
      icon: icon,
      showOptions: !this.state.showOptions
    })
  }

  onCliqPressed = () => {
    this.setState({ createCliq: true })
  }

  onPostPressed = () => {
    this.setState({ createPost: true })
  }

  renderCliqModal() {
    if (this.state.createCliq) {
      return (
        <CreateCliqModal
          visible={this.state.createCliq}
          closeModal={() => this.setState({ createCliq: false })}
        />
      )
    }
  }

  renderPostModal() {
    if (this.state.createPost) {
      return (
        <CreatePostModal
          closeModal={() => this.setState({ createPost: false })}
          visible={this.state.createPost}
        />
      )
    }
  }

  renderOptions() {
    if (this.state.showOptions) {
      const { optionsText, options, option } = styles
      return (
        <View style={options}>
          <TouchableOpacity onPress={this.onCliqPressed} style={option}>
            <Text style={optionsText}>Create a Post</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onPostPressed} style={option}>
            <Text style={optionsText}>Create a Cliq</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  render() {
    const { title, onPress, style } = this.props
    const { containerStyle, iconStyle } = styles;
    return (
      <TouchableOpacity onPress={this.onPressed} style={styles.container}>
        {this.renderOptions()}
        <Image
          style={iconStyle}
          source={this.state.icon}
        />
        {this.renderCliqModal()}
        {this.renderPostModal()}
      </TouchableOpacity>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
    justifyContent: 'flex-end',
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: '0@ms',
    flexDirection: 'row',
  },
  iconStyle: {
    width: '60@ms',
    height: '60@ms',
    margin: '10@ms',
  },
  optionsText: {
    color: '#fff',
    fontSize: '20@ms',
    fontFamily: 'OpenSans-ExtraBoldItalic',
  },
  options: {
    justifyContent: 'center',
    marginBottom: '5@ms',
  },
  option: {
    borderWidth: '2@ms',
    borderColor: '#FFF',
    marginBottom: '10@ms',
    padding: '2@ms',
  },
})

export { CreateBtn };
