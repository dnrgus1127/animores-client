import React from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "@react-native-firebase/auth";
import { IconSnsGoogle } from "../../../assets/svg";
import { socialLoginStyles } from "./style";
import { SocialLoginButton } from "./SocialLoginButton";
import { useSocialLogin } from "../hooks/useSocialLogin";

interface GoogleLoginProps {
  onSuccess?: () => void;
}

export const signInWithGoogle = async () => {
  try {
    // Google Play 서비스 지원 여부 확인
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // 사용자의 ID 토큰 획득
    const signInResult = await GoogleSignin.signIn();

    // 토큰으로 Google 인증 정보 생성
    const { idToken } = signInResult;
    const googleCredential = GoogleAuthProvider.credential(idToken);

    // Firebase에 사용자 로그인
    const auth = getAuth();
    const userCredential = await signInWithCredential(auth, googleCredential);
    console.log("userCredential", userCredential);

    // Firebase ID 토큰 획득
    const firebaseIdToken = await userCredential.user.getIdToken();

    return {
      user: userCredential.user,
      token: firebaseIdToken,
    };
  } catch (error: any) {
    console.error("Google 로그인 에러", {
      code: error.code,
      message: error.message,
      stack: error.stack,
      name: error.name,
      statusCode: error.statusCode,
      status: error.status,
      playServicesAvailable: await GoogleSignin.hasPlayServices(),
      isSignedIn: await GoogleSignin.isSignedIn(),
    });
    throw error;
  }
};

export const GoogleLogin: React.FC<GoogleLoginProps> = ({ onSuccess }) => {
  const { handleSuccess, handleError } = useSocialLogin({ onSuccess });

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      await handleSuccess(result.user, result.token, "Google", "google");
    } catch (error) {
      handleError(error, "Google");
    }
  };

  return (
    <SocialLoginButton
      icon={<IconSnsGoogle width={24} height={24} />}
      text="구글로 계속하기"
      buttonStyle={socialLoginStyles.googleButton}
      textStyle={socialLoginStyles.googleText}
      onPress={handleGoogleLogin}
    />
  );
};
