import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native";

// navigate pages
import JoinScreen from "./JoinScreen";

const Stack = createStackNavigator();

const LoginScreen = () => {
  return (
    <View>
      <Text>
        로그인
      </Text>
    </View>
  )
}

export default LoginScreen