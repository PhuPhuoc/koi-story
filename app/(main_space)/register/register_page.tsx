import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { router, Stack } from "expo-router";
import { THEME_COLOR } from "../../../constants/const";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { Register } from "../../../api/authen/auth_api";

interface RegisterFormFields {
  email: string;
  password: string;
  confirmPassword: string;
  userName: string;
}

const handleGoback = () => {
  router.back();
};

const RegisterPage = () => {
  const [formFields, setFormFields] = useState<RegisterFormFields>({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
  });

  const handleInputChange = (
    field: keyof RegisterFormFields,
    value: string
  ) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    const { email, password, confirmPassword, userName } = formFields;

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    const response = await Register(email, password, userName, confirmPassword);
    if ("data" in response) {
      Alert.alert("Registration successful:", response.message);
    } else {
      Alert.alert("Registration error:", response.log);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        source={require("../../../assets/register_bg.jpg")}
        style={styles.header}
        resizeMode="cover"
      >
        <Pressable onPress={handleGoback}>
          <Image
            source={require("../../../assets/icon_back2.png")}
            style={styles.iconback}
            resizeMode="center"
          />
        </Pressable>
        <View style={styles.headerText}>
          <Text style={styles.feng}>Feng</Text>
          <Text style={styles.shui}>Shui</Text>
        </View>
      </ImageBackground>
      <Text style={styles.createacc}>Create a new account</Text>
      <View style={styles.formContainer}>
        <View style={styles.formView}>
          <Feather name="user" size={20} color="#CDC9C9" />
          <View style={styles.line}></View>
          <TextInput
            style={styles.input}
            placeholder="User Name"
            keyboardType="email-address"
            value={formFields.userName}
            onChangeText={(text) => handleInputChange("userName", text)}
          />
        </View>
        <View style={styles.formView}>
          <Entypo name="email" size={20} color="#CDC9C9" />
          <View style={styles.line}></View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={formFields.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
        </View>
        <View style={styles.formView}>
          <MaterialCommunityIcons
            name="lock-check-outline"
            size={20}
            color="#CDC9C9"
          />
          <View style={styles.line}></View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={formFields.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
        </View>
        <View style={styles.formView}>
          <MaterialCommunityIcons name="lock-check" size={20} color="#CDC9C9" />
          <View style={styles.line}></View>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={formFields.confirmPassword}
            onChangeText={(text) => handleInputChange("confirmPassword", text)}
          />
        </View>
        <Pressable style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>REGISTER</Text>
        </Pressable>

        <View style={styles.registerContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Pressable onPress={handleGoback}>
            <Text style={styles.loginLink}>LOGIN</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 35,
    paddingVertical: 20,
    // borderColor: "red",
    // borderWidth: 1
  },
  iconback: {
    width: "15%",
    height: 60,
  },
  headerText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    // borderColor: "red",
    // borderWidth: 1
  },
  feng: {
    fontSize: 27,
    fontWeight: "bold",
    paddingStart: 23,
  },
  shui: {
    fontSize: 27,
    fontWeight: "bold",
    paddingEnd: 23,
  },
  createacc: {
    paddingHorizontal: 30,
    // paddingVertical: 10,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  formContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  welcomeContainer: {
    alignItems: "flex-start",
    paddingStart: 7,
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
  },
  formView: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#666",
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 17,
  },
  line: {
    backgroundColor: "#EEE9E9",
    height: "50%",
    width: 2,
    marginStart: 10,
  },
  input: {
    width: "77%",
    padding: 15,
    borderRadius: 5,
  },
  registerButton: {
    backgroundColor: THEME_COLOR,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  registerButtonText: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    fontWeight: "bold",
  },
  loginLink: {
    marginStart: 7,
    color: THEME_COLOR,
    fontWeight: "bold",
    borderBottomColor: THEME_COLOR,
    borderBottomWidth: 2,
  },
});

export default RegisterPage;
