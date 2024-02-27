import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

// navigate pages
import HomeScreen from "./src/screens/home/HomeScreen";
import AllTodoScreen from "./src/screens/todo";
import LoginScreen from "./src/screens/auth/LoginScreen";
import JoinScreen from "./src/screens/auth/JoinScreen";
import RecordScreen from "./src/screens/record/RecordScreen";
import CreatRecord from "./src/screens/record/CreatRecord";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RootLayout = () => {
  return <App />;
};

export default RootLayout;

const Tabs = () => {
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
}

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Home"
          >
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{ title: "Tabs" }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Join"
              component={JoinScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateRecord"
              component={CreatRecord}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    color: '#2D2D2D',
    fontSize: 18,
  }
})