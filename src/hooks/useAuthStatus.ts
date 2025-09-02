import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { GOOGLE_CLIENT_ID } from "@env";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

/**
 * 인증 상태를 확인하고, 인증 여부와 로딩 상태를 반환하는 커스텀 훅입니다.
 *
 * @returns {Object} 인증 상태와 로딩 상태를 포함한 객체
 * @property {boolean} isAuthenticated - 사용자가 인증되었는지 여부
 * @property {boolean} loading - 인증 상태 확인 중 로딩 여부
 *
 * @example
 * const { isAuthenticated, loading } = useAuthStatus();
 * if (loading) return <LoadingSpinner />;
 * if (isAuthenticated) return <MainScreen />;
 * else return <LoginScreen />;
 */

const useAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 구글 로그인 설정
    GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_ID,
      offlineAccess: false, // 오프라인 액세스 비활성화
    });
  }, []);

  useEffect(() => {
    // 인증 상태 변경 감지
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { isAuthenticated, loading };
};

export default useAuthStatus;
