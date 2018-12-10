import React, { Fragment } from "react";
import { Text, View, StyleSheet, ScrollView, Alert } from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import Modal from "../components/modal";

export default class HomeScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    data: []
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState(previousState => ({
      data: [{ type, data }, ...previousState.data]
    }));
    Alert.alert(
      'Başarılı',
      'QR Kod Okundu',
      [
        {text: 'Linke Git ', onPress: () => console.log('Ask me later pressed')},
        {text: 'Kopyala', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Kaydemeden çık', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    const { data } = this.state;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "space-evenly"
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={styles.barCodeScanner}
        />
        <ScrollView style={styles.scrollView}>
          {data.map(item => {
            return <Text style={styles.text}>{item.data}</Text>;
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  barCodeScanner: {
    flex: 5
  },
  text: {
    color: "black",
    fontSize: 20
  },
  scrollView: {
    flex: 1,
    margin: 10,
    backgroundColor: "gray"
  }
});
