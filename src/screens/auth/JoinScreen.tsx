import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { View, TextInput, StyleSheet, Pressable, Text, ScrollView } from "react-native";
import { Control, Controller, FieldError, FieldValues, RegisterOptions, useForm } from "react-hook-form";
import { commonStyles } from "../../styles/commonStyles";
import BasicInput from "../../components/BasicInput";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderNavigation from "../../navigation/HeaderNavigation";
import { Colors } from "../../styles/Colors";
import { emailRegex, nicknameRegex, pwRegex } from "../../js/util";
import { AuthModel } from "../../model/AuthModel";
import { AuthService } from "../../service/AuthService";
import { DeleteIcon, SecureEyeIcon } from "../../assets/svg";
import AgreementOnTerms from "./AgreementOnTerms";
import { ScreenName } from "../../statics/constants/ScreenName";
import Countdown from "../../components/Countdown";
import axios from "axios";

const JoinScreen = ({ navigation }: any) => {
  const { control, handleSubmit, trigger, getValues, watch, formState:{errors} } = useForm({ mode: "onChange"})
  const baseURL = "http://180.229.5.21:8080";
  
  // 패스워드 보이기/가리기 상태
  const [secureText, setScureText] = useState({
    pw: true,
    checkPw: true
  })

  // Email 중복 확인 상태
  const [emailState, setEmailState] = useState<AuthModel.IEmailModel["state"]>("none")

  // Email 인증 상태
  const [verificationState, setVerificationState] = useState<AuthModel.IVerificationModel["state"]>("none")

  // Nickname 중복 확인 상태
  const [nicknameState, setNicknameState] = useState<AuthModel.INicknameModel["state"]>("none")

  // 이메일 인증 카운트
  const [resetCount, setResetCount] = useState(false)

  // 약관동의
  const [agreements, setAgreements] = useState<string[]>([])

  // 필수정보 입력 확인
  const [validation, setValidation] = useState({
    email: false, // 이메일
    verificationCode: false, // 이메일 인증코드
    nickname: false, // 닉네임
    nicknameCheck: false,// 닉네임 중복 확인
    password: false, // 비밀번호
    checkPassword: false, // 비밀번호 확인
    agreements: false, // 약관 동의
  })

  // Email - 입력 시
  const handleOnChangeEmail = (inputText:string) => {
    // 이메일 재입력 시 인증번호 무효화
    // if (inputText !== getValues("email")) {
    //   setEmailState("none")
    // }

    const matchEmail = inputText.match(emailRegex)
        
    if (matchEmail === null) {
      setValidation({...validation, email: false})
    } else {
      setValidation({...validation, email: true})
    }
  }
  
  // 인증번호 전송 클릭 시 이메일 중복 확인
  const onSuccessCheckEmail = (data:{
    data: any;
    success: number;
  }) => {
    if (!data.data){
      // 중복이 아니면 인증번호 생성
      AuthService.Auth.emailVerificationCode(getValues("email"));
      // 이메일 중복 체크는 성공
      setEmailState("success")
      console.log('이메일 중복 체크', emailState)

      // 카운트 시작 3:00
    } else {
      // 중복일 경우
      setEmailState("fail")
      console.log("이미 사용중인 이메일")
    }
  }

  // Email -  인증번호 전송 클릭 시
  const sendVerificationCode = async (email: string) => {
    // 중복 확인
    await axios.get(`${baseURL}/api/v1/account/check-email/${email}`)
    .then((response) => {
        onSuccessCheckEmail({data: response.data.data, success: response.data.success});
    })
    .catch(function (error) {
        return { data: null, success: error || 500 };
    })
  }


  // 카운트다운
  const afterCountdown = () => {
    setVerificationState("timeout")
    setResetCount(false)
  }

  // Email -  인증번호 확인 요청
  const checkVerificationCode = async (email: string, code: string) => {
    // 인증코드 확인
    await axios.post(`${baseURL}/api/v1/account/email-auth-verify?email=${email}&code=${code}`)
    .then((response) => {
        console.log('인증코드 : ', response.data)
        // 인증 실패 : 인증번호 불일치 시
        //alert(response.data.error.message)

        // 인증 완료
        setValidation({...validation, verificationCode: true})
        setVerificationState("success")
    })
    .catch(function (error) {
        console.log('error!')
        return { data: null, success: error || 500 };
    })
  }

  // Email - 재전송 클릭 시
  const refreshVerificationCode = () => {
    // 인증코드 입력필드, 에러 텍스트 초기화
    setVerificationState("none")

    // 새 인증번호 전송

    // 카운트다운 재시작
    setResetCount(true)
  }

  // Nickname - 입력 시
  const handleOnChangeNickname = (inputText:string) => {
    // 닉네임 재입력 시 인증 무효화
    setNicknameState("none")
    
    const matchNickname = inputText.match(nicknameRegex)

    if (matchNickname === null) {
      setValidation({...validation, nickname: false})
    } else {
      setValidation({...validation, nickname: true})
    }
  }
  
  const onSuccessCheckNickname = (data:{
    data: any;
    status: number;
  }) => {
    if (!data.data){
      setValidation({...validation, nicknameCheck: true, nickname: true})
      setNicknameState("success")
    } else {
      // 중복일 경우
      setValidation({...validation, nicknameCheck: false, nickname: true})
      setNicknameState("fail")
      console.log(getValues("nickname"))
    }
  }

  // Nickname - 중복확인 클릭 시
  const checkNickname = async (nickname: string) => {
    // 중복이면 
    await axios.get(`${baseURL}/api/v1/account/check-nickname/${nickname}`)
    .then((response) => {
        onSuccessCheckNickname({data: response.data.data, status: response.data.status});
    })
    .catch(function (error) {
        return { data: null, status: error || 500 };
    })
    
    // 확인 완료
    setValidation({...validation, nicknameCheck: true})
  }

  // 패스워드 입력
  const handleOnChangePassword = (inputText:string) => {
    // 패스워드 재입력 시 패스워드 확인 입력 필드 초기화

    const matchPassword = inputText.match(pwRegex)

    if (matchPassword === null) {
      setValidation({...validation, password: false})
    } else {
      setValidation({...validation, password: true})
    }
  }

  // 패스워드 확인
  const handleOnChangeCheckPassword = (inputText:string) => {
    if (inputText !== getValues("password")) {
      setValidation({...validation, checkPassword: false})
    } else {
      setValidation({...validation, checkPassword: true})
    }
  }

  // 약관동의
  const checkedAgreements = (value:string[], valid:boolean) => {
    setAgreements(value)
    setValidation({...validation, agreements: valid})
  }

  const onRegisterPressed = (
    email: string,
    password: string,
    nickname: string,
    isAdPermission: boolean
  ) => {
    AuthService.Auth.join(email, password, nickname, isAdPermission);

    console.log(email, password, nickname, isAdPermission)
    navigation.navigate(ScreenName.JoinCompleted)
  }

  const watchEmail = watch("email", false);
  const watchNickname = watch("nickname", false);
  const watchVerificationCode = watch("verification_code", false);
  const watchPassword = watch("password", false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <HeaderNavigation middletitle="회원가입" hasBackButton={true} onPressBackButton={() => navigation.goBack()} />
        <View style={commonStyles.container}>

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
                      style={[styles.inputBox, emailState === "success" ? styles.textDisabled : null]}
                      placeholder="이메일을 입력해주세요"
                      onChangeText={(value) => {
                        onChange(value);
                        handleOnChangeEmail(value)
                      }}
                      editable={emailState !== "success"}
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
                  {error && !validation.email && <Text style={styles.errorText}>{error.message}</Text>}
                  {value && emailState === "fail" && <Text style={styles.errorText}>이미 가입된 이메일입니다.</Text>}
                  {verificationState === "success" && <Text style={styles.successText}>인증이 완료되었습니다.</Text>}
                </>
              )}
            />
          </View>
          
          {emailState === "success" && verificationState !== "success" ? (
            <View style={[styles.inputWrap, { marginTop: 20 }]}>
              <Controller 
                name="verification_code"
                control={control}
                rules={{
                  required: "인증번호를 입력해주세요.", 
                  validate: {
                  matchCode: (value:string) => value !== getValues("verification_code") && "인증번호가 일치하지 않습니다.",
                }}}
                render={({ field: { onChange, onBlur, value }, fieldState: {error} }) => (
                  <>
                    <View style={{ flexDirection: "row", alignItems: "flex-end"}}>
                      <View style={{ flex: 1, position: "relative" }}>
                        <TextInput 
                          style={[styles.inputBox]}
                          placeholder="인증번호를 입력해주세요"
                          onChangeText={(value) => {
                            onChange(value);
                          }} 
                          keyboardType="numeric"
                          returnKeyType="done"
                          disabled={verificationState === "timeout"}
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
                      <Pressable 
                        style={styles.inputButton} 
                        onPress={() => refreshVerificationCode()}
                      >
                        <Text>재전송</Text>
                      </Pressable>
                    </View>
                    {error && !validation.email && <Text style={styles.errorText}>{error.message}</Text>}
                    {value && verificationState === "dismatch" && <Text style={styles.errorText}>인증번호가 일치하지 않습니다.</Text>}
                  </>
                )}
              />
              <Pressable 
                style={[styles.primaryButton, verificationState === "timeout" && styles.buttonDisabled, { marginTop: 20, marginLeft: 0, width: "100%" }]} 
                onPress={() => checkVerificationCode(getValues("email"), getValues("verification_code"))}
                disabled={verificationState === "timeout"}
              >
                <Text style={verificationState === "timeout" ? styles.textDisabled : styles.primaryButtonText}>인증 하기</Text>
              </Pressable>
            </View>
          ) : null}

          <View style={[styles.inputWrap, { marginTop: 20 }]}>
            <Controller
              name="nickname"              
              control={control}
              rules={{
                required: "닉네임을 입력해주세요.", 
                pattern: {
                value: nicknameRegex, // 닉네임 8자 이상이면 인증 안되는 오류
                message: "영문, 한글, 숫자만 가능하며 3~20자로 입력해주세요."
              }}}
              render={({ field: { onChange, onBlur, value }, fieldState: {error} }) => (
                <>
                  <Text style={[styles.label, error ? styles.errorText : null]}>닉네임</Text>
                  <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                    <TextInput 
                      style={[styles.inputBox, error ? styles.errorUnderline : null]}
                      placeholder="닉네임을 입력해주세요" 
                      onChangeText={(value) => onChange(value) && handleOnChangeNickname(value)} 
                      returnKeyType="done"
                    />
                    <Pressable
                      style={[styles.inputButton]} 
                      disabled={error}
                      onPress={() => checkNickname(value)}
                    >
                      <Text style={error && styles.textDisabled}>중복확인</Text>
                    </Pressable>
                  </View>
                  {error && <Text style={styles.errorText}>{error.message}</Text>}
                  {value && nicknameState === 'fail' && <Text style={styles.errorText}>이미 사용중인 닉네임입니다.</Text>}
                  {value && nicknameState === 'success' && <Text style={styles.successText}>사용하실 수 있는 닉네임입니다.</Text>}
                </>
              )}
            />
          </View>

          <View style={[styles.inputWrap, { marginTop: 20 }]}>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "비밀번호를 입력해주세요.", 
                pattern: {
                value: pwRegex,
                message: "영문 대문자와 소문자, 숫자, 특수문자를 조합하여 8~30자로 입력해주세요."              
              }}}
              render={({ field: { onChange, onBlur, value }, fieldState: {error} }) => (
                <>
                  <Text style={[styles.label, error ? styles.errorText : null]}>비밀번호</Text>
                  <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                    <TextInput 
                      style={[styles.inputBox, error ? styles.errorUnderline : null]}
                      placeholder="8~30자리 영대・소문자, 숫자, 특수문자 조합" 
                      secureTextEntry={secureText.pw}
                      onChangeText={(value) => onChange(value) && handleOnChangePassword(value)} 
                      returnKeyType="done"
                    />
                    <Pressable 
                      style={styles.secureEyeButton} 
                      onPress={() => setScureText({...secureText, pw: !secureText.pw })}
                    >
                      <SecureEyeIcon color={secureText.pw ? "#1E1E1E" : "#AFAFAF"} />
                    </Pressable>
                  </View>
                  {error && <Text style={styles.errorText}>{error.message}</Text>}
                  {value && !error && <Text style={styles.successText}>사용하실 수 있는 비밀번호 입니다.</Text>}
                </>
              )}
            />
          </View>

          <View style={[styles.inputWrap, { marginTop: 20 }]}>
            <Controller
              name="check_password"
              control={control}
              rules={{
                required: "비밀번호를 입력해주세요.", 
                validate: {
                  matchPw: (value:string) => value === getValues("password") || "비밀번호가 일치하지 않습니다.",
              }}}
              render={({ field: { onChange, onBlur, value }, fieldState: {error} }) => (
                <>
                  <Text style={[styles.label, error ? styles.errorText : null]}>비밀번호 확인</Text>
                  <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                    <TextInput 
                      style={[styles.inputBox, error ? styles.errorUnderline : null]}
                      placeholder="8~30자리 영대・소문자, 숫자, 특수문자 조합"
                      secureTextEntry={secureText.checkPw}
                      onChangeText={(value) => onChange(value) && handleOnChangeCheckPassword(value)} 
                      returnKeyType="done"
                    />
                    <Pressable 
                      style={styles.secureEyeButton} 
                      onPress={() => setScureText({...secureText, checkPw: !secureText.checkPw })}
                    >
                      <SecureEyeIcon color={secureText.checkPw ? "#1E1E1E" : "#AFAFAF"} />
                    </Pressable>
                  </View>
                  {error && <Text style={styles.errorText}>{error.message}</Text>}
                  {value && !error && <Text style={styles.successText}>비밀번호가 일치합니다.</Text>}
                </>
              )}
            />
          </View>

          <AgreementOnTerms checkedAgreements={checkedAgreements} />
          
          {Object.values(validation).every(item => item === true) ? (
            <Pressable
              onPress={() => onRegisterPressed(getValues("email"), getValues("password"), getValues("nickname"), agreements.includes("receiveAdvertising"))}
              style={[styles.primaryLargeButton]}
              children={<Text style={[styles.primaryButtonText]}>회원가입</Text>}
            >
            </Pressable>
          ) : (
            <Pressable
              disabled
              //onPress={() => navigation.navigate(ScreenName.JoinCompleted)}
              style={[styles.primaryLargeButton, styles.buttonDisabled]}
              children={<Text style={[styles.primaryButtonText, styles.textDisabled]}>회원가입</Text>}
            >
            </Pressable>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default JoinScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
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
  primaryButton: {
    marginTop: 64,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#FB3F7E",
  },
  primaryLargeButton: {
    marginTop: 64,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#FB3F7E",
  },
  primaryButtonText: {
    fontSize: 16,
    color: "#FFF",
  },
  buttonDisabled: {
    backgroundColor: "#F2F2F2",
  },
  secureEyeButton: {
    position: "absolute",
    right: 0,
    bottom: 15
  },
  errorText: {
    color: "#FF4040",
  },
  successText: {
    color: "#00B01C",
  },
  errorUnderline: {
    borderBottomColor: "#FF4040",
  }
});