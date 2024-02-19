import React, { useState } from 'react';
import { StyleSheet, TextInput } from "react-native";
import { commonStyles } from '../styles/commonStyles';

interface InputProps {
  placeholder?: string;
  secureTextEntry?: boolean;
}

const FilledInput = (props:InputProps) => {
  const { placeholder, secureTextEntry } = props;
  const [value, setValue] = useState('');

  const onChangeText = (inputText:string) => {
    setValue(inputText)
  }

  return (
    <TextInput
      style={styles.inputBox}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder ? placeholder : ''}
      secureTextEntry={secureTextEntry}
    />
  )
}

export default FilledInput


const styles = StyleSheet.create({
  inputBox: {
    marginTop: 8,
    width: 370,
    height: 58,
    padding: 10,
    backgroundColor: '#F4F4F4',
    borderRadius: 15,
  },
});