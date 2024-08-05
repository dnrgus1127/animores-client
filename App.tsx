import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { RecoilRoot } from "recoil"
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

//navigate pages
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import FullStackNavigation from "./src/navigation/FullStackNavigation";

const queryClient = new QueryClient();

LogBox.ignoreAllLogs();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error("Error token:", error);
        setIsAuthenticated(false);
      }
    };

    checkToken();
  }, []);

  if (isAuthenticated === null) {
    // 로딩 중일 때는 렌더링하지 않음
    return null;
  }

  console.log('isAuthenticated', isAuthenticated)
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <FullStackNavigation isAuthenticated={isAuthenticated} />
            <Toast />
          </GestureHandlerRootView>
        </NavigationContainer>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
