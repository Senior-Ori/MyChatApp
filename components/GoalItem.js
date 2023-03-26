import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

function GoalItem(props) {
  const [mailReceived, setMailReceived] = useState("");
  const [timeDifference, setTimeDifference] = useState("");
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(
        `https://ori-projects-default-rtdb.europe-west1.firebasedatabase.app/esp32project/sensor${props.text}.json`
      )
        .then((response) => response.json())
        .then((data) => {
          const currentTime = Math.floor(Date.now() / 1000);

          const difference = currentTime - data[1].unixtime;
          const hours = Math.floor(difference / 3600);
          const minutes = Math.floor((difference % 3600) / 60);
          const seconds = difference % 60;
          setMailReceived(data[0]);
          if (mailReceived) {
            setTimeDifference(
              `דואר נשלח לפני ${hours} שעות, ${minutes} דקות ו${seconds} שניות.`
            );
          } else {
            setTimeDifference(`תיבת הדואר מס'${props.text} הינה רייקה`);
          }
          console.log(
            `\ncurrent unixtime:${currentTime}\nperiod unixtime:${difference}\nperiod time:${hours}:${minutes}:${seconds}\n`
          );
        })
        .catch((error) => console.error(error));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={!mailReceived ? styles.goalItem : styles.mailAwaiting}>
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
  mailAwaiting: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#2A9D8F",
  },
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#264653",
  },
  goalText: {
    padding: 8,
    color: "white",
  },
});

export default GoalItem;
