import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React, {useEffect, useState} from "react";
import {RecoilRoot} from "recoil"
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from 'expo-font';
import {View} from 'react-native';

//navigate pages
import {NavigationContainer} from "@react-navigation/native";
import {LogBox} from "react-native";
import FullStackNavigation from "./src/navigation/FullStackNavigation";

const queryClient = new QueryClient();

LogBox.ignoreAllLogs();
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [appIsReady, setAppIsReady] = useState(false);
  
  const [fontsLoaded, fontError] = useFonts({
    'Pretendard': require('./src/assets/fonts/Pretendard-Regular.otf'),
    'Pretendard-Medium': require('./src/assets/fonts/Pretendard-Medium.otf'),
    'Pretendard-SemiBold': require('./src/assets/fonts/Pretendard-SemiBold.otf'),
    'Pretendard-Bold': require('./src/assets/fonts/Pretendard-Bold.otf'),
  });

  useEffect(() => {
    if (fontError) {
      console.error('Font loading error:', fontError);
    }
  }, [fontError]);

  const checkAuth = async () => {
    // const token = await AsyncStorage.getItem("accessToken");
    setIsAuthenticated(true);
  };

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await checkAuth();
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      } catch (error) {
        console.error("Error loading assets and fonts", error);
      } finally {
        setAppIsReady(true);
      }
    };

    prepareApp();
  }, [fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
    // 로딩 중일 때는 렌더링하지 않음
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
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
    </View>
  );
};

export default App;
