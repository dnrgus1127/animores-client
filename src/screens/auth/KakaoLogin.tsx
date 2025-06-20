import { getProfile, login } from '@react-native-seoul/kakao-login';
import { OIDCAuthProvider, signInWithCredential, getAuth } from "@react-native-firebase/auth";
import { Pressable } from 'react-native';
import { IconSnsKakao } from '../../assets/svg';

const signInWithKakao = async () => {
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
        console.log("userData", userData);

        // Firestore에 사용자 정보 저장 (선택사항)
        // await firestore().collection('users').doc(user.uid).set(userData, { merge: true });

        return {
            user,
            userData,
            token: token.accessToken
        };

    } catch (error) {
        console.error('카카오 로그인 에러:', error);

        // // 에러 타입에 따른 처리
        // if (error.code === 'auth/cancelled-popup-request') {
        //     throw new Error('로그인이 취소되었습니다.');
        // } else if (error.code === 'auth/network-request-failed') {
        //     throw new Error('네트워크 연결을 확인해주세요.');
        // } else {
        //     throw new Error('로그인 중 오류가 발생했습니다.');
        // }
    }
};

export const KakaoLogin = () => {
    return (
        <Pressable onPress={signInWithKakao}>
            <IconSnsKakao />
        </Pressable>
    );
};
