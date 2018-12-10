import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import moment from 'moment'

import dbLayer from './dbLayer'
import { ScrollView } from 'react-native-gesture-handler'

export class History extends Component {
  constructor(props) {
    super(props)

    this.state = { entries: [] }
  }

  componentDidMount() {
    this.refreshData()
  }

  seedData(count) {
    for (let i = 0; i < count; i++) {
      dbLayer.createEntry(
        {
          scannedAt: new Date(),
          content: `${i}`,
          type: 'T',
        },
        null,
        this.refreshData(),
      )
    }
  }

  refreshData() {
    console.log('refreshing data...')
    dbLayer.getEntries().then(entries => this.setState({ entries }))
  }

  render() {
    const { entries } = this.state

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          {entries.map(({ id, scannedAt, content, type }) => (
            <TouchableOpacity
              key={id}
              onPress={() => dbLayer.deleteEntry(id, this.refreshData())}
            >
              <View style={styles.entryContainer}>
                <Text>
                  Scanned:
                  {moment()
                    .startOf(scannedAt)
                    .fromNow()}
                </Text>
                <Text>Content: {content}</Text>
                <Text>Type: {type}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 50,
  },
  entryContainer: {
    marginVertical: 10,
  },
})

export default History
