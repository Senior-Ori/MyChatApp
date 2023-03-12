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
  return (
    <View style={styles.container}>
      <View>
        <Text>puece of text</Text>
      </View>
      <Text style={styles.dummyText}>Hello world -_-</Text>
      <Button title="CLICK ME!" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: "10%",
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  dummyText: { margin: 16, padding: 16, borderWidth: 2, borderColor: "red" },
});
