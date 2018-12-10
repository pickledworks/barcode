import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import moment from "moment";

import dbLayer from "./dbLayer";
import { ScrollView } from "react-native-gesture-handler";

export class History extends Component {
  seedData(count) {
    for (let i = 0; i < count; i++) {
      dbLayer.createEntry(
        {
          scannedAt: new Date(),
          content: `${i}`,
          type: "T"
        },
        null,
        this.refreshData()
      );
    }
  }

  render() {
    const { entries, onDeleteEntry, onPress } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <TouchableHighlight onPress={onPress}>
          <Text h4>History</Text>
        </TouchableHighlight>
        <ScrollView style={styles.container}>
          {entries.map(({ id, scannedAt, content, type }) => (
            <TouchableOpacity key={id} onPress={() => onDeleteEntry(id)}>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 50
  },
  entryContainer: {
    marginVertical: 10
  }
});

export default History;
