import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from 'react';
import { Text } from "react-native";
import { BottomTabStackParamList } from "../../types/BottomTabStackParamList";
import HomeScreen from '../screens/home/HomeScreen';
import RecordScreen from '../screens/record/RecordScreen';
import AllTodoScreen from '../screens/todo';

const BottomTabStack = createBottomTabNavigator<BottomTabStackParamList>();

const BottomTabStackNavigator = () => {
	return (
    <BottomTabStack.Navigator>
      <BottomTabStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "홈",
          tabBarLabel: "홈",
          tabBarIcon: () => <Text>🏠</Text>,
          headerShown: false
        }}
      />
      <BottomTabStack.Screen
        name="AllTodo"
        component={AllTodoScreen}
        options={{
          title: "모든할일",
          tabBarLabel: "모든할일",
          tabBarIcon: () => <Text>📜</Text>,
          headerShown: false
        }}
      />
      <BottomTabStack.Screen
        name="Record"
        component={RecordScreen}
        options={{
          title: "일지",
          tabBarLabel: "일지",
          headerShown: false,
          tabBarIcon: () => <Text>📜</Text>,
        }}
      />
    </BottomTabStack.Navigator>
  );
};

export default BottomTabStackNavigator;