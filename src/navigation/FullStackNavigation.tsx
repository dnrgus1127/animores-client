import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import {StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {RootStackParams} from "../../types/RootStackParams";
import JoinCompleted from "../screens/auth/JoinCompleted";
import JoinScreen from "../screens/auth/JoinScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import CreateDiary from "../screens/diary/CreateDiary";
import HomeScreen from "../screens/home/HomeScreen";
import NewPassword from "../screens/myPage/password/NewPassword";
import ResetPassword from "../screens/myPage/password/ResetPassword";
import UserVerification from "../screens/myPage/password/UserVerification";
import CreateProfile from "../screens/myPage/profile/CreateProfile";
import EditProfileScreen from "../screens/myPage/profile/EditProfile";
import ProfileManagementScreen from "../screens/myPage/profile/ProfileManagementScreen";
import ProfilesScreen from "../screens/myPage/profile/ProfilesScreen";
import AddTodo from "../screens/todo/AddTodo";
import {ScreenName} from "../statics/constants/ScreenName";
import BottomTabNavigator from "./BottomTabStackNavigator";
import {PetManagementScreen} from "../screens/myPage/petManagement/PetManagementHome";

const RootStack = createNativeStackNavigator<RootStackParams>();

interface FullStackNavigationProps {
  isAuthenticated: boolean;
}

const FullStackNavigation: React.FC<FullStackNavigationProps> = ({ isAuthenticated }) => {
  return (
    <SafeAreaView
      style={styles.container}
      edges={["left", "right", "bottom", "top"]}
    >
      <RootStack.Navigator
        initialRouteName={isAuthenticated ? ScreenName.Profiles : ScreenName.Login}
      >
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
          name={ScreenName.JoinCompleted}
          component={JoinCompleted}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={ScreenName.Profiles}
          component={ProfilesScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={ScreenName.CreateProfile}
          component={CreateProfile}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={ScreenName.UserVerification}
          component={UserVerification}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={ScreenName.ResetPassword}
          component={ResetPassword}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={ScreenName.NewPassword}
          component={NewPassword}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={ScreenName.Home}
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={ScreenName.BottomTab}
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={ScreenName.ProfileManagement}
          component={ProfileManagementScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={ScreenName.EditProfile}
          component={EditProfileScreen}
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
          name={ScreenName.PetManagement}
          component={PetManagementScreen}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </SafeAreaView>
  );
};

export default FullStackNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});