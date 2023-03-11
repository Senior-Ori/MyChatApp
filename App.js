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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [additionalText, setAdditionalText] = useState("");

  const handleEmailInput = (text) => {
    setEmail(text);
  };

  const handlePasswordInput = (text) => {
    setPassword(text);
  };

  const handleAdditionalTextInput = (text) => {
    setAdditionalText(text);
  };

  const handleSubmit = () => {
    // do something with the email, password, and additional text
    console.log(email, password, additionalText);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={handleEmailInput}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={handlePasswordInput}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Additional text"
        value={additionalText}
        onChangeText={handleAdditionalTextInput}
      />
      <Button style={styles.button} title="Submit" onPress={handleSubmit} />
      {/* <Register /> */}
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
});
