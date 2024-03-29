import { useState } from "react";
import { StyleSheet, View, Button, Modal, Image, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";

function MailInput(props) {
  const [enteredMailText, setEnteredMailText] = useState("");

  function mailInputHandler(enteredText) {
    setEnteredMailText(enteredText);
  }

  function addMailHandler() {
    props.onAddMail(enteredMailText);
    setEnteredMailText("");
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../assets/back-image.png")}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="אישור" onPress={addMailHandler} color={"#2A9D8F"} />
          </View>
          <View style={styles.button}>
            <Button title="חזור" onPress={props.onCancel} color={"#E76F51"} />
          </View>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="רשום את מס' תיבת הדואר שקבלת."
          onChangeText={mailInputHandler}
          value={enteredMailText}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text>created by Ori Loberbaum, 2023-2030</Text>
        <Text>smart mail box project</Text>
      </View>
    </Modal>
  );
}

export default MailInput;
const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#E9C46A",
  },
  image: {
    width: "100%",
    height: "60%",
    margin: 2,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    padding: 8,
  },
  buttonContainer: {
    marginBottom: "10%",
    flexDirection: "row",
  },
  button: {
    width: "50%",
    // marginHorizontal: 8,
  },
});
