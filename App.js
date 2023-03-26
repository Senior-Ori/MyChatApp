import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

const GOALS_STORAGE_KEY = "MY_APP_GOALS_STORAGE_KEY";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(true);
  const [courseGoals, setCourseGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGoalsFromStorage = async () => {
      try {
        const storedGoals = await AsyncStorage.getItem(GOALS_STORAGE_KEY);
        if (storedGoals !== null && Array.isArray(JSON.parse(storedGoals))) {
          setCourseGoals(JSON.parse(storedGoals));
          console.log(storedGoals);
          if (storedGoals !== "[]") {
            setModalIsVisible(false);
          }
        }
      } catch (e) {
        console.log("Failed to load goals from storage: ", e);
      }
      setIsLoading(false);
    };
    loadGoalsFromStorage();
  }, []);
  useEffect(() => {
    const saveGoalsToStorage = async () => {
      try {
        await AsyncStorage.setItem(
          GOALS_STORAGE_KEY,
          JSON.stringify(courseGoals)
        );
      } catch (e) {
        console.log("Failed to save goals to storage: ", e);
      }
    };
    saveGoalsToStorage();
  }, [courseGoals]);

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

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5e0acc" />
      </View>
    );
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

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E9C46A",
  },

  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },

  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E9C46A",
  },

  emptyListText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  emptyListButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#5e0acc",
    borderRadius: 8,
  },

  emptyListButtonText: {
    color: "white",
    fontSize: 16,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    width: "80%",
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },

  modalInputContainer: {
    marginBottom: 16,
  },

  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    fontSize: 16,
  },

  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },

  modalButtonCancel: {
    backgroundColor: "#ccc",
  },

  modalButtonSave: {
    backgroundColor: "#5e0acc",
  },

  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});
