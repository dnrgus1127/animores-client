import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { RecoilRoot } from "recoil";

//navigate pages
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import FullStackNavigation from "./src/navigation/FullStackNavigation";

// firebase
import useAuthStatus from "./src/hooks/useAuthStatus";
import "./src/service/firebase"; // Firebase 초기화를 위해 import

const queryClient = new QueryClient();

LogBox.ignoreAllLogs();
SplashScreen.preventAutoHideAsync();

const App = () => {
  const { isAuthenticated, loading: authLoading } = useAuthStatus();
  // TODO 인증 이외의 로딩이 필요한 작업(예: 초기 데이터 로드) 추가 시 loading 변수에 추가
  const loading = authLoading;

  useEffect(() => {
    const prepareApp = async () => {
      if (!loading) {
        await SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, [loading]);

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
