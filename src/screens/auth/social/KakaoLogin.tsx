import { getProfile, login } from '@react-native-seoul/kakao-login';
import {
	OIDCAuthProvider,
	signInWithCredential,
	getAuth,
} from '@react-native-firebase/auth';
import { IconSnsKakao } from '../../../assets/svg';
import React from 'react';
import { socialLoginStyles } from './style';
import { SocialLoginButton } from './SocialLoginButton';
import { useSocialLogin } from '../hooks/useSocialLogin';

interface KakaoLoginProps {
	onSuccess?: () => void;
}

export const signInWithKakao = async () => {
	try {
		// 1. 카카오 로그인 실행
		const token = await login();

		// 2. 카카오 사용자 프로필 정보 가져오기
		const profile = await getProfile();

		// 3. Firebase 커스텀 토큰 생성
		const credential = OIDCAuthProvider.credential('kakao', token.idToken);

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

		return {
			user,
			userData,
			token: token.accessToken,
		};
	} catch (error) {
		if (__DEV__) {
			console.error('카카오 로그인 에러:', error);
		}
		// TODO: 프로덕션에서는 Sentry 등 에러 트래킹 도구로 전송
		throw error;
	}
};

export const KakaoLogin: React.FC<KakaoLoginProps> = ({ onSuccess }) => {
	const { handleSuccess, handleError } = useSocialLogin({ onSuccess });

	const handleKakaoLogin = async () => {
		try {
			const result = await signInWithKakao();
			await handleSuccess(result.user, result.token, '카카오', 'kakao');
		} catch (error) {
			handleError(error, '카카오');
		}
	};

	return (
		<SocialLoginButton
			icon={<IconSnsKakao width={24} height={24} />}
			text="카카오로 시작하기"
			buttonStyle={socialLoginStyles.kakaoButton}
			textStyle={socialLoginStyles.kakaoText}
			onPress={handleKakaoLogin}
		/>
	);
};
