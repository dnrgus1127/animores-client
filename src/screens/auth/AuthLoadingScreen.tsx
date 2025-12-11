import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import { Colors } from '../../styles/Colors';
import { ScreenName } from '../../statics/constants/ScreenName';
import { AuthErrorType } from '../../statics/constants/AuthErrorTypes';

type AuthLoadingScreenParams = {
  message?: string;
  timeout?: number;
};

type AuthLoadingScreenRouteProp = RouteProp<
  { AuthLoading: AuthLoadingScreenParams },
  'AuthLoading'
>;

const AuthLoadingScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<AuthLoadingScreenRouteProp>();
  const { message = '로그인 중입니다...', timeout = 15000 } = route.params || {};

  useEffect(() => {
    // 타임아웃 설정 (기본 15초)
    const timer = setTimeout(() => {
      // 타임아웃 시 에러 화면으로 이동
      navigation.replace(ScreenName.AuthError, {
        errorType: AuthErrorType.TIMEOUT,
      });
    }, timeout);

    return () => clearTimeout(timer);
  }, [navigation, timeout]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <LoadingSpinner message={message} />
      </View>
    </SafeAreaView>
  );
};

export default AuthLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
