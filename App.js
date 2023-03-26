import React, { useState, useContext, useEffect, createContext } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Button,
} from "react-native";
import messaging from "@react-native-firebase/messaging";
import { TextInput } from "react-native-gesture-handler";

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [courseGoals, setCourseGoals] = useState([]);

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }
  function addGoalHandler() {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      enteredGoalText,
    ]);
  }
  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          onChangeText={goalInputHandler}
        />
        <Button title="Add Goal" onPress={addGoalHandler} />
      </View>
      <View style={styles.goalsContainer}>
        {courseGoals.map((goal) => (
          <View key={goal} style={styles.goalItem}>
            <Text style={styles.goalText}>{goal}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  goalsContainer: {
    flex: 4,
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    color: "white",
  },
  // container: {
  //   paddingTop: "10%",
  //   flex: 1,
  //   marginHorizontal: 20,
  //   marginVertical: 10,
  // },
  // input: {
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   padding: 10,
  //   marginBottom: 10,
  // },
  // button: {
  //   marginTop: 10,
  // },
  // dummyText: { margin: 16, padding: 16, borderWidth: 2, borderColor: "blue" },

  /*
   */
});
