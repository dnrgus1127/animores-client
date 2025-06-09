import React from 'react';
import { Pressable } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { ScreenName } from '../../statics/constants/ScreenName';
import {IconSnsGoogle } from '../../assets/svg';

interface GoogleLoginProps {
  onSuccess?: () => void;
  navigation?: any;
}

export const GoogleLogin: React.FC<GoogleLoginProps> = ({ onSuccess, navigation }) => {
  const handleGoogleLogin = async () => {
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
      
      // Firebase ID 토큰 획득
      const firebaseIdToken = await userCredential.user.getIdToken();
      
      // 토큰 저장
      await AsyncStorage.setItem("userToken", firebaseIdToken);
    //   console.log("firebaseIdToken", firebaseIdToken);

      Toast.show({
        type: "success",
        text1: "Google 로그인 성공",
      });

      if (onSuccess) {
        onSuccess();
      } else if (navigation) {
        navigation.navigate(ScreenName.Profiles);
      }
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
    }
  };

  return (
    <Pressable onPress={handleGoogleLogin}>
      <IconSnsGoogle />
    </Pressable>
  );
};
