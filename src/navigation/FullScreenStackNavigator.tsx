import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import JoinScreen from "../screens/auth/JoinScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import CreateRecord from "../screens/record/CreateRecord";
import { ScreenName } from "../statics/constants/ScreenName";
import BottomTabNavigator from "./BottomTabNavigator";
import AddTodo from "../screens/todo/AddTodo";

const Stack = createNativeStackNavigator();

const FullScreenStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={ScreenName.BottomTabNavigator}
    >
      <Stack.Screen
        name="Tabs"
        component={BottomTabNavigator}
        options={{ title: "Tabs" }}
      />
      <Stack.Screen
        name={ScreenName.Login}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenName.Join}
        component={JoinScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenName.CreateRecord}
        component={CreateRecord}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenName.AddTodo}
        component={AddTodo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default FullScreenStackNavigator;
