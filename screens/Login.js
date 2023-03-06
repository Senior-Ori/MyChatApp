import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
const backImage = require("../assets/I-made-an-illustration-inspired-by-Windows-95-and-90s-anime.png");

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login success"))
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };
}
