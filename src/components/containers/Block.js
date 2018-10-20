import React, { Component } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

class Block extends Component {
  render() {
    return (
      <View style={styles.block} />
    );
  }
}

const styles = ScaledSheet.create({
  block: {
    backgroundColor: '#C0D6DF',
    width: '170@ms',
    height: '120@ms',
    margin: '2@ms'
  },
})

export {Block};
