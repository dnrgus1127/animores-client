import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import JoinScreen from "../screens/auth/JoinScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import AlertSettingScreen from "../screens/myPage/AlertSettingScreen";
import CustomerServiceScreen from "../screens/myPage/CustomerServiceScreen";
import InformationScreen from "../screens/myPage/InformationScreen";
import NoticeScreen from "../screens/myPage/NoticeScreen";
import PatManagementScreen from "../screens/myPage/PatManagementScreen";
import ProfileScreen from "../screens/myPage/ProfileScreen";;
import CreateRecord from "../screens/record/CreateRecord";
import AddTodo from "../screens/todo/AddTodo";
import { ScreenName } from "../statics/constants/ScreenName";
import BottomTabNavigator from "./BottomTabNavigator";

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
      <Stack.Screen
        name={ScreenName.Profile}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenName.PatManagement}
        component={PatManagementScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenName.AlertSetting}
        component={AlertSettingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenName.Notice}
        component={NoticeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenName.CustomerService}
        component={CustomerServiceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenName.Information}
        component={InformationScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default FullScreenStackNavigator;
