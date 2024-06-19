import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

//navigate pages
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import AuthStackNavigation from "./src/navigation/AuthStackNavigation";
import GuestStackNavigation from "./src/navigation/GuestStackNavigation";
import ProfilesScreen from "./src/screens/myPage/profile/ProfilesScreen";

const queryClient = new QueryClient();

LogBox.ignoreAllLogs();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isProfileSelected, setIsProfileSelected] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        setIsAuthenticated(!!token);

        const profileSelected = await AsyncStorage.getItem("profiles");
        setIsProfileSelected(!!profileSelected);
      } catch (error) {
        console.error("Error token:", error);
        setIsAuthenticated(false);
        setIsProfileSelected(false);
      }
    };

    checkToken();
  }, []);

  if (isAuthenticated === null || isProfileSelected === null) {
    return null; //로딩 중일 때는 렌더링 하지 않음
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          {isAuthenticated ? (
            isProfileSelected ? (
              <AuthStackNavigation />
            ) : (
              <ProfilesScreen />
            )
          ) : (
            <GuestStackNavigation />
          )}
        </NavigationContainer>
        <Toast />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default App;
