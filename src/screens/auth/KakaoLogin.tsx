import { getProfile, login } from '@react-native-seoul/kakao-login';
import { OIDCAuthProvider, signInWithCredential, getAuth } from "@react-native-firebase/auth";
import { Pressable } from 'react-native';
import { IconSnsKakao } from '../../assets/svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { ScreenName } from '../../statics/constants/ScreenName';
import React from 'react';

interface KakaoLoginProps {
  onSuccess?: () => void;
  navigation?: any;
}

const signInWithKakao = async (onSuccess?: () => void, navigation?: any) => {
    try {
        // 1. 카카오 로그인 실행
        const token = await login();
    
        // 2. 카카오 사용자 프로필 정보 가져오기
        const profile = await getProfile();
    
        // 3. Firebase 커스텀 토큰 생성
        const credential = OIDCAuthProvider.credential(
            'kakao',
            token.idToken
        );

        // 4. Firebase 로그인
        const userCredential = await signInWithCredential(getAuth(), credential);

        // 5. 사용자 정보 저장
        const user = userCredential.user;

        // 6. 추가 사용자 정보 저장 (Firestore 등에 저장하는 경우)
        const userData = {
            uid: user.uid,
            email: profile.email,
            nickname: profile.nickname,
            profileImage: profile.profileImageUrl,
            kakaoId: profile.id,
            lastLoginAt: new Date().toISOString(),
        };

        // 7. 토큰 저장
        await AsyncStorage.setItem("userToken", token.accessToken);

        Toast.show({
          type: "success",
          text1: "카카오 로그인 성공",
        });

        if (onSuccess) {
          onSuccess();
        } else if (navigation) {
          navigation.navigate(ScreenName.Profiles);
        }

        return {
            user,
            userData,
            token: token.accessToken
        };

    } catch (error) {
        console.error('카카오 로그인 에러:', error);
    }
};

export const KakaoLogin: React.FC<KakaoLoginProps> = ({ onSuccess, navigation }) => {
    return (
        <Pressable onPress={() => signInWithKakao(onSuccess, navigation)}>
            <IconSnsKakao />
        </Pressable>
    );
};
