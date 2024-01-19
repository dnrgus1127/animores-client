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
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="모든할일" component={AllTodoScreen} />
    </Tab.Navigator>
  )
}

const App = () => {
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="홈">
            <Stack.Screen name="Tabs" component={Tabs} options={{ title: 'Tabs' }} />
            <Stack.Screen name="로그인" component={LoginScreen} options={{ title: '로그인' }} />
            <Stack.Screen name="회원가입" component={JoinScreen} options={{ title: '회원가입' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
