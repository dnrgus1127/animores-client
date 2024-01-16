import React, { useState } from 'react';
import { View, Platform, TextInput } from 'react-native';
import { Link, router } from 'expo-router';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Text,
  Checkbox,
  IconButton,
} from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function Login() {
  const [idText, onChangeIdText] = useState('이메일');
  const [pwText, onChangePwText] = useState('비밀번호');
  const [checked, setChecked] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.getStartedContainer}>
          <TextInput
            style={styles.commonTextInput}
            onChangeText={onChangeIdText}
            value={idText}
          />
          <TextInput
            style={styles.commonTextInput}
            onChangeText={onChangePwText}
            value={pwText}
          />
        </View>
        <Checkbox.Item 
          color='#FB3F7E'
          label="자동 로그인" 
          status={checked ? 'checked' : 'unchecked'} 
          onPress={() => setChecked(!checked)}
          position='leading' 
          style={styles.autoLoginCheck}
          labelStyle={styles.autoLoginLabel} 
        />
        <Button 
          mode="contained" 
          onPress={() => console.log('Pressed')}
          style={styles.loginButton}
          children={<Text style={styles.loginButtonText}>로그인</Text>}
        >
        </Button>
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
          />
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.commonRowContainer}>
          <Button 
            mode='text'
            onPress={() => console.log('Pressed')}
            textColor='#AEAEAE'
          >
            아이디 찾기
          </Button>
          <View style={{ borderLeftWidth: 1, borderLeftColor: '#AEAEAE', height: 15 }}></View>
          <Button 
            mode='text'
            onPress={() => router.replace('/member/join')}
            textColor='#AEAEAE'
          >
            비밀번호 찾기
          </Button>
          <View style={{ borderLeftWidth: 1, borderLeftColor: '#AEAEAE', height: 15 }}></View>
          <Link 
            href={{ pathname: '(auth)/join'} as never}
          >
            회원가입
          </Link>
        </View>
      </View>
    </View>
  );
}

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
  autoLoginCheck: {
    paddingStart: 0,
    marginStart: 0,
  },
  autoLoginLabel: {
    textAlign: 'left',
  },
  loginButton: {
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
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