import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import * as Notifications from "expo-notifications";

export default function App() {
  useEffect(() => {
    requestPermissions();
    scheduleNotification();
  }, []);

  async function requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to send notifications was denied");
    }
  }

  async function scheduleNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Good morning Ori",
      },
      trigger: {
        hour: 3,
        minute: 22,
        repeats: true,
      },
    });
  }

  return <Text>hey GN</Text>;
}
