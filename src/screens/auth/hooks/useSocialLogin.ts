import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { ScreenName } from "../../../statics/constants/ScreenName";

interface UseSocialLoginProps {
  onSuccess?: () => void;
}

export const useSocialLogin = ({ onSuccess }: UseSocialLoginProps = {}) => {
  const navigation = useNavigation<any>();

  const handleSuccess = async (token: string, providerName: string) => {
    try {
      // 성공 메시지 표시
      Toast.show({
        type: "success",
        text1: `${providerName} 로그인 성공`,
      });

      // 콜백 또는 네비게이션 처리
      if (onSuccess) {
        onSuccess();
      } else {
        navigation.navigate(ScreenName.Profiles);
      }
    } catch (error) {
      console.error(`${providerName} 로그인 후처리 에러:`, error);
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
