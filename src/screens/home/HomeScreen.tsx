import React from "react";
import { View, Text, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllTodoScreen from "../todo";

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }: any) => {
  
  return (
    <View style={{ flex: 1 }}>
      <Text>
        홈
      </Text>
    </View>
  )
}

export default HomeScreen