import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Title from '../../components/text/Title';
import { Colors } from '../../styles/Colors';
import { ScreenName } from '../../statics/constants/ScreenName';
import {
  AuthErrorType,
  AUTH_ERROR_MESSAGES,
} from '../../statics/constants/AuthErrorTypes';

type AuthErrorScreenParams = {
  errorType?: AuthErrorType;
  customTitle?: string;
  customMessage?: string;
  onRetry?: () => void;
  retryParams?: any;
};

type AuthErrorScreenRouteProp = RouteProp<
  { AuthError: AuthErrorScreenParams },
  'AuthError'
>;

const AuthErrorScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<AuthErrorScreenRouteProp>();
  const {
    errorType = AuthErrorType.UNKNOWN,
    customTitle,
    customMessage,
    onRetry,
    retryParams,
  } = route.params || {};

  const errorMessage = AUTH_ERROR_MESSAGES[errorType];
  const title = customTitle || errorMessage.title;
  const message = customMessage || errorMessage.message;

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      // 기본 재시도 동작: 로그인 화면으로 이동
      navigation.navigate(ScreenName.Login);
    }
  };

  const handleGoToLogin = () => {
    navigation.navigate(ScreenName.Login);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.errorIconContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
        </View>

        <Title
          text={title}
          fontSize={20}
          fontWeight="bold"
          style={styles.title}
        />

        <Text style={styles.message}>{message}</Text>

        <View style={styles.buttonContainer}>
          <Pressable
            onPress={handleRetry}
            style={[styles.button, styles.retryButton]}
          >
            <Title text="다시 시도" color={Colors.White} fontSize={16} />
          </Pressable>

          <Pressable
            onPress={handleGoToLogin}
            style={[styles.button, styles.loginButton]}
          >
            <Title
              text="로그인 화면으로"
              color={Colors.FB3F7E}
              fontSize={16}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthErrorScreen;

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
  errorIconContainer: {
    marginBottom: 24,
  },
  errorIcon: {
    fontSize: 64,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: Colors.Gray717171,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  retryButton: {
    backgroundColor: Colors.FB3F7E,
  },
  loginButton: {
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.FB3F7E,
  },
});
