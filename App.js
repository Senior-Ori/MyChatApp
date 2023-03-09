import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { auth } from "./config/firebase";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    specialKey: "",
  };

  handleLogin = () => {
    console.log("auth:", auth); // add this line
    const { email, password } = this.state;
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // handle successful login here
      })
      .catch((error) => {
        // handle login error here
      });
  };

  handleSignup = () => {
    console.log("auth:", auth); // add this line
    const { email, password } = this.state;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        // handle successful signup here
      })
      .catch((error) => {
        // handle signup error here
      });
  };

  render() {
    return (
      <View>
        <Text>Email:</Text>
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
        />
        <Text>Password:</Text>
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          secureTextEntry
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button title="Signup" onPress={this.handleSignup} />
      </View>
    );
  }
}

export default Login;
