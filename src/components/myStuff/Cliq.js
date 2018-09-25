import React, { Component} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import {
  BackNavBar
} from '../common';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';
import { CachedImage } from 'react-native-cached-image';
import PostCard from './PostCard';

class Cliq extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
    }
  }

  renderHeader() {
    const { cliqPic } = this.props
    return (
      <View>
        <CachedImage
          source={{uri: cliqPic }}
          style={styles.cliqPic}
        />
      </View>
    )
  }

  renderPosts() {
    return (
      <FlatList
        data={this.state.posts}
        renderItem={({item}) =>
          <PostCard
            cliqName={item.createdBy}
            text={item.text}
            img={item.postURL}
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
        {this.renderHeader()}
        {this.renderPosts()}

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

  },
})

export default Cliq;
