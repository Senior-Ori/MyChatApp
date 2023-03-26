import React, { useState, useContext, useEffect, createContext } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import messaging from "@react-native-firebase/messaging";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAtGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#5e0acc"
          onPress={startAtGoalHandler}
        />
        <GoalInput
          visible={modalIsVisible}
          onCancel={endAddGoalHandler}
          onAddGoal={addGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
    backgroundColor: "#E9C46A",
  },

  goalsContainer: {
    flex: 4,
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
