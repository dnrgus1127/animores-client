import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image } from "react-native";
import { IconCheck, IconSnsApple, IconSnsFacebook, IconSnsKakao, IconSnsNaver } from '../../assets/icons';

// navigate pages
import JoinScreen from "./JoinScreen";

interface InputProps {
  placeholder?: string;
  secureTextEntry?: boolean;
}
export const BasicInput = (props:InputProps) => {
  const { placeholder, secureTextEntry } = props;
  const [value, setValue] = useState('');

  const onChangeText = (inputText:string) => {
    setValue(inputText)
  }

  return (
    <TextInput
      style={styles.commonTextInput}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder ? placeholder : ''}
      secureTextEntry={secureTextEntry}
    />
  )
}


interface CheckboxProps {
  isChecked: boolean;
  disabled?: boolean;
  onValueChangeHandler?: (checked: boolean) => void;
  label?: React.ReactNode;
  style?: StyleSheet;
}

export const BasicCheckbox = (props: CheckboxProps) => {
  const { isChecked, disabled, onValueChangeHandler, label } = props;

  const onPressHandeler = () => {
    if (onValueChangeHandler) {
      onValueChangeHandler(!isChecked);
    }
  }

  return (
    <Pressable 
      style={styles.checkboxWrap}
      disabled={disabled}
      onPress={onPressHandeler}
    >
      <View
        style={[
          styles.basicCheckbox,
          isChecked && styles.checked,
          disabled && styles.disabled,
        ]}
      >
        {isChecked && (
          <IconCheck style={styles.checkboxIcon} />
        )}
      </View>
      
      {label && (
        <Text style={[
          styles.autoLoginLabel,
          isChecked && styles.checkedLabel,
        ]}>
          {label}
        </Text>
      )}
    </Pressable>
  )
}

const LoginScreen = () => {
  const [isChecked, setChecked] = useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.loginInputWrap}>
          <BasicInput placeholder='이메일' />
          <BasicInput placeholder='비밀번호' secureTextEntry={true} />
        </View>
        <BasicCheckbox 
          isChecked={isChecked}
          onValueChangeHandler={() => setChecked(!isChecked)}
          label='자동 로그인'
        />
        <Pressable
          onPress={() => console.log('Pressed')}
          style={styles.loginButton}
          children={<Text style={styles.loginButtonText}>로그인</Text>}
        >
        </Pressable>
      </View>

      <View style={styles.middle}>
        <View style={styles.commonRowContainer}>
          <View style={styles.separator} />
          <View>
            <Text style={{textAlign: 'center', paddingHorizontal:8, color: '#AEAEAE' }}>SNS 간편 로그인</Text>
          </View>
          <View style={styles.separator} />
        </View>
        <View style={styles.commonRowContainer}>
          <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-around', width: '70%'}}>
            <Pressable
              onPress={() => console.log('apple Pressed')}
            >
              <Image source={IconSnsApple} alt="icon sns apple" />
            </Pressable>
            <Pressable
              onPress={() => console.log('facebook Pressed')}
            >
              <Image source={IconSnsFacebook} alt="icon sns facebook" />
            </Pressable>
            <Pressable
              onPress={() => console.log('kakao Pressed')}
            >
              <Image source={IconSnsKakao} alt="icon sns kakao" />
            </Pressable>
            <Pressable
              onPress={() => console.log('naver Pressed')}
            >
              <Image source={IconSnsNaver} alt="icon sns naver" />
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.commonRowContainer}>
          <Pressable
            onPress={() => console.log('아이디찾기')}
          >
            <Text
              style={{color: '#AEAEAE'}}
            >아이디찾기</Text>
          </Pressable>
          <View style={styles.verticalBar}></View>
          <Pressable
            onPress={() => console.log('비밀번호 찾기')}
          >
            <Text
              style={{color: '#AEAEAE'}}
            >비밀번호 찾기</Text>
          </Pressable>
          <View style={styles.verticalBar}></View>
          <Pressable
            onPress={() => console.log('회원가입')}
          >
            <Text>회원가입</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default LoginScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
  },
  commonRowContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  top: {
    flex: 0.55,
    paddingTop: 20,
    //backgroundColor: 'yellow',
  },
  loginInputWrap: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  commonTextInput: {
    marginTop: 8,
    width: 370,
    height: 58,
    padding: 10,
    backgroundColor: '#F4F4F4',
    borderRadius: 15,
  },
  checkboxWrap: {
    flexDirection: 'row',
    marginTop: 15,
  },
  basicCheckbox: {
    borderColor: '#DBDBDB',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    width: 20,
    height: 20,
    marginRight: 5,
    alignItems: 'center',
  },
  checked: {
    borderColor: '#FB3F7E',
    backgroundColor: '#FB3F7E',
  },
  disabled: {
    backgroundColor: '#DBDBDB',
  },
  checkboxIcon: {
    width: 14,
    height: 10,
    marginTop: 1,
    marginLeft: 6,
  },
  autoLoginLabel: {
    color: '#AEAEAE',
  },
  checkedLabel: {
    color: '#000',
  },
  loginButton: {
    marginTop: 15,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#FB3F7E',
  },
  loginButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  middle: {
    flex: 0.25,
    //backgroundColor: 'beige',
  },
  bottom: {
    flex: 0.2,
    paddingTop: 50,
    //backgroundColor: 'pink',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  separator: {
    flex: 1, 
    height: 1, 
    backgroundColor: '#AEAEAE',
  },
  verticalBar: {
    borderLeftWidth: 1, 
    borderLeftColor: '#AEAEAE', 
    height: 15, 
    marginLeft: 8, 
    marginRight: 8,
  },
});