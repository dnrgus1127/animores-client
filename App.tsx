import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

//navigate pages
import { NavigationContainer } from "@react-navigation/native";
import FullScreenStackNavigator from "./src/navigation/FullScreenStackNavigator";

//redux
import { store } from "./src/redux/store/index";
import { Provider } from "react-redux";
 
const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <FullScreenStackNavigator />
          </NavigationContainer>
          <Toast />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
