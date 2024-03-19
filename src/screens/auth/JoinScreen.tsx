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
import { MobileCarrierModel } from "../../model/MobileCarrierModel";
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

  // 필수정보 입력 확인
  const [validation, setValidation] = useState({
    email: false,
    nickname: false,
    password: false,
    checkPassword: false,
    phoneNumber: false,
    verificationCode: false
  })

  const mobileCarrireData: MobileCarrierModel.IMobileCarrierModel[] = [
    {
      label: 'SKT',
      value: 'SKT'
    },
    {
      label: 'KT',
      value: 'KT'
    },
    {
      label: 'LGU+',
      value: 'LGU+'
    },
    {
      label: 'SKT 알뜰폰',
      value: 'SKT 알뜰폰'
    },
    {
      label: 'KT 알뜰폰',
      value: 'KT 알뜰폰'
    },
    {
      label: 'LGU+ 알뜰폰',
      value: 'LGU+ 알뜰폰'
    },
  ];

  const handleOnChangeEmail = (inputText:string) => {
    setEmail(inputText)
    
    const matchEmail = inputText.match(emailRegex)

    if (matchEmail === null) {
      setValidation({ ...validation, email: false })
      setEmailWarningText('이메일 형식에 맞게 입력해주세요.')
    } else {
      setValidation({ ...validation, email: true })
      setEmailWarningText('')
    }
    // 중복확인 클릭 시 중복이면 '이미 사용중인 이메일입니다.'
    // 아니면 '사용하실 수 있는 이메일입니다.'
  }

  const handleOnChangeNickname = (inputText:string) => {
    setNickname(inputText)
    
    const matchNickname = inputText.match(nicknameRegex)

    if (matchNickname === null) {
      setValidation({ ...validation, nickname: false })
      setNicknameWarningText('영문, 한글, 숫자만 가능하며 3~20자로 입력해주세요.')
    } else {
      setValidation({ ...validation, nickname: true })
      setNicknameWarningText('')
    }
    // 중복확인 클릭 시 중복이면 '이미 사용중인 닉네임입니다.'
    // 아니면 '사용하실 수 있는 닉네임입니다.'
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

  const refreshVerificationCode = () => {
    setVerificationCode('')
    setVerificationCodeWarningText('')
    setValidation({...validation, verificationCode: false})
  }
  
  const getButton = (id:string) => {
    if (id === 'inactive') { 
      return (
      <Pressable style={styles.inputButton} disabled>
        <Text style={styles.disabled}>인증받기</Text>
      </Pressable>
    )} else if (id === 'active'){
      return (
      <Pressable style={styles.inputButton} onPress={() => setSampleCode('1234')}>
        <Text>인증받기</Text>
      </Pressable>
    )} else {
      return (
      <Pressable style={styles.inputButton} onPress={() => refreshVerificationCode()}>
        <Text>재발송</Text>
      </Pressable>
    )}
  }

  const handleOnChangeVerificationCode = (inputText:string) => {
    if (inputText !== sampleCode) {
      setValidation({...validation, verificationCode: false})
      setVerificationCodeWarningText('인증번호가 일치하지 않습니다.')
    } else {
      setValidation({...validation, verificationCode: true})
      setVerificationCodeWarningText('인증번호가 일치합니다.')
    }
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
            />
            <Pressable style={styles.inputButton}>
              <Text>중복확인</Text>
            </Pressable>
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
          <View style={styles.joinInputWrap}>
            <BasicInput 
              title='닉네임' 
              placeholder='닉네임을 입력해주세요' 
              value={nickname} 
              onChangeText={handleOnChangeNickname} 
              returnKeyType='done'
              error={nickname !== '' && !validation.nickname}
            />
            <Pressable style={styles.inputButton}>
              <Text>중복확인</Text>
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
                  <Picker.Item label='통신사 선택' value='' style={{ fontSize: 14 }} />
                  {mobileCarrireData.map((item) => (
                    <Picker.Item label={item.label} value={item.value} style={{ fontSize: 14 }} />
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
              {
                phoneNumber.match(phoneNumberRegex) === null ? getButton('inactive') 
                : sampleCode === '1234' ? getButton('resend') 
                : getButton('active')
              }
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
          {sampleCode !== '' ? (
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
                onPress={() => handleOnChangeVerificationCode(verificationCode)}
                disabled={validation.verificationCode && true}
              >
                {validation.verificationCode ? (
                  <Text style={{color: '#AEAEAE'}}>인증완료</Text>
                ):(
                  <Text>확인</Text>
                )}
              </Pressable>
            </View>
          ) : null}
          {!verificationCode ? null : (
            <View>
              <Text
                style={validation.verificationCode ? styles.successText : styles.errorText}
              >
                {verificationCodeWarningText}
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
            style={styles.joinButton}
            children={<Text style={styles.joinButtonText}>회원가입</Text>}
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
  joinButton: {
    marginTop: 64,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#FB3F7E',
  },
  joinButtonText: {
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
    color: '#A0A0A0',
  }
});