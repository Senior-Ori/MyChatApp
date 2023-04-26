import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";

function MailItem(props) {
  const [mailReceived, setMailReceived] = useState("");
  const [timeDifference, setTimeDifference] = useState("");
  const [imageUrl, setImageUrl] = useState("www.image.com");
  const types = ["mail", "mailbox", "post mail", "mail letter"];

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
          if (!data[0]) {
            setTimeDifference(
              `📬 דואר נשלח לתיבה מס'${props.text} לפני ${
                hours !== NaN ? hours : "{תקלה: השרת איטי או מלא}"
              } שעות, ${minutes} דקות ו${seconds} שניות.`
            );
          } else {
            setTimeDifference(`✉️ תיבת הדואר מס'${props.text} הינה רייקה`);
          }
          console.log(
            `\ncurrent unixtime:${currentTime}\nperiod unixtime:${difference}\nperiod time:${hours}:${minutes}:${seconds}\nmail-received:${mailReceived}`
          );
        })
        .catch((error) => console.error(error));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetch(`https://source.unsplash.com/900x900/?${types[props.text - 1]}`)
      .then((response) => setImageUrl(response.url))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={mailReceived ? styles.mailItem : styles.mailAwaiting}>
      <View style={styles.imageContainer}>
        {!mailReceived && (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        )}
      </View>
      <Pressable
        android_ripple={{ color: "#ddd" }}
        onPress={props.onDeleteItem.bind(this, props.id)}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.mailText}>{timeDifference}</Text>
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
  mailItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#264653",
  },
  mailText: {
    padding: 8,
    color: "white",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",

    // height: "100%",
    padding: 8,
    width: "100%",
    // aspectRatio: "auto",
    // aspectRatio: "auto",
  },
  image: {
    // height: 80,
    width: "95%",
    borderRadius: 5,
    aspectRatio: 3 / 2,
  },
});

export default MailItem;
