import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  BackNav,
} from '../common';
import {
  SearchContactCard,
} from '../containers';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';


class CreateCliq extends Component {
  constructor(props) {
    super(props)

    this.state = {
      classmates: [],
    }
  }

  renderCliqPic() {
    const uri = "https://firebasestorage.googleapis.com/v0/b/varsityprep-8fce6.appspot.com/o/coach_pics%2Ft9OwHWV2LIX5nozsKUJqqrnqKv32?alt=media&token=5c82f986-5d79-4c48-b927-ef95eb6382f0";
    return (
      <View>
        <CachedImage
          source={{ uri: uri }}
          style={styles.cliqPic}
        />
      </View>
    )
  }

  renderClassmates() {
    return (
      <FlatList
        data={this.state.classmates}
        renderItem={({item}) =>
          <SearchContactCard
            name={item.name}
            phone={item.phone}
            school={item.school}
            year={item.year}
            userUid={item.uid}
          />
        }
        keyExtractor={ item => item.phone.toString()}
        extraData={this.state.classmates}
      />
    )
  }

  renderNav() {
    return (
      <BackNavBar />
    )
  }

  render() {
    return (
      <View style={styles.container}>

        {this.renderNav()}
        {this.renderCliqPic()}
        {this.renderClassmates()}

      </View>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
     flex: 1,
     backgroundColor: '#fff',
  },
  cliqPic: {
    position: 'absolute',
    height: '200@ms',
    width: '400@ms',
  },
})

export default CreateCliq;
