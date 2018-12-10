import React, { Component } from "react";
import {
  Button,
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  StyleSheet
} from "react-native";

class ModalExample extends Component {
  state = {
    modalVisible: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    this.setState({
      modalVisible: visible
    });
  }

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{ marginTop: 22 }}>
            <Text>{this.props.content}</Text>
            <View style={styles.buttonList}>
              <Button onPress={onPressLearnMore} title="Git" color="green" />
              <Button onPress={onPressLearnMore} title="Kopyala" color="blue" />
              <Button
                onPress={onPressLearnMore}
                title="Kaydı Sil"
                color="red"
              />
            </View>
            <View>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonList: {
    flex: 1,
    flexDirection: "row"
  }
});
