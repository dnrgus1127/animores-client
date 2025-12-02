import React from 'react';
import { IconSnsApple } from '../../../assets/svg';
import { socialLoginStyles } from './style';
import { SocialLoginButton } from './SocialLoginButton';
import { useSocialLogin } from '../hooks/useSocialLogin';

interface AppleLoginProps {
  onSuccess?: () => void;
}

export const signInWithApple = async () => {
  try {
    // TODO: 애플 로그인 로직 구현
    console.log('애플 로그인 미구현');

    // 임시로 성공 응답 반환 (실제 구현 시 제거)
    return {
      user: null,
      token: 'temp_apple_token'
    };
  } catch (error) {
    console.error('애플 로그인 에러:', error);
    throw error;
  }
};

export const AppleLogin: React.FC<AppleLoginProps> = ({ onSuccess }) => {
  const { handleSuccess, handleError } = useSocialLogin({ onSuccess });

  const handleAppleLogin = async () => {
    try {
      const result = await signInWithApple();
      await handleSuccess(result.user, result.token, 'Apple', 'apple');
    } catch (error) {
      handleError(error, 'Apple');
    }
  };

  return (
    <SocialLoginButton
      icon={<IconSnsApple width={24} height={24} />}
      text="Apple로 계속하기(미구현)"
      buttonStyle={socialLoginStyles.appleButton}
      textStyle={socialLoginStyles.appleText}
      onPress={handleAppleLogin}
    />
  );
}; 