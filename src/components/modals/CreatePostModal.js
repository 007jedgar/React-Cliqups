import React, {Component} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native'
import {
  moderateScale, scale, verticalScale, ScaledSheet,
} from 'react-native-size-matters'
import { NavBar, } from '../common';
import { CachedImage } from 'react-native-cached-image';


class CreatePostModal extends Component {

  xOut() {
    this.props.closeModal()
  }

  render() {
    const { visible } = this.props
    return (
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => {}}
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.xOut()}>
            <Image
              source={require('../../../assets/icons/whiteX.png')}
              style={styles.xImg}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#171717',
    marginTop: '20@ms',
    flex: 1,
  },
  textContainer: {
    margin: '10@ms',
  },
  xImg: {
    width: '40@ms',
    height: '40@ms',
    margin: '10@ms',
  },
})

export { CreatePostModal }
