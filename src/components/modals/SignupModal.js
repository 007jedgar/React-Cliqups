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
import { NavBar } from '../common';
import {
  AutoCompleteInput,
} from '../containers'
import { CachedImage } from 'react-native-cached-image';


class SignupModal extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }
  
  xOut() {
    this.props.closeModal()
  }

  renderProfilePic() {
    //profile pic btn
  }

  renderSchoolForm() {
    //school autocomplete
    //year, age
  }

  renderAuthForm() {
    //name, email, password
  }

  render() {
    const { visible } = this.props
    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
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
    backgroundColor: '#fff',
    marginTop: '20@ms',
    flex: 1,
  },
  textContainer: {
    margin: '10@ms',
  },
  xImg: {
    width: '30@ms',
    height: '30@ms',
  },
})

export { SignupModal }
