import React, { useState } from 'react';
import { View, Platform, TextInput } from 'react-native';
import { Link } from 'expo-router';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Text,
  PaperProvider,
} from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function Join() {
  const [idText, onChangeIdText] = useState('아이디');
  const [pwText, onChangePwText] = useState('패스워드');

  return (
    <View style={styles.container}>
      <View style={styles.top}>
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
        <Button mode="contained" onPress={() => console.log('Pressed')}>
          회원가입
        </Button>
      </View>
      <View style={styles.middle}>
        <Text>회원가입 페이지</Text>
      </View>
      <View style={styles.bottom}>

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
    margin: 10,
  },
  top: {
    flex: 0.3,
    backgroundColor: 'yellow',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    flex: 0.3,
    backgroundColor: 'beige',
  },
  bottom: {
    flex: 0.3,
    backgroundColor: 'pink',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  innerContainer: {
    width: '90%',
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
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  commonTextInput: {
    marginTop: 5,
    width: 200,
    height: 30,
    padding: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});