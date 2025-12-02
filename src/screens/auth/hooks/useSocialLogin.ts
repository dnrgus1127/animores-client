import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { ScreenName } from "../../../statics/constants/ScreenName";
import AxiosContext from "../../context/AxiosContext";

interface UseSocialLoginProps {
  onSuccess?: () => void;
}

export const useSocialLogin = ({ onSuccess }: UseSocialLoginProps = {}) => {
  const navigation = useNavigation<any>();

  const handleSuccess = async (
    firebaseUser: any,
    token: string,
    providerName: string,
    provider: 'google' | 'kakao' | 'apple'
  ) => {
    try {
      // ============================================================
      // 특수 상황: nickName 기반 최초 가입자 판별 로직
      // ============================================================
      // 현재 개발 상황으로 인해 사용자 존재 여부를 확인하는 별도의 API 대신,
      // 유저 정보를 직접 조회하여 nickName 필드의 null 여부로 최초 가입자를 판별합니다.
      // 
      // [판별 로직]
      // 1. /api/v1/account API를 호출하여 사용자 계정 정보를 조회
      // 2. nickName === null: 최초 가입자 → SocialSignup 화면으로 이동
      // 3. nickName !== null: 기존 가입자 → 로그인 처리 후 Profiles 화면으로 이동
      // 
      // [주의사항]
      // - 소셜 로그인 시 백엔드에서 자동으로 계정이 생성되지만 nickName은 null 상태
      // - 사용자가 회원가입 절차를 완료해야 nickName이 설정됨
      // - API 호출 실패 시에는 안전하게 회원가입 페이지로 이동
      // ============================================================

      try {
        // 사용자 계정 정보 조회
        const response = await AxiosContext.get(`/api/v1/account`);
        const userInfo = response.data;

        // nickName이 null이면 최초 가입자, 아니면 기존 가입자
        if (userInfo.nickName === null || userInfo.nickName === undefined) {
          // 최초 가입자 - 회원가입 페이지로 이동
          console.log(`[소셜 로그인] 최초 가입자 감지 (nickName: ${userInfo.nickName})`);

          navigation.navigate(ScreenName.SocialSignup, {
            firebaseUser: {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
            },
            provider,
          });
        } else {
          // 기존 가입자 - 로그인 처리
          console.log(`[소셜 로그인] 기존 가입자 로그인 (nickName: ${userInfo.nickName})`);

          // TODO: 백엔드에서 받은 토큰 저장 필요
          // await setTokens(response.data.accessToken, response.data.refreshToken);

          Toast.show({
            type: "success",
            text1: `${providerName} 로그인 성공`,
            text2: `${userInfo.nickName}님 환영합니다!`,
          });

          if (onSuccess) {
            onSuccess();
          } else {
            navigation.navigate(ScreenName.Profiles);
          }
        }
      } catch (apiError) {
        // ============================================================
        // API 호출 실패 시 안전하게 회원가입 페이지로 이동
        // ============================================================
        // 네트워크 오류, 인증 실패 등의 경우 사용자가 회원가입 절차를 
        // 다시 진행할 수 있도록 SocialSignup 화면으로 이동
        console.error(`[소셜 로그인] 사용자 정보 조회 실패:`, apiError);

        navigation.navigate(ScreenName.SocialSignup, {
          firebaseUser: {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
          },
          provider,
        });
      }
    } catch (error) {
      // Firebase 인증 자체의 에러 또는 예상치 못한 에러
      console.error(`${providerName} 로그인 후처리 에러:`, error);
      handleError(error, providerName);
    }
  };

  const handleError = (error: any, providerName: string) => {
    console.error(`${providerName} 로그인 에러:`, error);
    Toast.show({
      type: "error",
      text1: `${providerName} 로그인 실패`,
      text2: "다시 시도해주세요.",
    });
  };

  return {
    handleSuccess,
    handleError,
    navigation,
  };
};
