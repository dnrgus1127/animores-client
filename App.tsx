import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { RecoilRoot } from "recoil"
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast, { BaseToast } from "react-native-toast-message";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Entypo, Ionicons, FontAwesome } from "@expo/vector-icons";

//navigate pages
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import FullStackNavigation from "./src/navigation/FullStackNavigation";

const queryClient = new QueryClient();

LogBox.ignoreAllLogs();
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const checkAuth = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await checkAuth();
        // await Font.loadAsync({
        //   ...Ionicons.font,...Entypo.font, ...FontAwesome.font
        // });
      } catch (error) {
        console.error("Error loading assets and fonts", error);
      } finally {
        await SplashScreen.hideAsync();
        setAppIsReady(true);
      }
    };

    prepareApp();
  }, []);

  if (!appIsReady) {
    // 로딩 중일 때는 렌더링하지 않음
    return null;
  }

  return (
    <>
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
    </>
  );
};

export default App;
