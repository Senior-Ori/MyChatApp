import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-gesture-handler";

const GoalContext = React.createContext({
  courseGoals: [],
  addGoal: (goal) => {},
  deleteGoal: (goal) => {},
});

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [courseGoals, setCourseGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const jsonValue = await AsyncStorage.getItem("courseGoals");
        if (jsonValue !== null) {
          setCourseGoals(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    async function saveData() {
      try {
        const jsonValue = JSON.stringify(courseGoals);
        await AsyncStorage.setItem("courseGoals", jsonValue);
      } catch (e) {
        console.log(e);
      }
    }
    saveData();
  }, [courseGoals]);

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    if (enteredGoalText.length === 0) {
      Alert.alert("Invalid Goal", "Goal must not be empty.", [{ text: "OK" }]);
      return;
    }
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      enteredGoalText,
    ]);
    setEnteredGoalText("");
  }

  function deleteGoalHandler(goal) {
    setCourseGoals((currentCourseGoals) =>
      currentCourseGoals.filter((item) => item !== goal)
    );
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onLongPress={() => deleteGoalHandler(item)}
        activeOpacity={0.7}
      >
        <View key={item} style={styles.goalItem}>
          <Text style={styles.goalText}>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GoalContext.Provider
      value={{
        courseGoals: courseGoals,
        addGoal: addGoalHandler,
        deleteGoal: deleteGoalHandler,
      }}
    >
      <View style={styles.appContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Your course goal!"
            onChangeText={goalInputHandler}
            value={enteredGoalText}
          />
          <Button title="Add Goal" onPress={addGoalHandler} />
        </View>
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={renderItem}
            keyExtractor={(item) => item}
          />
        </View>
      </View>
    </GoalContext.Provider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  goalText: {
    color: "white",
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 6,
    padding: 8,
    marginLeft: 8,
  },
  deleteButtonText: {
    color: "white",
  },
});
