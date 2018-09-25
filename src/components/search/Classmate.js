import React, { Component} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { generalStyles, formStyle } from '../../stylesheet';
import {
  BackNavBar,
  Spinner,
} from '../common';
import {
  CliqsCard,
} from '../containers';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';
import { CachedImage } from 'react-native-cached-image';

class Classmate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showCLiqs: false,
      noCliqs: false,
    }
  }

  renderNav() {
    return (
      <BackNavBar />
    )
  }

  renderProfilePic() {
    const { profilePic } = this.props
    return (
      <View>
        <CachedImage
          source={{uri: profilePic }}
          style={styles.profile}
        />
      </View>
    )
  }

  renderCLiqs() {
    const { showCLiqs, noCliqs } = this.state
    if (showCLiqs) {
      return (
        <View>
          <Text style={generalStyles.lightText}>Cliqs</Text>
          <ScrollView style={{height: moderateScale(500)}}>
            <CliqsCard />
          </ScrollView>
        </View>
      )
    } else if (noCliqs && showCLiqs) {
      return (
        <TouchableOpacity>
          <View>
            <Text style={generalStyles.lightText}>Start a Clique</Text>
            <Image
              source={require('../../../assets/icons/x.png')}
              style={styles.camImg}
            />
          </View>
        </TouchableOpacity>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>

        {this.renderNav()}
        {this.renderProfilePic()}
        {this.renderCLiqs()}

      </View>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
     flex: 1,
     backgroundColor: '#fff',
  },
  profile: {
    position: 'absolute',
    height: '200@ms',
    width: '400@ms',
  },
})

export default Classmate;
