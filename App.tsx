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
import { ScreenName } from "./src/statics/constants/ScreenName";

const queryClient = new QueryClient();

LogBox.ignoreAllLogs();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isProfileSelected, setIsProfileSelected] = useState<boolean | null>(
    null
  );

  //TODO:프로필 선택하지 않고 앱 껐을 경우, 프로필 선택하는 화면 나오게 수정
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        setIsAuthenticated(!!token);

        const lastScreen = await AsyncStorage.getItem("lastScreen");
        setIsProfileSelected(lastScreen === ScreenName.Profiles);
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
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          {isAuthenticated ? (
            isProfileSelected ? (
              <AuthStackNavigation />
            ) : (
              <ProfilesScreen />
            )
          ) : (
            <GuestStackNavigation />
          )}
          <Toast />
        </GestureHandlerRootView>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
