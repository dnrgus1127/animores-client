import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { GOOGLE_CLIENT_ID } from "@env";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const useAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_ID,
      offlineAccess: false, // 오프라인 액세스 비활성화
    });
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // AsyncStorage에서 토큰 확인
        const userToken = await AsyncStorage.getItem("userToken");

        if (userToken) {
          // Firebase 인증 상태 확인
          const auth = getAuth();
          return new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => {
              if (user) {
                setIsAuthenticated(true);
              } else {
                // 토큰이 있지만 Firebase 인증이 만료된 경우
                // firebase의 경우 refresh token도 firebase SDK 가 처리해주기 때문에 프론트에서 추가적으로 구현하지 않아도 됨
                AsyncStorage.removeItem("userToken");
                setIsAuthenticated(false);
              }
              resolve(true);
            });
          });
        } else {
          setIsAuthenticated(false);
          return Promise.resolve(true);
        }
      } catch (error) {
        console.error("자동 로그인 확인 중 에러 발생:", error);
        setIsAuthenticated(false);
        return Promise.resolve(true);
      }
    };

    checkAuth().finally(() => setLoading(false));
  }, []);

  return { isAuthenticated, loading };
};

export default useAuthStatus;
