import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from 'react';
import { Text } from "react-native";
import HomeScreen from '../screens/home/HomeScreen';
import RecordScreen from '../screens/record/RecordScreen';
import AllTodoScreen from '../screens/todo';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
	return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "홈",
          tabBarLabel: "홈",
          tabBarIcon: () => <Text>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="AllTodo"
        component={AllTodoScreen}
        options={{
          title: "모든할일",
          tabBarLabel: "모든할일",
          tabBarIcon: () => <Text>📜</Text>,
        }}
      />
      <Tab.Screen
        name="Record"
        component={RecordScreen}
        options={{
          title: "일지",
          tabBarLabel: "일지",
          headerShown: false,
          tabBarIcon: () => <Text>📜</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;