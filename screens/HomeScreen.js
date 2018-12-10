import React, { Fragment } from 'react'
import { Text, View, StyleSheet, ScrollView, Alert } from 'react-native'
import { BarCodeScanner, Permissions } from 'expo'

import dbLayer from '../dbLayer'

import History from '../History'

export default class HomeScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    entries: [],
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)

    this.refreshData()

    this.setState({ hasCameraPermission: status === 'granted' })
  }

  refreshData() {
    dbLayer.getEntries().then(entries => this.setState({ entries }))
  }

  handleBarCodeScanned = async ({ type, data }) => {
    this.refreshData()

    const entries = await dbLayer.getEntries().then(data => data) || []

    const lastEntry = entries[entries.length - 1]

    if (lastEntry && lastEntry.content === data) {
      return null
    }

    dbLayer.createEntry({
      scannedAt: new Date(),
      content: data,
      type: 'T',
    })

    Alert.alert(
      'Başarılı',
      `Okundu: ${data}`,
      [
        {
          text: 'Linke Git ',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: 'Kopyala',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Kaydetmeden çık', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    )
  }

  render() {
    const { entries, hasCameraPermission } = this.state

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    }

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'space-evenly',
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={styles.barCodeScanner}
        />

        <History
          entries={entries}
          onDeleteEntry={id => dbLayer.deleteEntry(id, this.refreshData())}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  barCodeScanner: {
    flex: 2,
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
    margin: 10,
    backgroundColor: 'gray',
  },
})
