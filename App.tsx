import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RootLayout = () => {
  return <App />;
};

export default RootLayout;

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider></SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
