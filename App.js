import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import dbLayer from './utils/dbLayer'

import HomeScreen from './screens/HomeScreen'

export default class App extends React.Component {
  componentDidMount() {
    dbLayer.createTableIfNotExists()
  }

  render() {
    return (
      <View style={styles.container}>
        <HomeScreen />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
  },
})
