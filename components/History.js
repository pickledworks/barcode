import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native'
import moment from 'moment'

import dbLayer from '../utils/dbLayer'
import { ScrollView } from 'react-native-gesture-handler'

export class History extends Component {
  seedData(count) {
    for (let i = 0; i < count; i++) {
      dbLayer.createEntry(
        {
          scannedAt: new Date(),
          content: `${i}`,
          type: 'string',
        },
        null,
        this.refreshData(),
      )
    }
  }

  render() {
    const { entries, onDeleteEntry, onPress } = this.props

    return (
      <View style={{ flex: 1 }}>
        <TouchableHighlight onPress={onPress}>
          <Text style={styles.text}>History</Text>
        </TouchableHighlight>
        <ScrollView style={styles.container}>
          {entries.map(({ id, scannedAt, content, type }) => (
            <TouchableOpacity key={id} onPress={() => onDeleteEntry(id)}>
              <View style={styles.entryContainer}>
                <Text>
                  Scanned:
                  {` ${moment().format('D/mm/YY LTS')}`}
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
  text: {
    fontSize: 36,
    paddingTop: 10,
    paddingLeft: 50,
  },
})

export default History
