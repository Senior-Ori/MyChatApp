import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

function GoalItem(props) {
  const [unixTime, setUnixTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(
        `https://ori-projects-default-rtdb.europe-west1.firebasedatabase.app/esp32project/sensor${props.text}/1.json`
      )
        .then((response) => response.json())
        .then((data) => setUnixTime(data.unixtime));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // const counter = Math.floor(unixTime / 1000);

  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#ddd" }}
        onPress={props.onDeleteItem.bind(this, props.id)}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{Date.now() - unixTime} seconds</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    padding: 8,
    color: "white",
  },
});

export default GoalItem;
