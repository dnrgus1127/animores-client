import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text } from "react-native";
import { commonStyles } from '../styles/commonStyles';

interface InputProps {
  title?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  marginTop?: number;
}

const BasicInput = (props:InputProps) => {
  const { title, placeholder, secureTextEntry, marginTop } = props;
  const [value, setValue] = useState('');

  const onChangeText = (inputText:string) => {
    setValue(inputText)
  }

  return (
    <View style={[styles.inputWrap, marginTop ? { marginTop: marginTop} : null ]}>
      <Text>{title}</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder ? placeholder : ''}
        secureTextEntry={secureTextEntry}
      />
    </View>
  )
}

export default BasicInput


const styles = StyleSheet.create({
  inputWrap: {
    flex: 1,
    width: '100%',
    marginTop: 50,
  },
  inputBox: {
    height: 42,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFF',
    borderBottomColor: '#C1C1C1',
    borderBottomWidth: 1,
  },
});