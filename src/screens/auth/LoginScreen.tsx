import React, { useState } from 'react';
import { View, Text, Platform, TextInput, StyleSheet, Pressable, Image } from "react-native";
//import { IconCheck } from '../../assets/icons';
//import CheckIcon from '../../assets/icon.png'

let CheckIco = require('../../assets/icons/check.svg');

// navigate pages
import JoinScreen from "./JoinScreen";

interface InputProps {
  placeholder?: string;
}
export const BasicInput = (props:InputProps) => {
  const { placeholder } = props;
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
          // <IconCheck style={{ color: disabled ? '#333' : '#ff0000' }} />
          // <Image source={CheckIco} />
          <Text style={{ color: '#fff' }}>V</Text>
        )}
      </View>
      
      {label && (
        <Text style={[
          styles.label,
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
        <View style={styles.getStartedContainer}>
          <BasicInput placeholder='이메일' />
          <BasicInput placeholder='비밀번호' />
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
          <View style={{flex: 1, height: 1, backgroundColor: '#AEAEAE'}} />
          <View>
            <Text style={{textAlign: 'center', paddingHorizontal:8, color: '#AEAEAE' }}>SNS 간편 로그인</Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: '#AEAEAE'}} />
        </View>
        <View style={styles.commonRowContainer}>
          {/* <IconButton
            icon="facebook"
            iconColor="#fff"
            size={20}
            onPress={() => console.log('Pressed')}
            style={styles.snsButton}
          />
          <IconButton
            icon="apple"
            iconColor="#fff"
            size={20}
            onPress={() => console.log('Pressed')}
            style={styles.snsButton}
          />
          <IconButton
            icon="facebook"
            iconColor="#fff"
            size={20}
            onPress={() => console.log('Pressed')}
            style={styles.snsButton}
          />
          <IconButton
            icon="apple"
            iconColor="#fff"
            size={20}
            onPress={() => console.log('Pressed')}
            style={styles.snsButton}
          /> */}
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.commonRowContainer}>
          {/* <Button 
            mode='text'
            onPress={() => console.log('Pressed')}
            textColor='#AEAEAE'
          >
            아이디 찾기
          </Button>
          <View style={{ borderLeftWidth: 1, borderLeftColor: '#AEAEAE', height: 15 }}></View>
          <Button 
            mode='text'
            onPress={() => router.replace('join')}
            textColor='#AEAEAE'
          >
            비밀번호 찾기
          </Button>
          <View style={{ borderLeftWidth: 1, borderLeftColor: '#AEAEAE', height: 15 }}></View>
          <Link 
            href={{ pathname: 'join'}}
          >
            회원가입
          </Link> */}
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
    paddingTop: 40,
    //backgroundColor: 'yellow',
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
  label: {
    color: '#AEAEAE',
  },
  checkedLabel: {
    color: '#000',
  },
  autoLoginCheck: {
    paddingStart: 0,
    marginStart: 0,
  },
  autoLoginLabel: {
    textAlign: 'left',
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
    //backgroundColor: 'beige',
  },
  bottom: {
    //flex: 0.25,
    //backgroundColor: 'pink',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  snsButton: {
    backgroundColor: '#B7B7B7',
    padding: 0,
  },
  innerContainer: {
    width: '100%',
    marginHorizontal: 50,
    borderRadius: 0,
    ...Platform.select({
      ios: {
        shadowOpacity: 0,
      },
      android: {
        elevation: 0,
      }
    })
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  commonTextInput: {
    marginTop: 5,
    width: 370,
    height: 58,
    padding: 10,
    backgroundColor: '#F4F4F4',
    borderRadius: 15,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
});