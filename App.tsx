import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// navigate pages
import { NavigationContainer } from "@react-navigation/native";
import FullScreenStackNavigator from "./src/navigation/FullScreenStackNavigator";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <FullScreenStackNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
