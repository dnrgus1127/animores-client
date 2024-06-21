import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { BottomTabStackParamList } from "../../types/BottomTabStackParamList";
import CalendarScreen from "../screens/celendar/CalendarScreen";
import DiaryScreen from "../screens/diary/DiaryScreen";
import HomeScreen from "../screens/home/HomeScreen";
import MypageScreen from "../screens/myPage/MypageScreen";
import AllTodoScreen from "../screens/todo";
import { ScreenName } from "../statics/constants/ScreenName";
import TabBar from "./TabBar";

const Tab = createBottomTabNavigator<BottomTabStackParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={"Home"}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen
        name={ScreenName.AllTodo}
        component={AllTodoScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={ScreenName.Calendar}
        component={CalendarScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={ScreenName.Home}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={ScreenName.Diary}
        component={DiaryScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={ScreenName.Mypage}
        component={MypageScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
