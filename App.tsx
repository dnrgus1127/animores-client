import React from "react";
import { View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// navigate pages
import HomeScreen from "./src/screens/home/HomeScreen";
import AllTodoScreen from "./src/screens/todo";
import LoginScreen from "./src/screens/auth/LoginScreen";
import JoinScreen from "./src/screens/auth/JoinScreen";

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
          tabBarIcon: () => (
            <Text>🏠</Text>
          )
        }} 
      />
      <Tab.Screen 
        name="AllTodo" 
        component={AllTodoScreen} 
        options={{ 
          title: "모든할일",
          tabBarLabel: "모든할일",
          tabBarIcon: () => (
            <Text>📜</Text>
          )
        }} 
      />
    </Tab.Navigator>
  )
}

const App = () => {
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
            <Stack.Screen name="Tabs" component={Tabs} options={{ title: 'Tabs' }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: '로그인' }} />
            <Stack.Screen name="Join" component={JoinScreen} options={{ title: '회원가입' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
