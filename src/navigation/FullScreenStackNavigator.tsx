import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParams } from "../../types/RootStackParams";
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
import BottomTabStackNavigator from "./BottomTabStackNavigator";

const RootStack = createNativeStackNavigator<RootStackParams>();

const FullScreenStackNavigator = () => {
  return (
    <SafeAreaView
      style={styles.Container}
      edges={['left', 'right', 'bottom', 'top']}>
      <RootStack.Navigator>
        <RootStack.Screen
          name={ScreenName.BottomTab}
          component={BottomTabStackNavigator}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={ScreenName.Login}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={ScreenName.Join}
          component={JoinScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={ScreenName.CreateRecord}
          component={CreateRecord}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={ScreenName.AddTodo}
          component={AddTodo}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </SafeAreaView>
  );
};

export default FullScreenStackNavigator;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
});