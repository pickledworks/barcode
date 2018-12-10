import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import dbLayer from './dbLayer'

import History from './History'

export default class App extends React.Component {
  componentDidMount() {
    dbLayer.createTableIfNotExists()
  }

  render() {
    return (
      <View style={styles.container}>
        <History />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
  },
})
