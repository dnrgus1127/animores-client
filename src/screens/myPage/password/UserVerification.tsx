import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, TextInput, View, Text } from "react-native";
import { Control, Controller, FieldError, FieldValues, RegisterOptions, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "../../../components/text/Title";
import HeaderNavigation from "../../../navigation/HeaderNavigation";
import { emailRegex, nicknameRegex, pwRegex } from "../../../js/util";
import { AuthModel } from "../../../model/AuthModel";
import { AuthService } from "../../../service/AuthService";
import { RootStackParamList } from "../../../navigation/type";
import { ProfileService } from "../../../service/ProfileService";
import { ScreenName } from "../../../statics/constants/ScreenName";
import { Colors } from "../../../styles/Colors";
import { useRecoilState } from "recoil";
import { UserEmailAtom } from "../../../recoil/AuthAtom";

const UserVerification = () => {
  const { control, handleSubmit, trigger, getValues, watch, formState:{errors} } = useForm({ mode: "onChange"})
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, ScreenName.ProfileManagement>
    >();

  // Email 인증 상태
  const [verificationState, setVerificationState] = useState<AuthModel.IVerificationModel["state"]>("none")
  const [userEmail, setUserEmail] = useRecoilState(UserEmailAtom);

  // Email - 입력 시
  const handleOnChangeEmail = (inputText:string) => {
    const matchEmail = inputText.match(emailRegex)
  }

  // Email -  인증번호 전송 클릭 시
  const sendVerificationCode = async (email: string) => {
    // 인증번호 생성
    AuthService.Auth.emailVerificationCode(getValues("email"));
    navigation.navigate(ScreenName.ResetPassword);

    // Atom에 email 저장
    setUserEmail(email);
  }


  const watchEmail = watch("email", false);

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
          text={"비밀번호 변경은" + "\n" + "본인확인이 필요합니다"} 
          fontSize={24}
          fontWeight="bold"
          style={{ marginTop: 30, marginBottom: 60 }}
        />
        

        <View style={[styles.inputWrap, { marginTop: 20 }]}>
            <Controller 
              name="email"
              control={control}
              rules={{
                required: "이메일을 입력해주세요.", 
                pattern: {
                value: emailRegex,
                message: "이메일 형식에 맞게 입력해주세요."
              }}}
              render={({ field: { onChange, onBlur, value }, fieldState: {error} }) => (
                <>
                  <Text style={[styles.label, error ? styles.errorText : null]}>이메일</Text>
                  <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                    <TextInput 
                      style={styles.inputBox}
                      placeholder="이메일을 입력해주세요"
                      onChangeText={(value) => {
                        onChange(value);
                        handleOnChangeEmail(value)
                      }}
                      returnKeyType="done"
                    />
                    {
                      verificationState === "success" ?
                      <Pressable style={[styles.inputButton, { paddingLeft: 5, paddingRight: 5 }]} disabled>
                        <Text style={styles.textDisabled}>인증완료</Text>
                      </Pressable>
                      : (verificationState === "fail" ?
                        <Pressable style={[styles.inputButton, { paddingLeft: 5, paddingRight: 5 }]} disabled>
                          <Text style={styles.textDisabled}>인증실패</Text>
                        </Pressable>
                        : (verificationState === "none" ? 
                          <Pressable 
                            style={[styles.inputButton, { paddingLeft: 5, paddingRight: 5 }]} 
                            disabled={error} 
                            onPress={() => sendVerificationCode(getValues("email"))}
                          >
                            <Text style={error && styles.textDisabled}>인증번호 전송</Text>
                          </Pressable>
                          : 
                          <Pressable style={[styles.inputButton, { paddingLeft: 5, paddingRight: 5 }]} disabled>
                            <Text style={styles.textDisabled}>전송완료</Text>
                          </Pressable>
                        )
                      )
                    }
                  </View>
                  {error && <Text style={styles.errorText}>{error.message}</Text>}
                  {verificationState === "success" && <Text style={styles.successText}>인증이 완료된 이메일입니다.</Text>}
                </>
              )}
            />
          </View>
      </View>
    </SafeAreaView>
  )
};

export default UserVerification;

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
    flex: 1,
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