import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text, ScrollView, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Toast from "react-native-toast-message";

import HeaderNavigation from "../../navigation/HeaderNavigation";
import { Colors } from "../../styles/Colors";
import { nicknameRegex } from "../../js/util";
import { AuthModel } from "../../model/AuthModel";
import { AuthService } from "../../service/AuthService";
import { ProfileService } from "../../service/ProfileService";
import AgreementOnTerms from "./AgreementOnTerms";
import { ScreenName } from "../../statics/constants/ScreenName";
import { RootStackParams } from "../../../types/RootStackParams";
import Title from "../../components/text/Title";

type SocialSignupScreenRouteProp = RouteProp<RootStackParams, 'SocialSignup'>;
type SocialSignupScreenNavigationProp = StackNavigationProp<RootStackParams, 'SocialSignup'>;

const SocialSignupScreen = () => {
  const navigation = useNavigation<SocialSignupScreenNavigationProp>();
  const route = useRoute<SocialSignupScreenRouteProp>();
  const { firebaseUser, provider } = route.params;

  const { control, handleSubmit, getValues, watch } = useForm({ mode: "onChange" });

  // Nickname 중복 확인 상태
  const [nicknameState, setNicknameState] = useState<AuthModel.INicknameModel["state"]>("none");

  // 약관 동의
  const [agreements, setAgreements] = useState<string[]>([]);

  // 필수정보 입력 확인
  const [validation, setValidation] = useState({
    nickname: false,
    agreements: false,
  });

  // Nickname - 입력 시
  const handleOnChangeNickname = (inputText: string) => {
    const matchNickname = inputText.match(nicknameRegex);

    if (matchNickname === null) {
      setValidation((prev) => ({ ...prev, nickname: false }));
      setNicknameState("none");
    } else {
      setValidation((prev) => ({ ...prev, nickname: true }));
      setNicknameState("success");
    }
  };

  // 약관 동의 상태 변경
  const handleAgreementsChange = (newAgreements: string[], valid: boolean) => {
    setAgreements(newAgreements);
    setValidation((prev) => ({ ...prev, agreements: valid }));
  };

  // 닉네임 중복 확인
  const checkNickname = async (nickname: string): Promise<boolean> => {
    try {
      const response = await AuthService.Auth.checkNickname(nickname);

      if (response.data) {
        // 중복된 닉네임
        Toast.show({
          type: "error",
          text1: "이미 사용중인 닉네임입니다",
          text2: "다른 닉네임을 입력해주세요",
        });
        return false;
      } else {
        // 사용 가능한 닉네임
        return true;
      }
    } catch (error) {
      console.error('닉네임 확인 에러:', error);
      Toast.show({
        type: "error",
        text1: "닉네임 확인 중 오류가 발생했습니다",
      });
      return false;
    }
  };

  // 회원가입 처리 (닉네임 설정)
  const onRegisterPressed = async () => {
    try {
      const nickname = getValues("nickname");

      // 닉네임 중복 확인
      const isNicknameAvailable = await checkNickname(nickname);
      if (!isNicknameAvailable) {
        return; // 중복된 닉네임이면 중단
      }

      // 닉네임 업데이트 (최초 가입자 닉네임 설정)
      // ProfileService.profile.updateNickname은 정의상 FormData를 받지만,
      // 실제 구현은 JSON을 기대하므로 객체를 전달합니다.
      const response = await ProfileService.profile.updateNickname({ nickname } as any);

      if (response.status === 200 || response.status === 204) {
        Toast.show({
          type: "success",
          text1: "회원가입이 완료되었습니다",
          text2: `${nickname}님 환영합니다!`,
        });

        // Profiles 화면으로 이동
        navigation.navigate(ScreenName.Profiles);
      } else {
        Toast.show({
          type: "error",
          text1: "회원가입 처리에 실패했습니다",
          text2: "다시 시도해주세요",
        });
      }
    } catch (error) {
      console.error('회원가입(닉네임 설정) 에러:', error);
      Toast.show({
        type: "error",
        text1: "회원가입 중 오류가 발생했습니다",
      });
    }
  };

  // 모든 validation 체크
  const isFormValid = Object.values(validation).every((item) => item === true);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNavigation middletitle="회원가입" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* 환영 메시지 */}
          <View style={styles.welcomeSection}>
            <Title text="환영합니다!" fontSize={24} fontWeight="bold" />
            <Title
              text={`${provider === 'google' ? 'Google' : provider === 'kakao' ? 'Kakao' : 'Apple'} 계정으로 로그인하셨습니다`}
              fontSize={14}
              color={Colors.AEAEAE}
              style={{ marginTop: 8 }}
            />
            <Title
              text="추가 정보를 입력해주세요"
              fontSize={14}
              color={Colors.AEAEAE}
              style={{ marginTop: 4 }}
            />
          </View>

          {/* 닉네임 입력 */}
          <View style={styles.section}>
            <Text style={styles.label}>
              닉네임 <Text style={styles.required}>*</Text>
            </Text>
            <Controller
              control={control}
              name="nickname"
              rules={{
                required: true,
                pattern: nicknameRegex,
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.nicknameInput}
                  placeholder="닉네임을 입력하세요"
                  value={value}
                  onChangeText={(text) => {
                    onChange(text);
                    handleOnChangeNickname(text);
                  }}
                />
              )}
            />
            {nicknameState === "success" && (
              <Text style={styles.successText}>✓ 사용 가능한 형식입니다</Text>
            )}
            <Text style={styles.helperText}>한글, 영문, 숫자 2-10자</Text>
          </View>

          {/* 약관 동의 */}
          <View style={styles.section}>
            <AgreementOnTerms checkedAgreements={handleAgreementsChange} />
          </View>

          {/* 회원가입 버튼 */}
          <View style={styles.buttonSection}>
            {isFormValid ? (
              <Pressable
                onPress={onRegisterPressed}
                style={styles.signupButton}
              >
                <Text style={styles.signupButtonText}>회원가입 완료</Text>
              </Pressable>
            ) : (
              <Pressable
                disabled
                style={[styles.signupButton, styles.signupButtonDisabled]}
              >
                <Text style={[styles.signupButtonText, styles.signupButtonTextDisabled]}>
                  회원가입 완료
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  welcomeSection: {
    marginBottom: 32,
    marginTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.Black,
    marginBottom: 8,
  },
  required: {
    color: Colors.FF4040,
  },
  nicknameInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: Colors.White,
  },
  successText: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 4,
  },
  helperText: {
    fontSize: 12,
    color: Colors.AEAEAE,
    marginTop: 4,
  },
  buttonSection: {
    marginTop: 32,
    marginBottom: 40,
  },
  signupButton: {
    backgroundColor: Colors.Pink,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  signupButtonDisabled: {
    backgroundColor: Colors.DBDBDB,
  },
  signupButtonText: {
    color: Colors.White,
    fontSize: 16,
    fontWeight: "bold",
  },
  signupButtonTextDisabled: {
    color: Colors.AEAEAE,
  },
});

export default SocialSignupScreen;
