import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text, ScrollView } from "react-native";
import { commonStyles } from "../../styles/commonStyles";
import BasicInput from "../../components/BasicInput";
import BasicCheckbox from "../../components/BasicCheckbox";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderNavigation from "../../navigation/HeaderNavigation";
import { Colors } from "../../styles/Colors";
import { emailRegex, nicknameRegex, pwRegex, phoneNumberRegex } from "../../js/util";
import { Picker } from "@react-native-picker/picker";
import { AuthModel } from "../../model/AuthModel";
import { SecureEyeIcon } from "../../assets/svg";

const JoinScreen = ({ navigation }: any) => {
  // state합치기, 컴포넌트 분리 필요.
  const [isChecked, setChecked] = useState(false)
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  
  // 패스워드 보이기/가리기 상태
  const [secureText, setScureText] = useState({
    pw: true,
    checkPw: true
  })

  const [emailWarningText, setEmailWarningText] = useState('')
  const [nicknameWarningText, setNicknameWarningText] = useState('')
  const [pwWarningText, setPwWarningText] = useState('')
  const [checkPwWarningText, setCheckPwWarningText] = useState('')
  const [phoneNumberWarningText, setPhoneNumberWarningText] = useState('')
  const [verificationCodeWarningText, setVerificationCodeWarningText] = useState('')

  // 통신사 선택
  const [mobileCarrier, setMobileCarrier] = useState('')
  
  // 임시 인증코드
  const [sampleCode, setSampleCode] = useState('')

  // Email 인증 상태
  const [verificationState, setVerificationState] = useState<AuthModel.IVerificationModel['state']>('none')

  // Nickname 중복 확인
  const [availableNickname, setAvailableNickname] = useState(false)

  // 필수정보 입력 확인
  const [validation, setValidation] = useState({
    email: false,
    verificationCode: false,
    nickname: false,
    availableNickname: false,
    password: false,
    checkPassword: false,
    phoneNumber: false,
  })

  const mobileCarrireData: AuthModel.IMobileCarrierModel[] = [
    {
      label: 'SKT',
      value: 'skt'
    },
    {
      label: 'KT',
      value: 'kt'
    },
    {
      label: 'LGU+',
      value: 'lguplus'
    },
    {
      label: 'SKT 알뜰폰',
      value: 'skt_save'
    },
    {
      label: 'KT 알뜰폰',
      value: 'kt_save'
    },
    {
      label: 'LGU+ 알뜰폰',
      value: 'lguplus_save'
    },
  ];

  const handleOnChangeEmail = (inputText:string) => {
    // 이메일 수정 시 인증번호 무효화
    setSampleCode('')
    setVerificationCode('')

    setEmail(inputText)
    
    const matchEmail = inputText.match(emailRegex)

    if (matchEmail === null) {
      setValidation({ ...validation, email: false })
      setEmailWarningText('이메일 형식에 맞게 입력해주세요.')
    } else {   
      setValidation({ ...validation, email: true })
      setEmailWarningText('')
    }
  }

  const handleOnChangeNickname = (inputText:string) => {
    setNickname(inputText)
    setAvailableNickname(false)
    
    const matchNickname = inputText.match(nicknameRegex)

    if (matchNickname === null) {
      setValidation({ ...validation, nickname: false })
      setNicknameWarningText('영문, 한글, 숫자만 가능하며 3~20자로 입력해주세요.')
    } else {
      setValidation({ ...validation, nickname: true })
      setNicknameWarningText('')
    }
  }

  const handleOnChangePassword = (inputText:string) => {
    setPassword(inputText)
    
    const matchPassword = inputText.match(pwRegex)

    if (matchPassword === null) {
      setValidation({ ...validation, password: false })
      setPwWarningText('영문 대문자와 소문자, 숫자, 특수문자를 조합하여 8~30자로 입력해주세요.')
    } else {
      setValidation({ ...validation, password: true })
      setPwWarningText('')
    }
  }

  const handleOnChangeCheckPassword = (inputText:string) => {
    setCheckPassword(inputText)

    if (inputText !== password) {
      setValidation({ ...validation, checkPassword: false })
      setCheckPwWarningText('비밀번호가 일치하지 않습니다.')
    } else {
      setValidation({ ...validation, checkPassword: true })
      setCheckPwWarningText('비밀번호가 일치합니다.')
    }
  }

  const handleOnChangePhoneNumber = (inputText:string) => {
    setPhoneNumber(inputText)

    const matchPhoneNumber = inputText.match(phoneNumberRegex)

    if (matchPhoneNumber === null) {
      setValidation({ ...validation, phoneNumber: false })
      setPhoneNumberWarningText('휴대 전화 번호 형식에 맞게 입력해주세요.')
    } else {
      setValidation({ ...validation, phoneNumber: true })
      setPhoneNumberWarningText('')
    }
  }

  // Email - 인증번호 전송 클릭 시
  const sendVerificationCode = () => {
    // 이메일 중복 검사

    // 중복일 경우 
    // setEmailWarningText('이미 사용중인 이메일입니다.') 또는
    // setEmailWarningText('사용하실 수 없는 이메일입니다.')

    // 중복이 아니면 인증번호 전송
    setSampleCode('1234')

    // 카운트 시작 3:00
  }

  // Email - 재전송 클릭 시
  const refreshVerificationCode = () => {
    // 입력필드, 에러 텍스트 초기화
    setSampleCode('4567')
    setVerificationCode('')
    setVerificationCodeWarningText('')
  }

  // Email - 인증하기 클릭 시 
  const handleOnChangeVerificationCode = (inputText:string) => {
    if (inputText !== sampleCode) {
      // 인증 실패
      // 인증번호 불일치 시
      setVerificationState('dismatch')
      setVerificationCodeWarningText('인증번호가 일치하지 않습니다.')
      // 인증시간 초과 시
      // setVerificationCodeWarningText('인증시간이 초과되었습니다.')
    } else {
      // 인증 완료
      setValidation({...validation, verificationCode: true})
      setVerificationState('success')
      setEmailWarningText('인증이 완료되었습니다.')
    }
  }

  // Nickname - 중복확인 클릭 시
  const checkNickname = () => {
    // 중복이면 
    // setNicknameWarningText('이미 사용중인 닉네임입니다.')
    // 확인 완료
    setAvailableNickname(true)
    setNicknameWarningText('사용하실 수 있는 닉네임입니다.')
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
                <Text style={styles.disabled}>인증완료</Text>
              </Pressable>
              : (verificationState === 'fail' ?
                <Pressable style={[styles.inputButton, { paddingLeft: 5, paddingRight: 5 }]} disabled>
                  <Text style={styles.disabled}>인증실패</Text>
                </Pressable>
                : (sampleCode === '' ? 
                  <Pressable 
                    style={[styles.inputButton, { paddingLeft: 5, paddingRight: 5 }]} 
                    disabled={!validation.email} 
                    onPress={() => sendVerificationCode()}
                  >
                    <Text style={!validation.email && styles.disabled}>인증번호 전송</Text>
                  </Pressable>
                  : 
                  <Pressable style={[styles.inputButton, { paddingLeft: 5, paddingRight: 5 }]} disabled>
                    <Text style={styles.disabled}>전송완료</Text>
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
                {emailWarningText}
              </Text>
            </View>
          )}
          {sampleCode !== '' && verificationState !== 'success' ? (
            <View>
              <View style={styles.joinInputWrap}>
                <BasicInput 
                  placeholder='인증번호를 입력해주세요' 
                  marginTop={20} 
                  keyboardType='numeric' 
                  value={verificationCode} 
                  onChangeText={(value) => setVerificationCode(value)} 
                  returnKeyType='done'
                  disabled={validation.verificationCode ? true : false}
                />
                <Pressable 
                  style={styles.inputButton} 
                  onPress={() => refreshVerificationCode()}
                >
                  <Text>재전송</Text>
                </Pressable>
              </View>
              {verificationState === 'dismatch' && (
                <View>
                  <Text style={styles.errorText}>
                    {verificationCodeWarningText}
                  </Text>
                </View>
              )}
              <View>
                <Pressable 
                  style={[styles.primaryButton, { marginTop: 20, marginLeft: 0, width: '100%' }]} 
                  onPress={() => handleOnChangeVerificationCode(verificationCode)}
                >
                  <Text style={styles.primaryButtonText}>인증 하기</Text>
                </Pressable>
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
              <Text style={!validation.nickname && styles.disabled}>중복확인</Text>
            </Pressable>
          </View>
          {!nickname ? null : (
            <View>
              <Text 
                style={validation.nickname ? styles.successText : styles.errorText}
              >
                {nicknameWarningText}
              </Text>
            </View>
          )}
          <Text>중복 확인 {availableNickname ? '완료' : '필요'}</Text>
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
                {pwWarningText}
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
                {checkPwWarningText}
              </Text>
            </View>
          )}
          <View style={{marginTop: 40}}>
            <Text 
              style={[styles.label, phoneNumber !== '' && !validation.phoneNumber ? styles.errorText : null]}
            >
              휴대 전화 번호 인증
            </Text>
            <View style={styles.joinInputWrap}>
              <View 
                style={{ 
                  flex: 1.5, 
                  marginTop: 10, 
                  borderBottomWidth: 1, 
                  borderColor: phoneNumber !== '' && !validation.phoneNumber ? '#FF4040' : '#C1C1C1', 
                  borderStyle: 'solid' 
                }}
              >
                <Picker
                  selectedValue={mobileCarrier}
                  onValueChange={(itemValue, itemIndex) => setMobileCarrier(itemValue)}
                  style={{ color: '#000' }}
                >
                  <Picker.Item label='통신사 선택' key='select' value='' style={{ fontSize: 14 }} />
                  {mobileCarrireData.map((item) => (
                    <Picker.Item label={item.label} key={item.value} value={item.value} style={{ fontSize: 14 }} />
                  ))}
                </Picker>
              </View>
              <View style={{ flex: 2.5, marginStart: 10 }}>
                <BasicInput 
                  placeholder='휴대 전화 번호를 입력해주세요'
                  marginTop={20} 
                  keyboardType='numeric' 
                  value={phoneNumber} 
                  onChangeText={handleOnChangePhoneNumber} 
                  returnKeyType='done'
                  error={phoneNumber !== '' && !validation.phoneNumber}
                />
              </View>
            </View>
          </View>
          {!phoneNumber ? null : (
            <View>
              <Text
                style={validation.phoneNumber ? styles.successText : styles.errorText}
              >
                {phoneNumberWarningText}
              </Text>
            </View>
          )}
          <View style={{marginTop: 40}}>
            <Text style={styles.label}>약관 동의</Text>
            <BasicCheckbox 
              isChecked={isChecked}
              onValueChangeHandler={() => setChecked(!isChecked)}
              label='전체 동의합니다.'
            />
            
            <View style={commonStyles.commonRowContainer}>
              <View style={[commonStyles.separator, {marginTop: 15}]} />
            </View>

            <BasicCheckbox 
              isChecked={isChecked}
              onValueChangeHandler={() => setChecked(!isChecked)}
              label='광고 수신동의(선택)'
            />
            <BasicCheckbox 
              isChecked={isChecked}
              onValueChangeHandler={() => setChecked(!isChecked)}
              label='이용 약관에 동의합니다.(필수)'
            />
            <BasicCheckbox 
              isChecked={isChecked}
              onValueChangeHandler={() => setChecked(!isChecked)}
              label='개인정보 수집 이용에 동의합니다.(필수)'
            />
          </View>
          <Pressable
            onPress={() => console.log('Pressed')}
            style={styles.primaryLargeButton}
            children={<Text style={styles.primaryButtonText}>회원가입</Text>}
          >
          </Pressable>
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
    alignItems: 'flex-end',
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
  disabled: {
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