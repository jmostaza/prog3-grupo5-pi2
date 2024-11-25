import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { auth } from "../firebase/config";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      login: false,
      errorEmail: "",
      errorPassword: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("HomeMenu");
      }
    });
  }

  validateEmail(email) {
    return email.includes("@");
  }

  validatePassword(password) {
    return password.length >= 6;
  }

  HandleEmail() {
    const { email } = this.state;

    if (email === "") {
      this.setState({ errorEmail: "Email field cannot be empty" });
      return false;
    } else if (!this.validateEmail(email)) {
      this.setState({ errorEmail: "Incorrectly formatted email, missing @" });
      return false;
    } else {
      this.setState({ errorEmail: "" });
      return true;
    }
  }

  HandlePassword() {
    const { password } = this.state;
    if (password === "") {
      this.setState({
        errorPassword: "Password field cannot be empty",
      });
      return false;
    } else if (!this.validatePassword(password)) {
      this.setState({
        errorPassword:
          "The password must be more than 6 digits",
      });
      return false;
    } else {
      this.setState({ errorPassword: "" });
      return true;
    }
  }

  onSubmit() {
    const isEmailValid = this.HandleEmail();
    const isPasswordValid = this.HandlePassword();

    if (isEmailValid && isPasswordValid) {
      const { email, password } = this.state;
      auth
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          this.setState({ login: true, errorEmail: "", errorPassword: "" });
          this.props.navigation.navigate("HomeMenu");
          return;
        })
        .catch((error) => {
          this.setState({ errorEmail: "", errorPassword: "Login failed" });
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Estas en login</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        {this.state.errorEmail ? (
          <Text style={styles.errorText}>{this.state.errorEmail}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />
        {this.state.errorPassword ? (
          <Text style={styles.errorText}>{this.state.errorPassword}</Text>
        ) : null}
        <TouchableOpacity onPress={() => this.onSubmit()} style={styles.button}>
          <Text style={styles.buttonText}>Loguearme</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Ir al registro</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#303841",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#EEEEEE",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: "#EEEEEE",
    textAlign: "center",
  },
  input: {
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#4F709C",
    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: "#3A4750",
    fontSize: 16,
    color: "#EEEEEE",
  },
  errorText: {
    color: "#B22222",
    fontSize: 15,
    marginBottom: 10,
    fontStyle: "italic",
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "#4F709C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    alignSelf: "center",
  },
  buttonText: {
    color: "#EEEEEE",
    fontWeight: "bold",
    fontSize: 16,
  },
});
