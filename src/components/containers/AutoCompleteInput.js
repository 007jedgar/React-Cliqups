import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native'
import {
  ScaledSheet,
} from 'react-native-size-matters'


class AutoCompleteInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showResults: false,
    }
  }

  onFocus = (isF) => {
    this.setState({ showResults: true })
  }

  selState = (selState) => {
    console.log('state', selState)
  }

  editingEnded = () => {
    setTimeout(() => this.setState({ showResults: false }), 1700)
  }

  onResultSelected = (item) => {
    this.setState({ showResults: false })
    this.props.typed(item)
  }

  renderResults() {
    if (this.state.showResults) {
      return (
        <View style={styles.resultContainer}>
          <FlatList
            data={this.props.results}
            renderItem={({item}) => {
              return (
                <TouchableOpacity onPress={() => this.onResultSelected(item)}>
                  <Text style={styles.result}>{item}</Text>
                </TouchableOpacity>
              )
            }}
            keyExtractor={(item) => item}
          />
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  render() {
    const { inputStyle } = styles
    return (
      <View>
        <TextInput
          ref={component => { this._textInput = component }}
          value={this.props.text}
          placeholder={this.props.placeholder}
          placeholderTextColor="dimgrey"
          style={inputStyle}
          onFocus={this.onFocus}
          onChangeText={(text) => this.props.typed(text)}
          onEndEditing={this.editingEnded}
          keyboardAppearance="dark"
        />
        {this.renderResults()}
      </View>
    )
  }
}

const styles = ScaledSheet.create({
  resultContainer: {
    margin: '10@ms',
    marginTop: '5@ms',
  },
  result: {
    fontSize: '18@ms',
    fontFamily: 'Roboto-Medium',
    color: '#fff',
  },
  inputStyle: {
    width: '300@ms',
    height: '30@ms',
    fontSize: '19@ms',
    fontFamily: 'Montserrat-Regular',
    margin: '3@ms',
    borderColor: '#FE5F55',
    borderBottomWidth: '2@ms',
    marginTop: '10@ms',
    color: '#fff',
  },
})

export {AutoCompleteInput}
