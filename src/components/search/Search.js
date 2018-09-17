import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Alert,
  FlatList,
} from 'react-native';
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';
import { generalStyles, formStyle } from '../../stylesheet';
import { Spinner, FootInput, SearchNavBar } from '../common';
import { SearchContactCard } from '../containers';
import { FooterBtn } from '../buttons';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import {
  queryClassmates,
  fetchUsers,
} from '../../actions'
import { connect } from 'react-redux';

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showResults: true,
      empty: false,
      classmates: [],
    }
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.classmates) {
      this.setState({ classmates: nextProps.classmates })
    }

    if (nextProps.users) {
      this.setState({ classmates: nextProps.users })
    }

    if (this.state.empty) {
      this.setState({ empty: nextProps.empty })
    }
  }

  renderClassmates() {
    if (this.state.showResults) {
      return (
        <FlatList
          data={this.state.classmates}
          renderItem={({item}) =>
            <SearchContactCard
              name={item.name}
              phone={item.phone}
              school={item.school}
              year={item.year}
            />
          }
          keyExtractor={ item => item.phone.toString()}
          extraData={this.state.classmates}
        />
      )
    }
  }

  render() {
    return (
      <View style={generalStyles.container}>
        <SearchNavBar
          title="Search"
          typed={() => {}}
          box=""
        />
        <Text style={generalStyles.header}> </Text>

        {this.renderClassmates()}
      </View>
    )
  }
}

const mapStateToProps = state => {
  const { classmates, empty } = state.clique
  const { users } = state.auth

  return {
    classmates,
    empty,
    users,
  }
}

export default connect(mapStateToProps, {fetchUsers})(Search);
