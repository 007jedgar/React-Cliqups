import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
} from 'react-native';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';
import { generalStyles, formStyle } from '../../stylesheet';

class PostCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showReplies: false,
      replies: [],
    }
  }

  showReplies() {
    this.setState({
      showReplies: !this.state.showReplies,
    })
  }

  renderReplies() {
    return (
      <RepliesModal
        visible={this.state.showReplies}
        replies={this.state.replies}
      />
    )
  }

  render() {
    const { postURL, text, createdBy } = this.props;
    return (
      <View style={styles.container}>

        <CachedImage
          source={{ uri: postURL }}
          style={styles.postPic}
        />

        <Text>{createdBy}</Text>
        <Text>{text}</Text>

        <TouchableOpacity onPress={() => this.showReplies()}>
          <Text>Relies</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  postPic: {

  },
  createdByText: {

  },
  textStyles: {

  },
  reply: {

  },
})

export default PostCard ;
