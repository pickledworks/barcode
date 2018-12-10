import React, { Fragment } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Linking,
  Clipboard
} from "react-native";
import { BarCodeScanner, Permissions } from "expo";

import dbLayer from "../utils/dbLayer";
import specifyType from "../utils/specifyType";

import History from "../components/History";

export default class HomeScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    entries: [],
    isAlertActive: false,
    barCodeScannerShow: true,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.refreshData();

    this.setState({ hasCameraPermission: status === "granted" });
  }

  refreshData() {
    dbLayer.getEntries().then(entries => this.setState({ entries }));
  }

  handleBarCodeScanned = async ({ type, data }) => {
    if (this.state.isAlertActive) return null;

    this.refreshData();

    const entries = (await dbLayer.getEntries().then(data => data)) || [];

    const lastEntry = entries[0];

    if (lastEntry && lastEntry.content === data) {
      return null;
    }

    dbLayer.createEntry(
      {
        scannedAt: new Date(),
        content: data,
        type: specifyType(data)
      },
      this.refreshData()
    );

    this.setState({ isAlertActive: true });

    Alert.alert(
      "Successfully saved",
      data,
      [
        {
          text: "Go to link",
          onPress: () =>
            this.setState({ isAlertActive: false }) && Linking.openURL(data)
        },
        {
          text: "Copy as text",
          onPress: () =>
            this.setState({ isAlertActive: false }) && Clipboard.setString(data)
        },
        {
          text: "Delete",
          onPress: () =>
            this.setState({ isAlertActive: false }) &&
            dbLayer.deleteLastEntry(this.refreshData())
        },
        {
          text: "Ok",
          style: "cancel",
          onPress: () => this.setState({ isAlertActive: false })
        }
      ],
      { cancelable: true }
    );
  };

  onPress = () => {
    this.setState({ barCodeScannerShow: !this.state.barCodeScannerShow });
  };

  render() {
    const { entries, hasCameraPermission, barCodeScannerShow } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "space-evenly"
        }}
      >
        {barCodeScannerShow && (
          <BarCodeScanner
            onBarCodeScanned={this.handleBarCodeScanned}
            style={styles.barCodeScanner}
          />
        )}
        <History
          onPress={this.onPress}
          entries={entries}
          onDeleteEntry={id => dbLayer.deleteEntry(id, this.refreshData())}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  barCodeScanner: {
    flex: 2
  },
  text: {
    color: "black",
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
    margin: 10,
    backgroundColor: "gray"
  }
});
