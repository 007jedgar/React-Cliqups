import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { SearchInput } from './SearchInput';

class SearchNavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bottonRow: props.bottomRow,
      topStyle: {marginTop: moderateScale(10)},
      showSearch: false,
      showTitle: true,
    }
  }

  searchPress() {
    this.setState({
      showSearch: !this.state.showSearch,
      showTitle: !this.state.showTitle,
    })
  }

  renderSearchBar() {
    if (this.state.showSearch) {
      return (
        <View style={styles.inputContainer}>
          <SearchInput
            placeholder="Cliqs, people, etc..."
          />
        </View>
      )
    }
  }

  renderSearch() {
    return (
      <TouchableOpacity onPress={() => this.searchPress()} style={styles.searchContainer}>
        <Image
          source={require('../../../assets/icons/search.png')}
          style={styles.searchImg}
        />
      </TouchableOpacity>
    )
  }

  renderTitle() {
    const { titleViewStyle, titleText, title } = this.props;
    if (this.state.showTitle) {
      return (
        <View style={[styles.titleView, titleViewStyle]}>
          <Text style={[styles.titleStyle, titleText]}>{title}</Text>
        </View>
      )
    }
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

        {this.renderTitle()}
        {this.renderSearchBar()}
        {this.renderSearch()}

      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    height: '45@vs',
    backgroundColor: '#E8F1F2',
    shadowOffset: {width: 3, height: 3},
    shadowColor: '#393939',
    shadowOpacity: .3,
    flexDirection: 'row',
    padding: '7@ms',
    paddingLeft: '4@ms',
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
  searchImg: {
    width: '30@ms',
    height: '30@ms',
  },
  searchContainer: {
    marginRight: '20@ms',
  },
  inputContainer: {
    marginRight: '60@ms',
  },
})

export { SearchNavBar };
