import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, TextInput, Pressable, useColorScheme } from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  PaperProvider,
} from 'react-native-paper';
import Colors from '../../constants/Colors';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Link, Tabs } from 'expo-router';

export default function TabOneScreen() {
  const colorScheme = useColorScheme();
  const [idText, onChangeIdText] = useState('아이디');
  const [pwText, onChangePwText] = useState('패스워드');

  return (
    <View style={styles.container}>
      <Link href={{ pathname: 'login'} as never}>로그인</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
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
