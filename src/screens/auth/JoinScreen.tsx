import React, { useRef, useState } from 'react';
import { View, StyleSheet, Pressable, Text, ScrollView, BackHandler, Platform, Alert } from "react-native";
import { commonStyles } from "../../styles/commonStyles";
import BasicInput from "../../components/BasicInput"
import BasicCheckbox from "../../components/BasicCheckbox";
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderNavigation from "../../navigation/HeaderNavigation";
import { Colors } from "../../statics/styles/Colors";
import { emailRegex, nicknameRegex, pwRegex, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../js/util';


const JoinScreen = ({ navigation }: any) => {
  const [isChecked, setChecked] = useState(false)
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [secureText, setScureText] = useState(null)
  const [touchEye, setTouchEye] = useState(true)

  const [emailWarningText, setEmailWarningText] = useState('')
  const [nicknameWarningText, setNicknameWarningText] = useState('')
  const [pwWarningText, setPwWarningText] = useState('')
  const [checkPwWarningText, setcheckPwWarningText] = useState('')

  const handleOnChangeEmail = (inputText:string) => {
    setEmail(inputText)
    
    const matchEmail = inputText.match(emailRegex)

    if (matchEmail === null) {
      setEmailWarningText('이메일 형식에 맞게 입력해주세요.')
    } else {
      setEmailWarningText('')
    }
  }

  const handleOnChangeNickname = (inputText:string) => {
    setNickname(inputText)
    
    const matchNickname = inputText.match(nicknameRegex)

    if (matchNickname === null) {
      setNicknameWarningText('사용하실 수 없는 닉네임입니다.')
    } else {
      setNicknameWarningText('')
    }
  }

  const handleOnChangePassword = (inputText:string) => {
    setPassword(inputText)
    
    const matchPassword = inputText.match(pwRegex)

    if (matchPassword === null) {
      setPwWarningText('영문 대문자와 소문자, 숫자, 특수문자를 조합하여 8~30자로 입력해주세요.')
    } else {
      setPwWarningText('')
    }
  }

  return (
    <SafeAreaView style={styles.Container}>
      <ScrollView>
        <HeaderNavigation middletitle="회원가입" hasBackButton={true} onPressBackButton={() => navigation.goBack()} />
        <View style={commonStyles.container}>
          <View style={styles.joinInputWrap}>
            <BasicInput title='이메일' placeholder='이메일을 입력해주세요' value={email} onChangeText={handleOnChangeEmail} />
            <Pressable style={styles.inputButton}>
              <Text>중복확인</Text>
            </Pressable>
          </View>
          {!email ? null : (
            <View>
              <Text>{emailWarningText}</Text>
            </View>
          )}
          <View style={styles.joinInputWrap}>
            <BasicInput title='닉네임' placeholder='닉네임을 입력해주세요' value={nickname} onChangeText={handleOnChangeNickname} />
          </View>
          {!nickname ? null : (
            <View>
              <Text>{nicknameWarningText}</Text>
            </View>
          )}
          <View style={styles.joinInputWrap}>
            <BasicInput title='비밀번호' placeholder='8~30자리 영대・소문자, 숫자, 특수문자 조합' secureTextEntry={true} value={password} onChangeText={handleOnChangePassword} />
          </View>
          {!password ? null : (
            <View>
              <Text>{pwWarningText}</Text>
            </View>
          )}
          <View style={styles.joinInputWrap}>
            <BasicInput title='비밀번호 확인' placeholder='' secureTextEntry={true} />
          </View>
          {!checkPassword ? null : (
            <View>
              <Text>{checkPwWarningText}</Text>
            </View>
          )}
          <View style={styles.joinInputWrap}>
            <BasicInput title='휴대 전화 번호 인증' placeholder='휴대 전화 번호를 입력해주세요' />
            <Pressable style={styles.inputButton}>
              <Text>인증받기</Text>
            </Pressable>
          </View>
          <View style={styles.joinInputWrap}>
            <BasicInput placeholder='인증번호를 입력해주세요' marginTop={10} />
            <Pressable style={styles.inputButton}>
              <Text>확인</Text>
            </Pressable>
          </View>
          <View>
            <View>
              <Text style={{marginTop: 40}}>약관 동의</Text>
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
  inputButton: {
    backgroundColor: '#F2F2F2', 
    padding: 12, 
    borderRadius: 5, 
    marginStart: 10, 
    width: 104, 
    alignItems: 'center',
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
});