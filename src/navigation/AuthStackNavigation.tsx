import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParams } from "../../types/RootStackParams";
import JoinScreen from "../screens/auth/JoinScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import CreateDiary from "../screens/diary/CreateDiary";
import AlertSettingScreen from "../screens/myPage/alert/AlertSettingScreen";
import CustomerServiceScreen from "../screens/myPage/customerService/CustomerServiceScreen";
import InformationScreen from "../screens/myPage/information/InformationScreen";
import NoticeScreen from "../screens/myPage/notice/NoticeScreen";
import AddPet from "../screens/myPage/petManagement/AddPet";
import BreedType from "../screens/myPage/petManagement/BreedType";
import PatManagementScreen from "../screens/myPage/petManagement/PatManagementScreen";
import PetType from "../screens/myPage/petManagement/PetType";
import ProfileScreen from "../screens/myPage/profile/ProfileScreen";
import AddTodo from "../screens/todo/AddTodo";
import { ScreenName } from "../statics/constants/ScreenName";
import BottomTabStackNavigator from "./BottomTabStackNavigator";

const RootStack = createNativeStackNavigator<RootStackParams>();

const AuthStackNavigation = () => {
  return (
    <SafeAreaView
      style={styles.container}
      edges={["left", "right", "bottom", "top"]}
    >
      <RootStack.Navigator>
        <RootStack.Screen
          name={ScreenName.BottomTab}
          component={BottomTabStackNavigator}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={ScreenName.CreateDiary}
          component={CreateDiary}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={ScreenName.AddTodo}
          component={AddTodo}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={ScreenName.AlertSetting}
          component={AlertSettingScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={ScreenName.CustomerService}
          component={CustomerServiceScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={ScreenName.Information}
          component={InformationScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={ScreenName.Notice}
          component={NoticeScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={ScreenName.PatManagement}
          component={PatManagementScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={ScreenName.Profile}
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={ScreenName.PetType}
          component={PetType}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={ScreenName.BreedType}
          component={BreedType}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={ScreenName.AddPet}
          component={AddPet}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </SafeAreaView>
  );
};

export default AuthStackNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});