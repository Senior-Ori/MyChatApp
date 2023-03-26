import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

function GoalItem(props) {
  const [unixTime, setUnixTime] = useState(0);
  const [timeDifference, setTimeDifference] = useState("");
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(
        `https://ori-projects-default-rtdb.europe-west1.firebasedatabase.app/esp32project/sensor${props.text}/1/unixtime.json`
      )
        .then((response) => response.json())
        .then((data) => {
          const currentTime = Math.floor(Date.now() / 1000);

          const difference = currentTime - data;
          const hours = Math.floor(difference / 3600);
          const minutes = Math.floor((difference % 3600) / 60);
          const seconds = difference % 60;
          setTimeDifference(
            `${hours} hours, ${minutes} minutes, ${seconds} seconds`
          );
          console.log(
            `\ncurrent unixtime:${currentTime}\nperiod unixtime:${difference}\nperiod time:${hours}:${minutes}:${seconds}\n`
          );
        })
        .catch((error) => console.error(error));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#ddd" }}
        onPress={props.onDeleteItem.bind(this, props.id)}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{timeDifference}</Text>
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
