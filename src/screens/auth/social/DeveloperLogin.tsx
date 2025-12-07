import React from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { SocialLoginButton } from './SocialLoginButton';
import { socialLoginStyles } from './style';
import { ScreenName } from '../../../statics/constants/ScreenName';
import { DEVELOPER_MODE } from '../../../statics/constants/DeveloperMode';

export const DeveloperLogin: React.FC = () => {
  const navigation = useNavigation<any>();

  // 프로덕션 환경에서는 버튼 숨김
  if (!__DEV__) {
    return null;
  }

  const handleDeveloperLogin = async () => {
    try {
      // AsyncStorage에 개발자 모드 플래그 저장
      await AsyncStorage.setItem(DEVELOPER_MODE.STORAGE_KEY, 'true');

      // Toast 메시지 표시
      Toast.show({
        type: 'info',
        text1: '개발자 모드 로그인',
        text2: `개발자 계정 (userId: ${DEVELOPER_MODE.USER_ID})`,
      });

      // Profiles 화면으로 이동
      navigation.navigate(ScreenName.Profiles);
    } catch (error) {
      console.error('[DeveloperLogin] 개발자 로그인 에러:', error);
      Toast.show({
        type: 'error',
        text1: '개발자 로그인 실패',
        text2: '다시 시도해주세요.',
      });
    }
  };

  return (
    <SocialLoginButton
      icon={<View style={{ width: 24, height: 24 }} />}
      text="개발자용 로그인"
      buttonStyle={socialLoginStyles.developerButton}
      textStyle={socialLoginStyles.developerText}
      onPress={handleDeveloperLogin}
    />
  );
};
