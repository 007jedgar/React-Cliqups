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
import { NavBar, LineInput } from '../common';
import {
  AutoCompleteInput,
} from '../containers'
import { CachedImage } from 'react-native-cached-image';
import {
  ImgUpload,
} from '../../util/Images'
import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view'
import ImagePicker from 'react-native-image-picker';


class SignupModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profile: require('../../../assets/icons/profile.png'),
      profileText: 'Add a profile Pic',
      year: '',
      age: '',
    }
  }

  onHandlePicture = () => {
    const options = {
      title: 'Select Profile Pic',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          profile: source,
          profileText: '',
          imageChanged: true,
        })
      }
    })
  }

  xOut() {
    this.props.closeModal()
  }

  renderProfilePic() {
    //profile pic btn
    let border = this.state.imageChanged? {borderRadius: moderateScale(40)}: {};
    return (
      <TouchableOpacity onPress={this.onHandlePicture}>
        <Image
          source={this.state.profile}
          style={[styles.profile, border]}
        />
        <Text style={styles.picText}>{this.state.profileText}</Text>
      </TouchableOpacity>
    )
  }

  renderSchoolForm() {
    //school autocomplete
    //year, age
    return (
      <View style={styles.formContainer}>
        <AutoCompleteInput
          typed={(text) => this.props.onTyped(text)}
          placeholder="School"
          text={this.state.locationTyped}
          results={this.props.results}
        />
        <LineInput
          text={this.state.year}
          placeholder="Year"
          typed={(t) => this.setState({ year: t })}
        />
        <LineInput
          text={this.state.age}
          placeholder="Age"
          typed={(t) => this.setState({ age: t })}
        />
      </View>
    )
  }

  renderAuthForm() {
    //name, email, password
    return (
      <View style={styles.formContainer}>
        <LineInput
          text={this.state.age}
          placeholder="Name"
          typed={(t) => this.setState({ name: t })}
        />
        <LineInput
          text={this.state.age}
          placeholder="Email"
          typed={(t) => this.setState({ email: t })}
        />
        <LineInput
          text={this.state.age}
          placeholder="Password"
          typed={(t) => this.setState({ password: t })}
        />
      </View>
    )
  }

  renderFinishBtn() {
    return (
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Sign up</Text>
      </TouchableOpacity>
    )
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
          <KeyboardAwareScrollView>
            {this.renderProfilePic()}
            {this.renderAuthForm()}
            {this.renderSchoolForm()}
            {this.renderFinishBtn()}
          </KeyboardAwareScrollView>
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
  profile: {
    width: '80@ms',
    height: '80@ms',
    alignSelf: 'center',
  },
  picText: {
    color: '#fff',
    textAlign: 'center',
  },
  formContainer: {
    margin: '20@ms',
    marginTop: '10@ms',
  },
  btn: {
    backgroundColor: '#fff',
    padding: '5@ms',
    marginTop: '10@ms',
    alignSelf: 'center',
  },
  btnText: {
    fontFamily: 'OpenSans-BoldItalic',
    color: '#171717',
    fontSize: '24@ms',
    textAlign: 'center',
  },
})

export { SignupModal }
