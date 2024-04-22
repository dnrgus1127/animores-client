import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, Text, ScrollView } from "react-native";
import { commonStyles } from "../../styles/commonStyles";
import BasicInput from "../../components/BasicInput";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderNavigation from "../../navigation/HeaderNavigation";
import { Colors } from "../../styles/Colors";
import { emailRegex, nicknameRegex, pwRegex } from "../../js/util";
import { AuthModel } from "../../model/AuthModel";
import { DeleteIcon, SecureEyeIcon } from "../../assets/svg";
import AgreementOnTerms from "./AgreementOnTerms";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../../navigation/type";
import { ScreenName } from "../../statics/constants/ScreenName";
import Countdown from "../../components/Countdown";

interface Irequest {
  method: string;
  redirect: string;
}

const JoinScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, ScreenName.Join>>();

  const [userInput, setUserInput] = useState({
    email: '',
    nickname: '',
    password: '',
    checkPassword: '',
    phoneNumber: '',
    verificationCode: '',
  })
  
  const {email, nickname, password, checkPassword, verificationCode} = userInput
  
  // 패스워드 보이기/가리기 상태
  const [secureText, setScureText] = useState({
    pw: true,
    checkPw: true
  })

  const [warningText, setWarningText] = useState({
    email: '',
    nickname: '',
    password: '',
    checkPassword: '',
    phoneNumber: '',
    verificationCode: ''
  })
  
  // 임시 인증코드
  const [sampleCode, setSampleCode] = useState('')

  // Email 인증 상태
  const [verificationState, setVerificationState] = useState<AuthModel.IVerificationModel['state']>('none')

  // 이메일 인증 카운트
  const [resetCount, setResetCount] = useState(false)

  // 약관동의
  const [agreements, setAgreements] = useState<string[]>([])

  // 필수정보 입력 확인
  const [validation, setValidation] = useState({
    email: false,
    verificationCode: false,
    nickname: false,
    nicknameConfirm: false,
    password: false,
    checkPassword: false,
    agreements: false,
  })

  useEffect(() => {
    //console.log({...validation})
  }, [validation])

  // 약관동의
  const checkedAgreements = (value:string[], valid:boolean) => {
    setAgreements(value)
    setValidation({...validation, agreements: valid})
  }

  const handleOnChangeEmail = (inputText:string) => {
    // 이메일 재입력 시 인증번호 무효화
    setSampleCode('')
    setUserInput({...userInput, verificationCode: '', email: inputText})
    
    const matchEmail = inputText.match(emailRegex)

    if (matchEmail === null) {
      setValidation({...validation, email: false})
      setWarningText({...warningText, email: '이메일 형식에 맞게 입력해주세요.'})
    } else {   
      setValidation({...validation, email: true})
      setWarningText({...warningText, email: ''})
    }
  }

  const afterCountdown = () => {
    setVerificationState('timeout')
    setResetCount(false)
    setWarningText({...warningText, verificationCode: '인증시간이 초과되었습니다.'})
  }

  const handleOnChangeNickname = (inputText:string) => {
    setUserInput({...userInput, nickname: inputText})
    // 닉네임 재입력 시 인증번호 무효화
    setValidation({...validation, nickname: false, nicknameConfirm: false})
    
    const matchNickname = inputText.match(nicknameRegex)

    if (matchNickname === null) {
      setWarningText({...warningText, nickname: '영문, 한글, 숫자만 가능하며 3~20자로 입력해주세요.'})
    } else {
      setValidation({...validation, nickname: true, nicknameConfirm: false})
      setWarningText({...warningText, nickname: ''})
    }
  }

  const handleOnChangePassword = (inputText:string) => {
    // 패스워드 재입력 시 패스워드 확인 입력 필드 초기화
    setUserInput({...userInput, password: inputText, checkPassword: ''})
    
    const matchPassword = inputText.match(pwRegex)

    if (matchPassword === null) {
      setValidation({...validation, password: false})
      setWarningText({...warningText, password: '영문 대문자와 소문자, 숫자, 특수문자를 조합하여 8~30자로 입력해주세요.'})
    } else {
      setValidation({...validation, password: true})
      setWarningText({...warningText, password: '사용하실 수 있는 비밀번호 입니다.'})
    }
  }

  const handleOnChangeCheckPassword = (inputText:string) => {
    setUserInput({...userInput, checkPassword: inputText})

    if (inputText !== password) {
      setValidation({...validation, checkPassword: false})
      setWarningText({...warningText, checkPassword: '비밀번호가 일치하지 않습니다.'})
    } else {
      setValidation({...validation, checkPassword: true})
      setWarningText({...warningText, checkPassword: '비밀번호가 일치합니다.'})
    }
  }

  
  // Email - 인증번호 전송 클릭 시
  const sendVerificationCode = async () => {
    const url = `https://gv5jgxia2e.execute-api.ap-northeast-2.amazonaws.com/Prod/api/v1/account/check-email/${email}`

    // 이메일 중복 검사
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
    })
    let userCheck = await response.json()
    .catch((error) => console.error(error))

    //console.log(userCheck.data)
    
    if (userCheck.data){
      // 중복일 경우
      setValidation({...validation, email: false})
      setWarningText({...warningText, email: '이미 가입된 이메일입니다.'})
    } else {
      // 중복이 아니면 인증번호 전송
      setSampleCode('1234')
      console.log('코드전송')
    }

    // 카운트 시작 3:00
  }
  

  // Email - 재전송 클릭 시
  const refreshVerificationCode = () => {
    // 입력필드, 에러 텍스트 초기화
    setUserInput({...userInput, verificationCode: ''})
    setWarningText({...warningText, verificationCode: ''})
    setVerificationState('none')

    // 새 인증번호 전송
    setSampleCode('4567')

    // 카운트다운 재시작
    setResetCount(true)
  }

  // Email - 인증하기 클릭 시 
  const handleOnChangeVerificationCode = (inputText:string) => {
    // 인증 실패 : 인증번호 불일치 시
    if (inputText !== sampleCode) {
      setVerificationState('dismatch')
      setWarningText({...warningText, verificationCode: '인증번호가 일치하지 않습니다.'})
    } else {
      // 인증 완료
      setValidation({...validation, verificationCode: true})
      setVerificationState('success')
      setWarningText({...warningText, email: '인증이 완료되었습니다.'})
    }
  }

  // Nickname - 중복확인 클릭 시
  const checkNickname = () => {
    // 중복이면 
    // setWarningText({...warningText, nickname: '이미 사용중인 닉네임입니다.'})
    
    // 확인 완료
    setWarningText({...warningText, nickname: '사용하실 수 있는 닉네임입니다.'})
    setValidation({...validation, nicknameConfirm: true})
  }

  return (
    <SafeAreaView style={styles.Container}>
      <ScrollView>
        <HeaderNavigation middletitle='회원가입' hasBackButton={true} onPressBackButton={() => navigation.goBack()} />
        <View style={commonStyles.container}>
          <View style={styles.joinInputWrap}>
            <BasicInput 
              title='이메일' 
              placeholder='이메일을 입력해주세요' 
              value={email} 
              onChangeText={handleOnChangeEmail} 
              returnKeyType='done'
              error={email !== '' && !validation.email}
              disabled={verificationState === 'success'}
            />
            {
              verificationState === 'success' ?
              <Pressable style={[styles.inputButton, { paddingLeft: 5, paddingRight: 5 }]} disabled>
                <Text style={styles.textDisabled}>인증완료</Text>
              </Pressable>
              : (verificationState === 'fail' ?
                <Pressable style={[styles.inputButton, { paddingLeft: 5, paddingRight: 5 }]} disabled>
                  <Text style={styles.textDisabled}>인증실패</Text>
                </Pressable>
                : (sampleCode === '' ? 
                  <Pressable 
                    style={[styles.inputButton, { paddingLeft: 5, paddingRight: 5 }]} 
                    disabled={!validation.email} 
                    onPress={() => sendVerificationCode()}
                  >
                    <Text style={!validation.email && styles.textDisabled}>인증번호 전송</Text>
                  </Pressable>
                  : 
                  <Pressable style={[styles.inputButton, { paddingLeft: 5, paddingRight: 5 }]} disabled>
                    <Text style={styles.textDisabled}>전송완료</Text>
                  </Pressable>
                )
              )
            }
          </View>
          {!email ? null : (
            <View>
              <Text 
                style={validation.email ? styles.successText : styles.errorText}
              >
                {warningText.email}
              </Text>
            </View>
          )}
          {sampleCode !== '' && verificationState !== 'success' ? (
            <View>
              <View style={styles.joinInputWrap}>
                <View style={[styles.joinInputWrap, { flex: 1, position: 'relative' }]}>
                  <BasicInput 
                    placeholder='인증번호를 입력해주세요' 
                    marginTop={20} 
                    keyboardType='numeric' 
                    value={verificationCode} 
                    onChangeText={(value) => setUserInput({...userInput, verificationCode: value})} 
                    returnKeyType='done'
                    disabled={verificationState === 'timeout'}
                  />
                  <View
                    style={{ position: 'absolute', right: 0, flexDirection: 'row', height: 30 }}
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
              {verificationState === 'dismatch' || verificationState === 'timeout' && (
                <View>
                  <Text style={styles.errorText}>
                    {warningText.verificationCode}
                  </Text>
                </View>
              )}
              <View>
                {verificationState === 'timeout' ? (
                  <Pressable 
                    style={[styles.primaryButton, styles.buttonDisabled, { marginTop: 20, marginLeft: 0, width: '100%' }]}
                    disabled
                  >
                    <Text style={styles.textDisabled}>인증 하기</Text>
                  </Pressable>
                ) : (
                  <Pressable 
                    style={[styles.primaryButton, { marginTop: 20, marginLeft: 0, width: '100%' }]} 
                    onPress={() => handleOnChangeVerificationCode(verificationCode)}
                  >
                    <Text style={styles.primaryButtonText}>인증 하기</Text>
                  </Pressable>
                )}
              </View>
            </View>
          ) : null}
          <View style={styles.joinInputWrap}>
            <BasicInput 
              title='닉네임' 
              placeholder='닉네임을 입력해주세요' 
              value={nickname} 
              onChangeText={handleOnChangeNickname} 
              returnKeyType='done'
              error={nickname !== '' && !validation.nickname}
            />
            <Pressable 
              style={styles.inputButton} 
              onPress={() => checkNickname()} 
              disabled={!validation.nickname}
            >
              <Text style={!validation.nickname && styles.textDisabled}>중복확인</Text>
            </Pressable>
          </View>
          {!nickname ? null : (
            <View>
              <Text 
                style={validation.nickname ? styles.successText : styles.errorText}
              >
                {warningText.nickname}
              </Text>
            </View>
          )}
          <View style={styles.joinInputWrap}>
            <BasicInput 
              title='비밀번호' 
              placeholder='8~30자리 영대・소문자, 숫자, 특수문자 조합' 
              secureTextEntry={secureText.pw} 
              value={password} 
              onChangeText={handleOnChangePassword} 
              returnKeyType='done'
              error={password !== '' && !validation.password}
            />
            <Pressable 
              style={styles.secureEyeButton} 
              onPress={() => setScureText({...secureText, pw: !secureText.pw })}
            >
              <SecureEyeIcon color={secureText.pw ? '#1E1E1E' : '#AFAFAF'} />
            </Pressable>
          </View>
          {!password ? null : (
            <View>
              <Text 
                style={validation.password ? styles.successText : styles.errorText}
              >
                {warningText.password}
              </Text>
            </View>
          )}
          <View style={styles.joinInputWrap}>
            <BasicInput 
              title='비밀번호 확인' 
              placeholder='8~30자리 영대・소문자, 숫자, 특수문자 조합' 
              secureTextEntry={secureText.checkPw} 
              value={checkPassword} 
              onChangeText={handleOnChangeCheckPassword} 
              returnKeyType='done'
              error={checkPassword !== '' && !validation.checkPassword}
            />
            <Pressable 
              style={styles.secureEyeButton} 
              onPress={() => setScureText({...secureText, checkPw: !secureText.checkPw })}
            >
            <SecureEyeIcon color={secureText.checkPw ? '#1E1E1E' : '#AFAFAF'} />
            </Pressable>
          </View>
          {!checkPassword ? null : (
            <View>
              <Text 
                style={validation.checkPassword ? styles.successText : styles.errorText}
              >
                {warningText.checkPassword}
              </Text>
            </View>
          )}

          <AgreementOnTerms checkedAgreements={checkedAgreements} />
          
          {Object.values(validation).every(item => item === true) ? (
            <Pressable
              onPress={() => console.log('Pressed')}
              style={[styles.primaryLargeButton]}
              children={<Text style={[styles.primaryButtonText]}>회원가입</Text>}
            >
            </Pressable>
          ) : (
            <Pressable
              onPress={() => console.log('Pressed')}
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
  Container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  joinInputWrap: {
    flexDirection: 'row', 
    alignItems: 'flex-end'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputButton: {
    backgroundColor: '#F2F2F2', 
    padding: 12, 
    borderRadius: 5, 
    marginStart: 10, 
    width: 104, 
    alignItems: 'center',
  },
  textDisabled: {
    color: '#AEAEAE',
  },
  primaryButton: {
    marginTop: 64,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#FB3F7E',
  },
  primaryLargeButton: {
    marginTop: 64,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#FB3F7E',
  },
  primaryButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  buttonDisabled: {
    backgroundColor: '#F2F2F2',
  },
  secureEyeButton: {
    position: 'absolute',
    right: 0,
    bottom: 15
  },
  errorText: {
    color: '#FF4040',
  },
  successText: {
    color: '#00B01C',
  }
});