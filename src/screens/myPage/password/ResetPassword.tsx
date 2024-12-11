import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, Pressable, StyleSheet, TextInput, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import SingleButton from "../../../components/button/SingleButton";
import Title from "../../../components/text/Title";
import BasicInputBox from "../../../components/Input/BasicInputBox";
import { AuthModel } from "../../../model/AuthModel";
import { AuthService } from "../../../service/AuthService";
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import { RootStackParamList } from "../../../navigation/type";
import { ScreenName } from "../../../statics/constants/ScreenName";
import { Colors } from "../../../styles/Colors";
import { DeleteIcon } from "../../../assets/svg";
import Countdown from "../../../components/Countdown";
import { useRecoilValue } from "recoil";
import { UserEmailAtom } from "../../../recoil/AuthAtom";

interface IProps {
  email: string
}

const ResetPassword = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, ScreenName.ProfileManagement>
    >();
    
  const { control, handleSubmit } = useForm<AuthModel.IResetPwModel>();

  // Email 인증 상태
  const [verificationState, setVerificationState] = useState<AuthModel.IVerificationModel["state"]>("none")

  // 이메일 인증 카운트
  const [resetCount, setResetCount] = useState(false)

  const userEmail = useRecoilValue(UserEmailAtom);

  // 카운트다운
  const afterCountdown = () => {
    setVerificationState("timeout")
    setResetCount(false)
  }

  // 인증코드 재전송 클릭 시
  const refreshVerificationCode = () => {
    // 인증코드 입력필드, 에러 텍스트 초기화
    setVerificationState("none")

    // 새 인증번호 전송
    AuthService.Auth.emailVerificationCode(userEmail);

    // 카운트다운 재시작
    setResetCount(true)
  }

  const { mutate } = useMutation<
      Error,
      AuthModel.IResetPwModel
    >({
    mutationFn: async (data: AuthModel.IResetPwModel) => {
      return AuthService.Auth.verificationCodeCheck(data.code, data.email);
    },
    onSuccess: async (data: AuthModel.IResetPwModel) => {
      if (data.success) {		
        console.log(data.success, data.data);
        
        // 인증이 완료되면 새 비밀번호 설정 페이지로 이동
        navigation.navigate(ScreenName.NewPassword);
      } else {
        console.log(data.success);
        setVerificationState("dismatch");
      }
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "인증번호 전송 실패.",
      });
    },
  });

  const onsubmit = (data:AuthModel.IResetPwModel) => {
    mutate(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNavigation
        middletitle={"비밀번호 재설정"}
        onPressBackButton={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.paddingContainer}>
        <Title 
          text={"메일로 인증번호를 발송했습니다" + "\n" + "메일을 확인해주세요"} 
          fontSize={24}
          fontWeight="bold"
          style={{ marginTop: 30, marginBottom: 60 }}
        />
        <View style={[styles.inputWrap, { marginTop: 20 }]}>
          <Text style={[styles.label]}>이메일</Text>  
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>      
            <BasicInputBox
              name={"email"}
              placeholder="이메일을 입력해주세요"
              control={control}
              defaultValue={userEmail}
              style={styles.textDisabled}
              editable={false}
            />
            <Pressable
              style={[styles.inputButton]} 
              disabled={false}
              onPress={() => refreshVerificationCode()}
            >
              <Text>재전송</Text>
            </Pressable>
          </View>
          {/* <Text style={styles.successText}>인증이 완료된 이메일입니다.</Text> */}
        </View>

        <View style={[styles.inputWrap, { marginTop: 20 }]}>
          <Text style={[styles.label]}>인증번호</Text>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <BasicInputBox
              name={"code"}
              placeholder="인증번호를 입력해주세요"
              control={control}
            />
            <View
              style={{ position: "absolute", bottom: 0, right: 0, flexDirection: "row", height: 30 }}
            >
              <Countdown afterCountdown={afterCountdown} resetCount={resetCount} />
              <Pressable style={{ marginLeft: 8 }}>
                <DeleteIcon />
              </Pressable>
            </View>
          </View>
          {verificationState === "timeout" && <Text style={styles.errorText}>인증시간이 초과되었습니다.</Text>}
          {verificationState === "dismatch" && <Text style={styles.errorText}>인증번호가 일치하지 않습니다.</Text>}
          
        </View>

        <View style={{ marginTop: "auto" }}>
          <SingleButton
            title={"다음"}          
            onPress={handleSubmit(onsubmit)}
          />
        </View>
      </View>
    </SafeAreaView>
  )
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  paddingContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputWrap: {
    width: "100%",
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  inputBox: {
    flex: 1,
    height: 42,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#FFF",
    borderBottomColor: "#C1C1C1",
    borderBottomWidth: 1,
    fontSize: 14
  },
  inputButton: {
    backgroundColor: "#F2F2F2", 
    padding: 12, 
    borderRadius: 5, 
    marginStart: 10, 
    width: 104, 
    alignItems: "center",
  },
  textDisabled: {
    color: "#AEAEAE",
  },
  errorText: {
    color: "#FF4040",
  },
  successText: {
    color: "#00B01C",
  },
})