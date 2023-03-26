import { useState } from "react";
import { StyleSheet, View, Button, Modal, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";

function GoalInput(props) {
  const [enteredGoalText, setEnteredGoalText] = useState("");

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    props.onAddGoal(enteredGoalText);
    setEnteredGoalText("");
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
            <Button
              title="Add Goal"
              onPress={addGoalHandler}
              color={"#2A9D8F"}
            />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" onPress={props.onCancel} color={"#E76F51"} />
          </View>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
      </View>
    </Modal>
  );
}

export default GoalInput;
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
